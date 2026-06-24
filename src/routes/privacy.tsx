import { useEffect } from "react";
import { Shield, ChevronLeft, Calendar } from "lucide-react";

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy — The Herald Chronicle";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Privacy Policy and data protection regulations for users of The Herald Chronicle and Helvetia Capital platforms.");
    }
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", "/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20">
      {/* Header */}
      <header className="border-b border-rule bg-background sticky top-0 z-40">
        <div className="mx-auto flex max-w-[900px] items-center justify-between px-6 py-4">
          <a href="/" onClick={handleBack} className="flex items-center gap-1.5 font-serif text-xl font-bold tracking-tight text-ink hover:opacity-80">
            <span>The Herald Chronicle</span>
            <span className="text-[9px] uppercase tracking-widest text-primary px-1 bg-surface border border-rule rounded">Daily</span>
          </a>
          <a 
            href="/" 
            onClick={handleBack}
            className="flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-ink transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[760px] px-6 pt-10">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-primary mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>Legal & Compliance</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2">
          Privacy Policy
        </h1>
        
        <div className="flex items-center gap-1 text-xs text-ink-soft mb-8 pb-4 border-b border-rule font-mono">
          <Calendar className="w-3.5 h-3.5" />
          <span>Last Updated: June 24, 2026</span>
        </div>

        <div className="prose-editorial space-y-6 text-[16px] leading-[1.7] text-ink-soft">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">1. Introduction</h2>
            <p>
              Welcome to <strong>The Herald Chronicle</strong> (together with Helvetia Capital, "we", "our", or "us"). We are committed to protecting your personal data and respecting your privacy. This Privacy Policy describes how we collect, use, process, and disclose your information, including personal data, when you access and use our website and submit enquiries.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">2. Definitions</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Personal Data:</strong> Any information relating to an identified or identifiable natural person.</li>
              <li><strong>CRM:</strong> Customer Relationship Management platform (specifically HubSpot Enterprise used by our affiliate partners to log and track incoming requests).</li>
              <li><strong>Sovereign Enquiry Registry:</strong> The secure form portal through which users express interest in digital asset allocations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">3. Information We Collect</h2>
            <p>
              We collect information to provide better services to all our users. The data collected depends on your interactions with our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">4. Information You Provide</h2>
            <p>
              When you submit a contact or signup form on our website (such as the Sovereign Enquiry Form), we ask you for personal information, which includes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Your full name (first name and last name).</li>
              <li>Your email address.</li>
              <li>Your active telephone/phone number.</li>
              <li>An optional personal message containing outline parameters for your case.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">5. Automatically Collected Information</h2>
            <p>
              When you browse our daily news pages, we automatically collect basic analytics data, which includes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Log Information: browser type, access dates and times, page views, and your IP address.</li>
              <li>Device Information: hardware model, operating system, and unique device identifiers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">6. Cookies & Tracking Technologies</h2>
            <p>
              We use functional cookies to optimize site speed and remember client preference parameters (such as theme and language selection). You can control cookie preferences directly through your local web browser settings. Disabling cookies will not affect your access to general editorial articles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">7. Purpose of Data Collection</h2>
            <p>
              We collect your contact data for the sole purpose of evaluating and processing digital wealth consultations. By submitting your phone number and email address, you authorize representatives of our affiliate advisory circle to contact you regarding private allocations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">8. CRM & Third-Party Service Providers</h2>
            <p>
              We integrate with external Customer Relationship Management (CRM) tools—specifically HubSpot—via secure server-side webhooks. We never communicate login credentials or raw passwords to the CRM. The CRM is used exclusively to safely compile, map, and organize affiliate contact requests.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">9. How Personal Information Is Used</h2>
            <p>
              Your personal information is used to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Verify your identity and allocation capacity.</li>
              <li>Provide customer support and resolve technical registration issues.</li>
              <li>Connect you with verified digital asset advisors in Switzerland.</li>
              <li>Comply with standard legal obligations and Swiss KYC/AML frameworks where applicable.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">10. Data Retention</h2>
            <p>
              We retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We maintain local browser storage logs for convenience, which can be cleared at any time by the user using the provided dashboard parameters.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">11. Data Security</h2>
            <p>
              We implement industry-standard server-side security. Our backend proxy routes encapsulate all sensitive endpoints and authorization tokens, preventing exposure in the client browser. All form entries are encrypted during transmission via HTTPS TLS protocols.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">12. International Data Transfers</h2>
            <p>
              Your information, including Personal Data, may be transferred to—and maintained on—computers located outside of your state or country where the data protection laws may differ. Because our servers and proxy layers reside in Switzerland, your data is processed and stored subject to Swiss federal data regulations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">13. Marketing Communications</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties for marketing purposes. You will only receive communications that relate directly to the allocation enquiry you submitted.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">14. User Rights</h2>
            <p>
              Under applicable Swiss and European data protection laws (such as GDPR/FADP), you have rights regarding your personal data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>The right to access, update, or delete the information we have on you.</li>
              <li>The right of rectification if the information is inaccurate or incomplete.</li>
              <li>The right to withdraw your consent to data processing at any time.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">15. Children's Privacy</h2>
            <p>
              Our services are not directed to anyone under the age of 18. We do not knowingly collect personal identifiable information from children. If we discover a child under 18 has submitted data, we immediately purge the record from our CRM.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">16. Third-Party Links</h2>
            <p>
              Our website may contain links to external sites that are not operated by us. We advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content or practices of any third-party sites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">17. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">18. Contact Information</h2>
            <p>
              For any questions regarding this Privacy Policy or your data rights, you may contact our compliance team:
            </p>
            <p className="font-mono text-sm bg-surface border border-rule p-3 rounded">
              Helvetia Capital Compliance Desk<br />
              Schloss Oberwil, Lake Zug<br />
              Canton of Zug, Switzerland<br />
              Email: compliance@heraldchronicle.ch
            </p>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mx-auto max-w-[900px] border-t border-rule mt-16 px-6 py-8 text-center text-xs text-ink-soft font-mono">
        © 2026 The Herald Chronicle / Helvetia Capital. Zug Canton CHE-428.189. All rights reserved.
      </footer>
    </div>
  );
}
