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

// Country code to dial code mapping
const COUNTRY_DIAL_CODES: Record<string, string> = {
  CH: "41",
  FR: "33",
  BE: "32",
  CA: "1",
  US: "1",
  GB: "44",
  DE: "49",
  ES: "34",
  IT: "39",
  NL: "31",
  SE: "46",
  AU: "61",
  IN: "91",
  AE: "971",
  SG: "65",
  ZA: "27",
  BR: "55",
  MX: "52",
  JP: "81",
  CY: "357",
};

// Multi-country phone auto-formatter: normalizes any number input to CRM format (00 + country code + number)
function formatPhoneForCRM(raw: string, countryCode: string): string {
  const dialCode = COUNTRY_DIAL_CODES[countryCode] || "41";
  
  // Strip everything except digits and leading '+'
  let phone = raw.replace(/[^0-9+]/g, "");

  if (phone) {
    // Remove any existing country code to avoid duplication
    // Remove +XX or 00XX prefixes
    phone = phone.replace(/^\+\d{1,3}/, "");
    phone = phone.replace(/^00\d{1,3}/, "");
    
    // Remove leading 0 for local format (except for countries that keep it)
    if (phone.startsWith("0") && !countryCode.includes("IT")) {
      phone = phone.slice(1);
    }
    
    // Always prepend 00 + dial code for CRM format
    phone = "00" + dialCode + phone;
  } else {
    phone = "00" + dialCode + "00000000";
  }

  return phone;
}

// Swiss phone auto-formatter: normalizes any Swiss number input to 0041XXXXXXXXX
function formatSwissPhone(raw: string): string {
  return formatPhoneForCRM(raw, "CH");
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
    const { name, email, message, amount, countryCode, leadType } = bodyData;
    const phoneRaw: string = (bodyData.phone || bodyData.number || "").trim();
    const userCountryCode: string = (countryCode || "CH").toUpperCase();
    const resolvedLeadType = leadType || (message && message.trim() ? "contact" : "signup");

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

    // Format the phone number to 00 + country code + number before sending to CRM
    const phoneFormatted = formatPhoneForCRM(phoneRaw, userCountryCode);

    // Build the strict CRM payload
    const crmPayload = {
      country_name: userCountryCode.toLowerCase(),
      description: (message || "").trim() || "Contact Lead",
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
    } catch (e: unknown) {
      console.warn("[leads-count] Error triggering increment:", e);
    }
    
    // Sync to dashboard
    try {
      const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://lead-dashboard-orcin.vercel.app/api/increment";
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          website: "CipherWire", 
          type: resolvedLeadType,
          name: first_name + ' ' + last_name, 
          email: email,
          countryCode: userCountryCode
        })
      }).catch(() => {});
    } catch(e: unknown){
      console.warn("[dashboard] Error syncing:", e);
    }
    
    return sendJson(200, responseData);
    } else {
      console.error(
        `CRM Rejected Lead. Endpoint: ${crmEndpoint}. Status: ${response.status}. Response: ${responseText}`
      );
      
      const lowerResponse = responseText.toLowerCase();
      if (response.status === 409 || lowerResponse.includes("already exist") || lowerResponse.includes("already registered") || lowerResponse.includes("duplicate") || lowerResponse.includes("exists")) {
        return sendJson(400, {
          error: "already_exists",
          message: "Vous nous avez déjà contactés. Veuillez patienter."
        });
      } else if (response.status === 400 || response.status === 422) {
        return sendJson(400, {
          error: "invalid_lead",
          message: "Certaines informations saisies ne semblent pas valides. Veuillez vérifier le format de votre numéro de téléphone et de votre e-mail."
        });
      }

      return sendJson(502, {
        error: "Le serveur CRM a rejeté la soumission de la demande.",
        details: responseText,
      });
    }
  } catch (error: any) {
    const rawMsg = (error.message || error.toString() || "");
    if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists") || rawMsg.toLowerCase().includes("contacted")) {
      if (typeof res.status === 'function') {
        return res.status(400).json({ error: "already_exists", message: "Vous nous avez déjà contactés. Veuillez patienter." });
      } else {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "already_exists", message: "Vous nous avez déjà contactés. Veuillez patienter." }));
        return;
      }
    }

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
