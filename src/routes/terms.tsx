import { useEffect } from "react";
import { FileText, ChevronLeft, Calendar } from "lucide-react";

export default function TermsPage() {
  useEffect(() => {
    document.title = "Terms & Conditions — The Herald Chronicle";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Terms and conditions of service for users of The Herald Chronicle and Helvetia Capital platforms.");
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
          <FileText className="w-3.5 h-3.5" />
          <span>Terms of Service</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2">
          Terms & Conditions
        </h1>
        
        <div className="flex items-center gap-1 text-xs text-ink-soft mb-8 pb-4 border-b border-rule font-mono">
          <Calendar className="w-3.5 h-3.5" />
          <span>Last Updated: June 24, 2026</span>
        </div>

        <div className="prose-editorial space-y-6 text-[16px] leading-[1.7] text-ink-soft">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using the services provided by <strong>The Herald Chronicle</strong> ("Website", "we", "us", or "our"), including submitting enquiries through our Sovereign Registry forms, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree to these terms, you must immediately discontinue using this Website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">2. Eligibility</h2>
            <p>
              By using our Website, you represent and warrant that you are at least 18 years of age and possess the legal authority to enter into these Terms & Conditions. If you are accessing this Website on behalf of an institution or corporate entity, you represent that you have the authority to bind that entity to these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">3. Website Purpose</h2>
            <p>
              The Herald Chronicle is a digital publication providing news profiles, technology reviews, and educational content regarding macroeconomic trends and digital assets. Helvetia Capital provides private capital allocation advisory services. All content presented on this Website is for educational and informational purposes only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">4. User Responsibilities</h2>
            <p>
              You agree to provide true, accurate, current, and complete contact details when submitting forms through our Website. You are solely responsible for securing your local connection, hardware, and access keys when interacting with digital services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">5. Acceptable Use</h2>
            <p>
              You agree to use this Website only for lawful purposes. You must not use our forms or services to transmit spam, execute malicious scripts, harvest data, or impersonate other individuals or entities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">6. Prohibited Activities</h2>
            <p>
              You are prohibited from:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Attempting to bypass our secure server proxy layers.</li>
              <li>Extracting data via scrapers, spiders, or automated web crawlers.</li>
              <li>Flooding our CRM endpoints with fake or spam registration packets.</li>
              <li>Decompiling or reverse-engineering the canvas, animations, or styling scripts.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">7. Intellectual Property</h2>
            <p>
              All text, charts, graphics, layout elements, designs, animations, and source code on this Website are the exclusive intellectual property of The Herald Chronicle Media and Helvetia Capital. You may not copy, republish, distribute, or modify any portion of this site without our prior written consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">8. Accuracy of Information</h2>
            <p>
              While we strive to ensure that all editorial articles and news reporting are accurate, fact-checked, and up-to-date, we make no guarantees, warranties, or representations regarding the absolute completeness or accuracy of any profile, market index feed, or technical documentation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">9. No Financial Advice</h2>
            <p>
              <strong>Important:</strong> None of the content, profiles, interviews, or research articles published on this Website constitute financial, tax, or legal advice. The interview with Nils Suter is a biographical profile detailing his personal experiences and opinions. It is not an offer or solicitation to buy, sell, or hold any cryptocurrency or financial instrument.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">10. No Investment Advice</h2>
            <p>
              Neither The Herald Chronicle nor Helvetia Capital operate as licensed brokerage firms, brokers, or wealth advisors in any jurisdiction. You should consult a qualified, licensed financial professional before making any investment decisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink text-bear">11. Cryptocurrency Risk Disclosure</h2>
            <p className="border-l-2 border-bear pl-4 py-1.5 bg-red-950/5 text-ink-soft">
              <strong>WARNING:</strong> Digital assets, cryptocurrencies, and decentralized staking protocols are subject to extreme volatility and market fluctuations. Participating in early token rounds, cold self-custody setups, and venture staking pools carries a high degree of risk. You could lose all of your allocated capital. Past performance is not indicative of future results.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">12. No Guarantee of Returns</h2>
            <p>
              We do not guarantee or promise any yield, return, profit, or asset preservation when you submit an allocation request. Stating interest in a sovereign allocation round is an expression of interest only and does not establish an investment contract.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">13. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, in no event shall The Herald Chronicle, Helvetia Capital, or their affiliates, partners, or writers be liable for any direct, indirect, incidental, punitive, or consequential damages resulting from your use of this Website, your reliance on any published content, or your interaction with digital asset markets.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">14. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless The Herald Chronicle and its officers, directors, employees, and agents from and against any claims, liabilities, losses, costs, or damages arising out of your violation of these Terms or your misuse of the Website's services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">15. Third-Party Services</h2>
            <p>
              We may utilize third-party services (such as HubSpot CRM syncing) to log user enquiries. We are not responsible for the performance, service availability, or data policies of these third-party providers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">16. Privacy Policy Reference</h2>
            <p>
              Your use of this Website is also governed by our Privacy Policy. Please review our <a href="/privacy" onClick={(e) => { e.preventDefault(); window.history.pushState({}, "", "/privacy"); }} className="text-primary hover:underline">Privacy Policy</a> to understand how we collect and process your contact data securely.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">17. Suspension or Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our Website, our Sovereign Enquiry Form, or our newsletter services at any time, without notice, for conduct that we believe violates these Terms or is harmful to our platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">18. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by and construed in accordance with the laws of <strong>Switzerland</strong>, specifically the canton of <strong>Zug</strong>, without reference to conflict of laws principles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">19. Dispute Resolution</h2>
            <p>
              Any legal action, suit, or proceeding arising out of these Terms & Conditions shall be instituted exclusively in the competent courts of Zug, Switzerland, and you consent to personal jurisdiction in such venue.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">20. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable under applicable law, the remaining provisions will continue in full force and effect.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">21. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to check this page periodically for changes. Your continued use of the Website following any updates constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">22. Contact Information</h2>
            <p>
              If you have any questions about these Terms & Conditions, you may contact our legal desk:
            </p>
            <p className="font-mono text-sm bg-surface border border-rule p-3 rounded">
              Helvetia Capital Legal Desk<br />
              Schloss Oberwil, Lake Zug<br />
              Canton of Zug, Switzerland<br />
              Email: legal@heraldchronicle.ch
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
