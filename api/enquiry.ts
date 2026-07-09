import type { IncomingMessage } from "http";

// Utility to parse request body in node environment
const getRawBody = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      resolve(body);
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
};

// Swiss phone auto-formatter: normalizes any Swiss number input to 0041XXXXXXXXX
function formatSwissPhone(raw: string): string {
  // Strip everything except digits and leading '+'
  let phone = raw.replace(/[^0-9+]/g, "");

  if (phone) {
    // +41XXXXXXXXX → 0041XXXXXXXXX
    if (phone.startsWith("+")) {
      phone = "00" + phone.slice(1);
    }
    // 41XXXXXXXXX (11 digits, no prefix) → 0041XXXXXXXXX
    if (phone.startsWith("41") && phone.length === 11) {
      phone = "00" + phone;
    }
    // Already has 0041 prefix → done
    if (!phone.startsWith("0041")) {
      // 0XXXXXXXXX (local Swiss format) → 0041XXXXXXXXX
      if (phone.startsWith("0") && !phone.startsWith("00")) {
        phone = "0041" + phone.slice(1);
      } else if (!phone.startsWith("00")) {
        // 7XXXXXXXXX or 9XXXXXXXXX (stripped leading zero) → 0041XXXXXXXXX
        phone = "0041" + phone;
      }
    }
  } else {
    phone = "0000000000";
  }

  return phone;
}

export default async function handler(req: any, res: any) {
  // Helper to send a JSON response compatible with both Vercel and raw Node.js
  const sendJson = (statusCode: number, payload: object) => {
    if (typeof res.status === "function") {
      return res.status(statusCode).json(payload);
    }
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(payload));
  };

  const method = req.method;

  if (method !== "POST") {
    return sendJson(405, { error: "Méthode non autorisée" });
  }

  try {
    // Parse body — support pre-parsed objects, JSON strings, or raw streams
    let bodyData: any;
    if (req.body && typeof req.body === "object") {
      bodyData = req.body;
    } else if (req.body && typeof req.body === "string") {
      bodyData = JSON.parse(req.body);
    } else {
      const rawBody = await getRawBody(req);
      bodyData = JSON.parse(rawBody || "{}");
    }

    // Accept both `phone` and `number` field names from the frontend
    const { name, email, message, amount } = bodyData;
    const phoneRaw: string = (bodyData.phone || bodyData.number || "").trim();

    // Validate required fields
    if (!name || !email || !phoneRaw) {
      return sendJson(400, {
        error: "Le nom, l'e-mail et le numéro de téléphone sont des champs obligatoires.",
      });
    }

    // Parse name — trim first to prevent leading spaces producing a blank first_name
    const [first_name, ...lastNameParts] = (name || "Unknown").trim().split(" ");
    const last_name = lastNameParts.length > 0 ? lastNameParts.join(" ") : "Lead";

    // Load CRM credentials from environment variables
    const crmEndpoint = process.env.CRM_API_ENDPOINT;
    const affiliateToken = process.env.CRM_AFFILIATE_TOKEN;

    if (!crmEndpoint || !affiliateToken) {
      console.error(
        "Server Configuration Error: CRM_API_ENDPOINT or CRM_AFFILIATE_TOKEN is not defined."
      );
      return sendJson(500, {
        error:
          "Erreur de configuration du serveur. Les paramètres sécurisés du CRM sont manquants dans les variables d'environnement.",
      });
    }

    console.log(
      `[Debug Token] Length: ${affiliateToken.length}, Prefix: "${affiliateToken.substring(0, 6)}", Suffix: "${affiliateToken.substring(affiliateToken.length - 6)}"`
    );

    // Format the phone number to 0041XXXXXXXXX before sending to CRM
    const phoneFormatted = formatSwissPhone(phoneRaw);

    // Build the strict CRM payload
    const crmPayload = {
      country_name: countryName,
      description: (message || "").trim() || "Signup Lead",
      phone: phoneFormatted,
      email: email.trim(),
      first_name,
      last_name,
      custom_fields: {
        Source_ID: "website",
        How_Much_Invested: (amount || "").trim() || "0",
        Outline_Your_Case: (message || "").trim(),
      },
    };

    console.log(`Transmitting lead [${first_name} ${last_name}] securely to CRM...`);

    // POST lead to external CRM
    const response = await fetch(crmEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: affiliateToken,
      },
      body: JSON.stringify(crmPayload),
    });

    const responseText = await response.text();
    console.log(`CRM Response Status: ${response.status}`);

    if (response.ok) {
      let responseData: { success: boolean; crmId: string } = {
        success: true,
        crmId: "hs-" + Math.floor(Math.random() * 900000 + 100000),
      };
      try {
        const parsedCrm = JSON.parse(responseText);
        if (parsedCrm && (parsedCrm.id || parsedCrm.lead_id)) {
          responseData.crmId = parsedCrm.id || parsedCrm.lead_id;
        }
      } catch {
        // Fallback to random ID if CRM response is not JSON
      }
      
    // Fire-and-forget: increment leads count
    try {
      const host = req.headers.host || "localhost:3000";
      const protocol = host.startsWith("localhost") ? "http" : "https";
      fetch(`${protocol}://${host}/api/leads-count`, { method: "POST" }).catch((err) =>
        console.warn("[leads-count] Failed to increment:", err)
      );
    } catch (e) {
      console.warn("[leads-count] Error triggering increment:", e);
    }
    
    // Sync to dashboard
    try {
      const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://autodigix-leads-dashboard.vercel.app/api/increment";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: "CipherWire", type: crmPayload.description && crmPayload.description.toLowerCase().includes("signup") ? "signup" : "contact", name: first_name + ' ' + last_name, email: email })
      }).catch(() => {});
    } catch(e){}

    return sendJson(200, responseData);
    } else {
      console.error(
        `CRM Rejected Lead. Endpoint: ${crmEndpoint}. Status: ${response.status}. Response: ${responseText}`
      );
      return sendJson(502, {
        error: "Le serveur CRM a rejeté la soumission de la demande.",
        details: responseText,
      });
    }
  } catch (error: any) {
    console.error(
      `Server API Exception caught for endpoint [${process.env.CRM_API_ENDPOINT}]:`,
      error
    );
    return sendJson(500, {
      error:
        "Une erreur s'est produite sur le serveur proxy sécurisé lors de la transmission des données de la demande.",
    });
  }
}
