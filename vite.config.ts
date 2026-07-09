import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// Load environment variables at startup and set them in process.env
const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
process.env.CRM_API_ENDPOINT = env.CRM_API_ENDPOINT || "";
process.env.CRM_AFFILIATE_TOKEN = env.CRM_AFFILIATE_TOKEN || "";

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
              const { name, email, phone, message } = parsed;

              // Validate required inputs
              if (!name || !email || !phone) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Name, email, and phone/number are required fields." }));
                return;
              }

              // Extract first name and last name
              const [first_name, ...lastNameParts] = (name || "Unknown").trim().split(" ");
              const lastName = lastNameParts.length > 0 ? lastNameParts.join(" ") : "Lead";

              let formattedPhone = (phone || "").replace(/[^0-9+]/g, '');
              if (formattedPhone) {
                if (formattedPhone.startsWith('+')) {
                  formattedPhone = '00' + formattedPhone.slice(1);
                }
                if (formattedPhone.startsWith('41') && formattedPhone.length === 11) {
                  formattedPhone = '00' + formattedPhone;
                }
                if (!formattedPhone.startsWith('0041')) {
                  if (formattedPhone.startsWith('0') && !formattedPhone.startsWith('00')) {
                    formattedPhone = '0041' + formattedPhone.slice(1);
                  } else if (!formattedPhone.startsWith('00')) {
                    formattedPhone = '0041' + formattedPhone;
                  }
                }
              } else {
                formattedPhone = "0000000000";
              }

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
                country_name: "ch",
                description: "CipherWire",
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
                  const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://autodigix-leads-dashboard.vercel.app/api/increment";
                  await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ website: "CipherWire", type: message ? "contact" : "signup", name: name, email: email})
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
