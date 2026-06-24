import { useEffect } from "react";
import { Shield, ChevronLeft, Calendar } from "lucide-react";

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Politique de Confidentialité — The Herald Chronicle";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Politique de confidentialité et règles de protection des données pour les utilisateurs des plateformes The Herald Chronicle et Helvetia Capital.");
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
          <Shield className="w-3.5 h-3.5" />
          <span>Affaires Juridiques & Conformité</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-ink mb-2">
          Politique de Confidentialité
        </h1>
        
        <div className="flex items-center gap-1 text-xs text-ink-soft mb-8 pb-4 border-b border-rule font-mono">
          <Calendar className="w-3.5 h-3.5" />
          <span>Dernière mise à jour : 24 juin 2026</span>
        </div>

        <div className="prose-editorial space-y-6 text-[16px] leading-[1.7] text-ink-soft">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">1. Introduction</h2>
            <p>
              Bienvenue sur <strong>The Herald Chronicle</strong> (conjointement avec Helvetia Capital, « nous », « notre » ou « nos »). Nous nous engageons à protéger vos données personnelles et à respecter votre vie privée. Cette Politique de Confidentialité décrit comment nous collectons, utilisons, traitons et divulguons vos informations, y compris vos données personnelles, lorsque vous accédez à notre site Web, l'utilisez et soumettez des demandes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">2. Définitions</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Données Personnelles :</strong> Toute information relative à une personne physique identifiée ou identifiable.</li>
              <li><strong>CRM :</strong> Plateforme de gestion de la relation client (spécifiquement HubSpot Enterprise, utilisée par nos partenaires affiliés pour enregistrer et suivre les demandes entrantes).</li>
              <li><strong>Registre des Demandes Souveraines :</strong> Le portail de formulaire sécurisé par lequel les utilisateurs expriment leur intérêt pour les allocations d'actifs numériques.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">3. Informations que nous collectons</h2>
            <p>
              Nous collectons des informations pour fournir de meilleurs services à tous nos utilisateurs. Les données collectées dépendent de vos interactions avec notre site Web.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">4. Informations que vous fournissez</h2>
            <p>
              Lorsque vous soumettez un formulaire de contact ou d'inscription sur notre site Web (tel que le formulaire de demande souveraine), nous vous demandons des informations personnelles, notamment :
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Votre nom complet (prénom et nom de famille).</li>
              <li>Votre adresse e-mail.</li>
              <li>Votre numéro de téléphone actif.</li>
              <li>Un message personnel facultatif décrivant les paramètres de votre cas.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">5. Informations collectées automatiquement</h2>
            <p>
              Lorsque vous parcourez nos pages d'actualités quotidiennes, nous collectons automatiquement des données analytiques de base, qui comprennent :
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Informations de journalisation : type de navigateur, dates et heures d'accès, pages consultées et votre adresse IP.</li>
              <li>Informations sur l'appareil : modèle de matériel, système d'exploitation et identifiants uniques de l'appareil.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">6. Cookies et technologies de suivi</h2>
            <p>
              Nous utilisons des cookies fonctionnels pour optimiser la vitesse du site et mémoriser les paramètres de préférence du client (tels que la sélection du thème et de la langue). Vous pouvez contrôler vos préférences en matière de cookies directement dans les paramètres de votre navigateur Web. La désactivation des cookies n'affectera pas votre accès aux articles éditoriaux généraux.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">7. But de la collecte des données</h2>
            <p>
              Nous collectons vos coordonnées dans le seul but d'évaluer et de traiter les consultations sur la richesse numérique. En soumettant votre numéro de téléphone et votre adresse e-mail, vous autorisez les représentants de notre cercle de conseillers affiliés à vous contacter au sujet des allocations privées.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">8. CRM et prestataires de services tiers</h2>
            <p>
              Nous nous intégrons à des outils externes de gestion de la relation client (CRM) — spécifiquement HubSpot — via des webhooks sécurisés côté serveur. Nous ne communiquons jamais d'identifiants de connexion ni de mots de passe bruts au CRM. Le CRM est utilisé exclusivement pour compiler, cartographier et organiser en toute sécurité les demandes de contact des affiliés.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">9. Comment les informations personnelles sont utilisées</h2>
            <p>
              Vos informations personnelles sont utilisées pour :
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Vérifier votre identité et votre capacité d'allocation.</li>
              <li>Fournir un support client et résoudre les problèmes techniques d'inscription.</li>
              <li>Vous mettre en relation avec des conseillers en actifs numériques agréés en Suisse.</li>
              <li>Respecter les obligations légales en vigueur et les cadres suisses KYC/AML (connaissance du client / lutte contre le blanchiment), le cas échéant.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">10. Conservation des données</h2>
            <p>
              Nous ne conservons vos données personnelles que le temps nécessaire aux fins énoncées dans la présente Politique de Confidentialité. Nous conservons des journaux de stockage locaux dans votre navigateur pour plus de commodité, qui peuvent être effacés à tout moment par l'utilisateur à l'aide des paramètres du tableau de bord.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">11. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité côté serveur conformes aux standards de l'industrie. Nos routes de proxy d'arrière-plan encapsulent tous les points de terminaison sensibles et les jetons d'autorisation, empêchant ainsi leur exposition dans le navigateur du client. Toutes les entrées de formulaire sont cryptées lors de leur transmission via les protocoles HTTPS TLS.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">12. Transferts internationaux de données</h2>
            <p>
              Vos informations, y compris vos Données Personnelles, peuvent être transférées vers — et conservées sur — des ordinateurs situés en dehors de votre État ou pays d'origine, où les lois sur la protection des données peuvent différer. Étant donné que nos serveurs et nos couches de proxy résident en Suisse, vos données sont traitées et stockées conformément aux réglementations fédérales suisses sur les données.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">13. Communications marketing</h2>
            <p>
              Nous ne vendons, ne louons et n'échangeons pas vos informations personnelles avec des tiers à des fins de marketing. Vous recevrez uniquement des communications directement liées à la demande d'allocation que vous avez soumise.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">14. Droits des utilisateurs</h2>
            <p>
              En vertu des lois suisses et européennes applicables sur la protection des données (telles que la LPD et le RGPD), vous disposez de droits concernant vos données personnelles :
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Le droit d'accéder, de mettre à jour ou de supprimer les informations que nous détenons à votre sujet.</li>
              <li>Le droit de rectification si les informations sont inexactes ou incomplètes.</li>
              <li>Le droit de retirer votre consentement au traitement des données à tout moment.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">15. Confidentialité des enfants</h2>
            <p>
              Nos services ne s'adressent pas aux personnes de moins de 18 ans. Nous ne collectons pas sciemment d'informations d'identification personnelle auprès d'enfants. Si nous découvrons qu'un enfant de moins de 18 ans a soumis des données, nous supprimons immédiatement ces enregistrements de notre CRM.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">16. Liens tiers</h2>
            <p>
              Notre site Web peut contenir des liens vers des sites externes qui ne sont pas exploités par nos soins. Nous vous conseillons de consulter la politique de confidentialité de chaque site que vous visitez. Nous n'avons aucun contrôle et n'assumons aucune responsabilité quant au contenu ou aux pratiques des sites tiers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">17. Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour notre Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page et en mettant à jour la date de « Dernière mise à jour » en haut.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-ink">18. Coordonnées de contact</h2>
            <p>
              Pour toute question concernant la présente Politique de Confidentialité ou vos droits en matière de données, vous pouvez contacter notre équipe de conformité :
            </p>
            <p className="font-mono text-sm bg-surface border border-rule p-3 rounded">
              Bureau de Conformité d'Helvetia Capital<br />
              Schloss Oberwil, Lac de Zoug<br />
              Canton de Zoug, Suisse<br />
              E-mail : compliance@heraldchronicle.ch
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
