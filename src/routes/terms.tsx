import { useEffect } from "react";
import { FileText, ChevronLeft, Calendar } from "lucide-react";

export default function TermsPage() {
  useEffect(() => {
    document.title = "Conditions Générales d'Utilisation — The Herald Chronicle";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Conditions générales d'utilisation pour les utilisateurs des plateformes The Herald Chronicle et Helvetia Capital.");
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
            <span className="text-[9px] uppercase tracking-widest text-primary px-1 bg-surface border border-rule rounded">Quotidien</span>
          </a>
          <a 
            href="/" 
            onClick={handleBack}
            className="flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-ink transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour à l'Accueil
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[760px] px-6 pt-10">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-primary mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Conditions d'Utilisation</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2">
          Conditions Générales d'Utilisation
        </h1>
        
        <div className="flex items-center gap-1 text-xs text-ink-soft mb-8 pb-4 border-b border-rule font-mono">
          <Calendar className="w-3.5 h-3.5" />
          <span>Dernière mise à jour : 24 juin 2026</span>
        </div>

        <div className="prose-editorial space-y-6 text-[16px] leading-[1.7] text-ink-soft">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">1. Acceptation des Conditions</h2>
            <p>
              En accédant à ce site Web, en y naviguant ou en utilisant les services fournis par <strong>The Herald Chronicle</strong> (« Site Web », « nous », « notre » ou « nos »), y compris en soumettant des demandes via nos formulaires du Registre Souverain, vous reconnaissez avoir lu, compris et accepté d'être lié par les présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, vous devez immédiatement cesser d'utiliser ce Site Web.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">2. Éligibilité</h2>
            <p>
              En utilisant notre Site Web, vous déclarez et garantissez que vous êtes âgé d'au moins 18 ans et que vous possédez l'autorité légale pour accepter les présentes Conditions Générales d'Utilisation. Si vous accédez à ce Site Web au nom d'une institution ou d'une entité morale, vous déclarez que vous avez le pouvoir d'engager cette entité envers ces conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">3. Objet du Site Web</h2>
            <p>
              The Herald Chronicle est une publication numérique fournissant des portraits d'actualité, des revues technologiques et du contenu éducatif concernant les tendances macroéconomiques et les actifs numériques. Helvetia Capital fournit des services de conseil en allocation de capital privé. Tout le contenu présenté sur ce Site Web est fourni uniquement à des fins éducatives et informatives.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">4. Responsabilités de l'Utilisateur</h2>
            <p>
              Vous acceptez de fournir des coordonnées véridiques, exactes, à jour et complètes lors de la soumission de formulaires sur notre Site Web. Vous êtes seul responsable de la sécurité de votre connexion locale, de votre matériel et de vos clés d'accès lors de vos interactions avec des services numériques.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">5. Utilisation Acceptable</h2>
            <p>
              Vous acceptez d'utiliser ce Site Web uniquement à des fins licites. Vous ne devez pas utiliser nos formulaires ou services pour transmettre des spams, exécuter des scripts malveillants, collecter des données ou usurper l'identité d'autres personnes ou entités.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">6. Activités Interdites</h2>
            <p>
              Il vous est interdit de :
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Tenter de contourner nos couches de proxy de serveur sécurisées.</li>
              <li>Extraire des données via des extracteurs (scrapers), des robots (spiders) ou des robots d'indexation automatisés.</li>
              <li>Inonder nos points de terminaison CRM avec des paquets d'inscription faux ou indésirables (spam).</li>
              <li>Décompiler ou rétroconcevoir le canvas, les animations ou les scripts de style.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">7. Propriété Intellectuelle</h2>
            <p>
              Tous les textes, graphiques, éléments de mise en page, conceptions, animations et codes sources de ce Site Web sont la propriété intellectuelle exclusive de The Herald Chronicle Media et d'Helvetia Capital. Vous ne pouvez pas copier, republier, distribuer ou modifier une partie quelconque de ce site sans notre consentement écrit préalable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">8. Exactitude des Informations</h2>
            <p>
              Bien que nous nous efforcions de veiller à ce que tous les articles éditoriaux et reportages d'actualité soient exacts, vérifiés et à jour, nous ne donnons aucune garantie, assurance ou déclaration concernant l'exhaustivité absolue ou l'exactitude de tout portrait, flux d'indice de marché ou documentation technique.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">9. Absence de Conseil Financier</h2>
            <p>
              <strong>Important :</strong> Aucun contenu, portrait, entretien ou article de recherche publié sur ce Site Web ne constitue un conseil financier, fiscal ou juridique. L'entretien avec Nils Suter est un portrait biographique détaillant ses expériences personnelles et ses opinions. Il ne s'agit pas d'une offre ou d'une sollicitation d'achat, de vente ou de détention de toute cryptomonnaie ou de tout instrument financier.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">10. Absence de Conseil en Investissement</h2>
            <p>
              Ni The Herald Chronicle ni Helvetia Capital n'opèrent en tant que sociétés de courtage agréées, courtiers ou conseillers en patrimoine dans quelque juridiction que ce soit. Vous devez consulter un professionnel de la finance qualifié et agréé avant de prendre toute décision d'investissement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink text-bear">11. Divulgation des Risques liés aux Cryptomonnaies</h2>
            <p className="border-l-2 border-bear pl-4 py-1.5 bg-red-950/5 text-ink-soft">
              <strong>AVERTISSEMENT :</strong> Les actifs numériques, les cryptomonnaies et les protocoles de jalonnement (staking) décentralisés sont soumis à une volatilité extrême et à des fluctuations du marché. La participation aux premiers cycles d'émission de jetons, la configuration de portefeuilles hors ligne (cold self-custody) et les pools de jalonnement spéculatifs comportent un niveau de risque élevé. Vous pourriez perdre l'intégralité de votre capital alloué. Les performances passées ne préjugent pas des résultats futurs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">12. Absence de Garantie de Rendement</h2>
            <p>
              Nous ne garantissons ni ne promettons aucun rendement, profit ou préservation des actifs lorsque vous soumettez une demande d'allocation. La manifestation d'intérêt pour un cycle d'allocation souverain est uniquement une déclaration d'intérêt et n'établit pas de contrat d'investissement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">13. Limitation de Responsabilité</h2>
            <p>
              Dans la mesure maximale permise par la loi applicable, The Herald Chronicle, Helvetia Capital ou leurs sociétés affiliées, partenaires ou rédacteurs ne pourront en aucun cas être tenus responsables de tout dommage direct, indirect, accessoire, punitif ou consécutif résultant de votre utilisation de ce Site Web, de votre confiance envers tout contenu publié ou de vos interactions avec les marchés d'actifs numériques.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">14. Indemnisation</h2>
            <p>
              Vous acceptez de défendre, d'indemniser et de dégager de toute responsabilité The Herald Chronicle ainsi que ses dirigeants, administrateurs, employés et agents contre toute réclamation, responsabilité, perte, coût ou dommage découlant de votre violation des présentes Conditions ou de votre mauvaise utilisation des services du Site Web.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">15. Services Tiers</h2>
            <p>
              Nous pouvons utiliser des services tiers (tels que la synchronisation HubSpot CRM) pour enregistrer les demandes des utilisateurs. Nous ne sommes pas responsables des performances, de la disponibilité des services ou des politiques de données de ces prestataires tiers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">16. Référence à la Politique de Confidentialité</h2>
            <p>
              Votre utilisation de ce Site Web est également régie par notre Politique de Confidentialité. Veuillez consulter notre <a href="/privacy" onClick={(e) => { e.preventDefault(); window.history.pushState({}, "", "/privacy"); }} className="text-primary hover:underline">Politique de Confidentialité</a> pour comprendre comment nous collectons et traitons vos données de contact de manière sécurisée.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">17. Suspension ou Résiliation</h2>
            <p>
              Nous nous réservons le droit de suspendre ou de résilier votre accès à notre Site Web, à notre Formulaire de Demande Souveraine ou à nos services de newsletter à tout moment, sans préavis, pour tout comportement que nous estimons contraire aux présentes Conditions ou préjudiciable à notre plateforme.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">18. Droit Applicable</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation sont régies et interprétées conformément aux lois de la <strong>Suisse</strong>, en particulier du canton de <strong>Zoug</strong>, sans référence aux principes de conflit de lois.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">19. Règlement des Différends</h2>
            <p>
              Toute action en justice, poursuite ou procédure découlant des présentes Conditions Générales d'Utilisation sera intentée exclusivement devant les tribunaux compétents de Zoug, en Suisse, et vous acceptez la compétence personnelle de ces tribunaux.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">20. Divisibilité</h2>
            <p>
              Si une disposition des présentes Conditions est jugée invalide ou inapplicable en vertu de la loi en vigueur, les autres dispositions continueront de produire leurs pleins effets.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">21. Modifications des Conditions</h2>
            <p>
              Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer les présentes Conditions à tout moment. Il est de votre responsabilité de consulter régulièrement cette page pour prendre connaissance des modifications. Votre utilisation continue du Site Web après la publication de toute mise à jour constitue votre acceptation des nouvelles Conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">22. Coordonnées de Contact</h2>
            <p>
              Si vous avez des questions concernant les présentes Conditions Générales d'Utilisation, vous pouvez contacter notre service juridique :
            </p>
            <p className="font-mono text-sm bg-surface border border-rule p-3 rounded">
              Service Juridique d'Helvetia Capital<br />
              Schloss Oberwil, Lac de Zoug<br />
              Canton de Zoug, Suisse<br />
              E-mail : legal@heraldchronicle.ch
            </p>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mx-auto max-w-[900px] border-t border-rule mt-16 px-6 py-8 text-center text-xs text-ink-soft font-mono">
        © 2026 The Herald Chronicle / Helvetia Capital. Canton de Zoug CHE-428.189. Tous droits réservés.
      </footer>
    </div>
  );
}
