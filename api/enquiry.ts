import type { IncomingMessage, ServerResponse } from "http";

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

export default async function handler(req: any, res: any) {
  // Support both serverless (vercel / express helper) and raw node environments
  const method = req.method;

  if (method !== "POST") {
    if (typeof res.status === "function") {
      return res.status(405).json({ error: "Method not allowed" });
    } else {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ error: "Method not allowed" }));
    }
  }

  try {
    let bodyData: any;
    if (req.body && typeof req.body === "object") {
      bodyData = req.body;
    } else if (req.body && typeof req.body === "string") {
      bodyData = JSON.parse(req.body);
    } else {
      const rawBody = await getRawBody(req);
      bodyData = JSON.parse(rawBody || "{}");
    }

    const { name, email, phone, message } = bodyData;

    // Validate required fields
    if (!name || !email || !phone) {
      const errResponse = { error: "Name, email, and phone/number are required fields." };
      if (typeof res.status === "function") {
        return res.status(400).json(errResponse);
      } else {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(errResponse));
      }
    }

    // Split name into first and last name
    const cleanName = name.trim();
    const nameParts = cleanName.split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Retrieve API configurations strictly from environment variables
    const crmEndpoint = process.env.CRM_API_ENDPOINT;
    const affiliateToken = process.env.CRM_AFFILIATE_TOKEN;

    if (!crmEndpoint || !affiliateToken) {
      console.error("Server Configuration Error: CRM_API_ENDPOINT or CRM_AFFILIATE_TOKEN environment variable is not defined.");
      const configErr = { error: "Server configuration error. Secure CRM parameters are missing from environment variables." };
      if (typeof res.status === "function") {
        return res.status(500).json(configErr);
      } else {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(configErr));
      }
    }

    // Format payload matching CRM specifications
    const crmPayload = {
      country_name: "cy",
      description: message || "",
      phone: phone.trim(),
      email: email.trim(),
      first_name: firstName,
      last_name: lastName || "",
      custom_fields: {
        Source_ID: "Website",
        Outline_Your_Case: message || ""
      }
    };

    console.log(`Transmitting lead [${firstName} ${lastName}] securely to CRM...`);

    // Call external CRM securely
    const response = await fetch(crmEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": affiliateToken
      },
      body: JSON.stringify(crmPayload)
    });

    const responseText = await response.text();
    console.log(`CRM Response Status: ${response.status}`);

    if (response.ok) {
      let responseData = { success: true, crmId: "hs-" + Math.floor(Math.random() * 900000 + 100000) };
      try {
        const parsedCrm = JSON.parse(responseText);
        if (parsedCrm && (parsedCrm.id || parsedCrm.lead_id)) {
          responseData.crmId = parsedCrm.id || parsedCrm.lead_id;
        }
      } catch (e) {
        // Fallback to random ID if response is not JSON
      }

      if (typeof res.status === "function") {
        return res.status(200).json(responseData);
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(responseData));
      }
    } else {
      console.error(`CRM Rejected Lead. Status: ${response.status}. Response: ${responseText}`);
      const crmRejected = { error: "CRM server rejected lead submission.", details: responseText };
      if (typeof res.status === "function") {
        return res.status(502).json(crmRejected);
      } else {
        res.statusCode = 502;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(crmRejected));
      }
    }
  } catch (error: any) {
    console.error("Server API Exception caught:", error);
    const serverErr = { error: "An error occurred on the secure proxy server while transmitting lead data." };
    if (typeof res.status === "function") {
      return res.status(500).json(serverErr);
    } else {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(serverErr));
    }
  }
}
