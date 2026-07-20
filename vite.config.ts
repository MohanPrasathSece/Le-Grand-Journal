import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// Load environment variables at startup and set them in process.env
const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
process.env.CRM_API_ENDPOINT = env.CRM_API_ENDPOINT || "";
process.env.CRM_AFFILIATE_TOKEN = env.CRM_AFFILIATE_TOKEN || "";

// Country code to dial code mapping
const COUNTRY_DIAL_CODES: Record<string, string> = {
  IE: "353",
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

// Dev API plugin to intercept and proxy /api/enquiry requests securely in development
function devApiPlugin() {
  return {
    name: "dev-api-handler",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === "/api/enquiry" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              const parsed = JSON.parse(body || "{}");
              const { name, email, phone, message, countryCode, leadType } = parsed;
              const userCountryCode = (countryCode || "CH").toUpperCase();
              const resolvedLeadType = leadType || (message && message.trim() ? "contact" : "signup");

              // Validate required inputs
              if (!name || !email || !phone) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Le nom, l'e-mail et le numéro de téléphone sont des champs obligatoires." }));
                return;
              }

              // Extract first name and last name
              const [first_name, ...lastNameParts] = (name || "Unknown").trim().split(" ");
              const lastName = lastNameParts.length > 0 ? lastNameParts.join(" ") : "";

              const formattedPhone = formatPhoneForCRM(phone, userCountryCode);

              // Use process.env variables strictly from the env file
              const crmEndpoint = process.env.CRM_API_ENDPOINT;
              const token = process.env.CRM_AFFILIATE_TOKEN;

              if (!crmEndpoint || !token) {
                console.error("[Dev Server API] Secure CRM parameters are missing from environment variables (.env).");
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Server configuration error. Secure CRM parameters are missing from environment variables." }));
                return;
              }

              const crmPayload = {
                country_name: userCountryCode.toLowerCase(),
                description: (message || "").trim() || "Contact Lead",
                phone: formattedPhone,
                email: email.trim(),
                first_name: first_name,
                last_name: lastName,
                custom_fields: {
                  Source_ID: "website",
                  How_Much_Invested: "0",
                  Outline_Your_Case: message || ""
                }
              };

              console.log("[Dev Server API] Transmitting lead securely to CRM...");
              
              const crmResponse = await fetch(crmEndpoint, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": token
                },
                body: JSON.stringify(crmPayload)
              });

              const responseText = await crmResponse.text();
              console.log(`[Dev Server API] CRM response code: ${crmResponse.status}`);

              if (crmResponse.ok) {
                try {
                  const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://lead-dashboard-orcin.vercel.app/api/increment";
                  await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                      website: "CipherWire", 
                      type: resolvedLeadType, 
                      name: name, 
                      email: email,
                      countryCode: userCountryCode
                    })
                  }).catch(() => {});
                } catch(e){}
                let responseData = { success: true, crmId: "hs-" + Math.floor(Math.random() * 900000 + 100000) };
                try {
                  const parsedCrm = JSON.parse(responseText);
                  if (parsedCrm && (parsedCrm.id || parsedCrm.lead_id)) {
                    responseData.crmId = parsedCrm.id || parsedCrm.lead_id;
                  }
                } catch (e) {}

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(responseData));
              } else {
                console.error("[Dev Server API] CRM Rejected Lead:", responseText);
                
                const lowerResponse = responseText.toLowerCase();
                if (crmResponse.status === 409 || lowerResponse.includes("already exist") || lowerResponse.includes("already registered") || lowerResponse.includes("duplicate") || lowerResponse.includes("exists")) {
                  res.statusCode = 400;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({
                    error: "already_exists",
                    message: "Vous nous avez déjà contactés. Veuillez patienter."
                  }));
                  return;
                } else if (crmResponse.status === 400 || crmResponse.status === 422) {
                  res.statusCode = 400;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({
                    error: "invalid_lead",
                    message: "Certaines informations saisies ne semblent pas valides. Veuillez vérifier le format de votre numéro de téléphone et de votre e-mail."
                  }));
                  return;
                }

                res.statusCode = 502;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "CRM server rejected lead submission.", details: responseText }));
              }
            } catch (err) {
              console.error("[Dev Server API] Exception occurred:", err);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Internal server error occurred." }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), devApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
  },
});
