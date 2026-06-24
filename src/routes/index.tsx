import { useEffect } from "react";
import {
  Search, Bell, Bookmark, Moon, User, ChevronRight, BadgeCheck, Clock,
  Twitter, Linkedin, Facebook, Send, Link2, Share2, TrendingUp, TrendingDown,
  Play, ThumbsUp, MessageSquare, ArrowUpRight, Globe, Rss,
} from "lucide-react";
import heroImg from "@/assets/hero-bitcoin.jpg";
import inlineImg from "@/assets/inline-trader.jpg";
import authorImg from "@/assets/author.jpg";

const NAV = [
  "Monde", "Affaires", "Marchés", "Technologie", "Science", "Politique", "Opinion", "Culture", "Voyage",
];

const MARQUEE = [
  { s: "S&P 500", p: "5 861,40", c: "+0,31%", u: true },
  { s: "Dow Jones", p: "43 210,80", c: "+0,18%", u: true },
  { s: "Nasdaq", p: "18 520,10", c: "+0,65%", u: true },
  { s: "Or (oz)", p: "$2 738,50", c: "+0,62%", u: true },
  { s: "Pétrole Brut", p: "$78,42", c: "-0,52%", u: false },
  { s: "EUR/USD", p: "1,0841", c: "+0,14%", u: true },
  { s: "USD/CHF", p: "0,8750", c: "-0,18%", u: false },
  { s: "BTC/USD", p: "$71 842,30", c: "+2,41%", u: true },
];

const PRICES = [
  { sym: "SPX", name: "Indice S&P 500", price: "5 861,40", chg: 0.31, up: true },
  { sym: "XAU", name: "Or (once troy)", price: "$2 738,50", chg: 0.62, up: true },
  { sym: "CHF", name: "Taux USD/CHF", price: "0,8750", chg: -0.18, up: false },
  { sym: "BTC", name: "Bitcoin / USD", price: "$71 842,30", chg: 2.41, up: true },
];

const TRENDING = [
  { tag: "AFFAIRES", title: "La Réserve fédérale laisse entendre des baisses de taux alors que l'inflation sous-jacente ralentit à 2,4 %", time: "12m" },
  { tag: "EXCLUSIF", title: "Au cœur du château alpin de Zoug : Nils Suter explique comment il a transformé 500 CHF en un empire numérique", time: "38m" },
  { tag: "TECHNOLOGIE", title: "La Commission européenne détaille un projet de directives pour l'intelligence artificielle générative", time: "1h" },
  { tag: "REGLEMENTATION", title: "L'accord sur le climat de Genève engage 14 nouveaux États pour des réseaux hydroélectriques propres", time: "2h" },
  { tag: "SUISSE", title: "Les exportations horlogères suisses augmentent de 6,8 %, portées par les gammes mécaniques de luxe", time: "3h" },
];

const RELATED = [
  { cat: "Marchés", title: "Les actions mondiales grimpent à des niveaux records après la hausse des bénéfices technologiques", time: "Il y a 2h", author: "M. Alvarez" },
  { cat: "Règlementation", title: "La Banque nationale suisse transfère ses réserves vers des titres de créance souverains", time: "Il y a 3h", author: "K. Yamada" },
  { cat: "Opinion", title: "Pourquoi la souveraineté financière individuelle est la prochaine frontière de la Suisse", time: "Il y a 5h", author: "Nils Suter" },
  { cat: "Technologie", title: "Au cœur des bunkers de haute sécurité abritant les registres de données européens", time: "Il y a 7h", author: "R. Müller" },
];

const TICKER = [
  "LE GRAND JOURNAL QUOTIDIEN", "LA FED DISCUTE DE L'AJUSTEMENT DES TAUX", "L'INTERVIEW DE NILS SUTER SUSCITE UN INTÉRÊT MONDIAL", "L'OR CONTINUE SA COURSE RECORD",
];

function Sparkline({ up }: { up: boolean }) {
  const path = up
    ? "M0 28 L10 22 L20 24 L30 16 L40 18 L50 10 L60 12 L70 6 L80 8"
    : "M0 8 L10 14 L20 12 L30 18 L40 16 L50 22 L60 20 L70 26 L80 24";
  return (
    <svg viewBox="0 0 80 32" className="h-8 w-20">
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function IndexPage() {
  useEffect(() => {
    document.title = "L'Alchimiste Suisse : Comment Nils Suter a acheté un château à Zoug avec du Bitcoin — Le Grand Journal";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Au cœur du château de Zoug : Nils Suter, le pionnier de la crypto le plus célèbre de Suisse, explique en détail comment le Bitcoin lui a sauvé la vie, sa philosophie sur la souveraineté, et pourquoi il finance la prochaine génération de développeurs européens.");
    }

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("button, a, input[type='submit']");
      
      if (clickable) {
        const href = clickable.getAttribute("href");
        
        // If it is an internal legal link, navigate locally in the same tab
        if (href === "/privacy" || href === "/terms") {
          e.preventDefault();
          e.stopPropagation();
          window.history.pushState({}, "", href);
          return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        window.open("/enquiry", "_blank");
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breaking bar */}
      <div className="border-b border-rule bg-ink text-background">
        <div className="mx-auto flex max-w-[1320px] items-center gap-4 px-6 py-2 text-[12px]">
          <span className="shrink-0 rounded-sm bg-bear px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">EXCLUSIF</span>
          <div className="relative flex-1 overflow-hidden">
            <div className="ticker-track flex gap-10 whitespace-nowrap">
              {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i} className="text-background/80">• {t}</span>
              ))}
            </div>
          </div>
          <span className="hidden shrink-0 text-background/60 md:inline">Nils Suter, pionnier de la crypto à Zoug, rompt le silence dans une interview rare</span>
        </div>
      </div>

      {/* Utility bar */}
      <div className="hidden border-b border-rule bg-surface md:block">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-1.5 text-[11px] text-ink-soft">
          <div className="flex items-center gap-4">
            <span className="font-medium text-ink">Mercredi 24 juin 2026</span>
            <span className="hidden lg:inline">Genève · 13h47 CET</span>
            <span className="hidden items-center gap-1.5 lg:flex"><span className="h-1.5 w-1.5 rounded-full bg-bull" /> Marchés Actifs</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-ink">Newsletters</a>
            <a href="#" className="hover:text-ink">Bulletins</a>
            <a href="#" className="hover:text-ink font-semibold text-primary">Rejoindre le Cercle Souverain</a>
            <a href="#" className="font-semibold text-ink hover:underline">Demander une Allocation</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-rule bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center gap-6 px-6 py-3">
          <a href="/" className="flex items-baseline gap-1.5">
            <span className="font-serif text-2xl font-bold tracking-tight text-ink">Le Grand Journal</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Quotidien</span>
          </a>
          <div className="ml-auto flex items-center gap-1">
            {[Search, Bell, Bookmark, Moon].map((Icon, i) => (
              <button key={i} className="rounded-md p-2 text-ink-soft transition-colors hover:bg-surface hover:text-ink">
                <Icon className="h-4 w-4" />
              </button>
            ))}
            <button className="ml-2 rounded-sm bg-ink px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-background transition-opacity hover:opacity-90">
              Demander une Allocation
            </button>
            <div className="ml-2 grid h-8 w-8 place-items-center rounded-full bg-surface text-ink">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
        {/* Primary nav */}
        <nav className="hidden border-t border-rule lg:block">
          <div className="mx-auto flex max-w-[1320px] items-center gap-6 overflow-x-auto px-6 py-2.5">
            {NAV.map((n, i) => (
              <a
                key={n}
                href="#"
                className={`shrink-0 text-[12px] font-medium uppercase tracking-wider transition-colors hover:text-ink ${i === 1 ? "text-ink font-semibold" : "text-ink-soft"}`}
              >
                {n}
              </a>
            ))}
            <span className="ml-auto shrink-0 text-[11px] text-ink-soft">Plus ▾</span>
          </div>
        </nav>
        {/* Live price marquee */}
        <div className="border-t border-rule bg-background">
          <div className="mx-auto flex max-w-[1320px] items-center gap-3 px-6 py-1.5">
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-ink-soft">Marchés</span>
            <span className="hidden h-3 w-px shrink-0 bg-rule sm:inline-block" />
            <div className="relative flex-1 overflow-hidden">
              <div className="ticker-track flex gap-8 whitespace-nowrap text-[12px]">
                {[...MARQUEE, ...MARQUEE].map((m, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="font-semibold text-ink">{m.s}</span>
                    <span className="font-mono text-ink">{m.p}</span>
                    <span className={`font-mono ${m.u ? "text-bull" : "text-bear"}`}>{m.c}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1320px] px-6 pt-6">
        <nav className="flex items-center gap-1.5 text-[12px] text-ink-soft">
          <a href="#" className="hover:text-ink">Accueil</a>
          <ChevronRight className="h-3 w-3" />
          <a href="#" className="hover:text-ink">Portraits</a>
          <ChevronRight className="h-3 w-3" />
          <a href="#" className="hover:text-ink">Citoyens Souverains</a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink">Profil de Nils Suter</span>
        </nav>
      </div>

      {/* Article */}
      <main className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-6 pt-8 lg:grid-cols-[1fr_340px]">
        <article className="relative max-w-[760px]">
          {/* Floating share */}
          <div className="absolute -left-16 top-32 hidden flex-col gap-2 xl:flex">
            {[Twitter, Linkedin, Facebook, Send, Link2, Bookmark].map((Icon, i) => (
              <button key={i} className="grid h-9 w-9 place-items-center rounded-full border border-rule text-ink-soft transition-all hover:-translate-y-0.5 hover:border-ink hover:text-ink">
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>

          <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
            <span>Rapport Spécial</span>
            <span className="h-3 w-px bg-rule" />
            <span className="text-ink-soft">Souveraineté Suisse · Portraits</span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-ink md:text-[52px]">
            L'Alchimiste Suisse : Comment Nils Suter, le 'franc-tireur de la crypto' de Zoug, a transformé un pari de 500 CHF en un château dans les Alpes
          </h1>

          <p className="mt-6 font-serif text-xl leading-relaxed text-ink-soft">
            Dans une interview exclusive au sein de son domaine rénové du XIVe siècle à Zoug, Nils Suter, le pionnier de la crypto le plus célèbre de Suisse, détaille comment le Bitcoin lui a sauvé la vie, sa philosophie sur la souveraineté, et pourquoi il ouvre l'accès à son cercle restreint.
          </p>

          {/* Author card */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-rule py-4">
            <img src={authorImg} alt="Elena Hart" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                Elena Hart
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="text-[11px] text-ink-soft">Correspondante Crypto · The Herald Chronicle</div>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-4 text-[11px] text-ink-soft">
              <span>Publié le <span className="text-ink">24 juin 2026</span></span>
              <span>Mis à jour <span className="text-ink">il y a 10 min</span></span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 11 min de lecture</span>
              <span className="flex items-center gap-1 rounded-full border border-rule px-2 py-0.5">
                <BadgeCheck className="h-3 w-3 text-bull" /> Profil Vérifié
              </span>
            </div>
          </div>

          {/* Hero image */}
          <figure className="mt-8">
            <img src={heroImg} alt="Nils Suter, pionnier de la crypto, lors de son entretien exclusif avec Le Grand Journal" width={1600} height={900} className="aspect-[16/9] w-full rounded-md object-cover" />
            <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-[12px] text-ink-soft">
              <span>Nils Suter (à droite) s'exprimant lors de son entretien exclusif pour Le Grand Journal, détaillant son parcours et sa vision de la souveraineté numérique.</span>
              <span className="italic">Photo : The Herald Chronicle / Jean-Luc Bovet</span>
            </figcaption>
          </figure>

          {/* Body */}
          <div className="prose-article mt-10 space-y-6 font-serif text-[19px] leading-[1.8] text-ink">
            <p>
              Niché sur les hauteurs des eaux brumeuses du lac de Zoug, les portes médiévales du Schloss Oberwil s'ouvrent pour révéler un paradoxe. À l'extérieur, les murs de pierre se dressent comme ils le font depuis 1380. À l'intérieur, une série d'écrans lumineux affiche en temps réel les validations de blocs sur trois continents. C'est le quartier général de <strong>Nils Suter</strong>, un ancien administrateur système zurichois de 38 ans, largement considéré comme l'accumulateur individuel de crypto-actifs le plus prospère de Suisse.
            </p>
            <p>
              L'histoire de Suter est légendaire dans la « Crypto Valley » de Zoug, mais il s'est rarement confié à la presse. Aujourd'hui, vêtu d'un simple pull en laine mérinos, il sert de l'eau minérale et explique comment un achat impulsif de 500 CHF en 2011 l'a transformé : d'un ingénieur informatique surmené peinant à payer un loyer de 900 CHF, il est devenu un milliardaire souverain.
            </p>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">« Mes collègues pensaient que j'avais perdu la tête »</h2>
            <p>
              En 2011, Suter travaillait dans une banque privée suisse traditionnelle à Zurich. « Je m'occupais de serveurs obsolètes, regardant d'immenses quantités de capitaux défiler sur les écrans, sans que rien ne m'appartienne », se souvient Suter. « Je travaillais 60 heures par semaine et à la fin du mois, après impôts et loyer zurichois, il ne me restait plus rien. »
            </p>
            <p>
              Lorsqu'il a lu le livre blanc du Bitcoin sur un forum de cryptographie, le déclic s'est produit. Il a dépensé 500 CHF — exactement la moitié de ses économies de l'époque — pour acheter du Bitcoin à environ 3,50 CHF l'unité. « Mes collègues de la banque ont ri. Ils m'ont dit que c'était de la monnaie de singe pour geeks d'Internet et que j'allais tout perdre. Je leur ai répondu que le système traditionnel repose sur votre dépendance. La crypto repose sur votre propre capacité. »
            </p>

            {/* Pull quote */}
            <blockquote className="my-10 border-l-2 border-primary pl-6 font-serif text-2xl leading-snug text-ink">
              « La souveraineté ne concerne pas seulement le rendement financier. C'est une question de temps. Pour la première fois de l'histoire humaine, un individu peut sécuriser son travail et sa richesse dans un code qu'aucun État, banque ou entreprise ne peut diluer ou confisquer. »
              <footer className="mt-3 text-[13px] font-sans font-medium not-italic text-ink-soft">
                — Nils Suter, au Schloss Oberwil, Zoug
              </footer>
            </blockquote>

            <p>
              Lorsqu'il s'est installé à Zoug en 2013, Suter avait accumulé des milliers de jetons. Il est devenu l'un des architectes fondateurs des directives fiscales sur la crypto-activité du canton, contribuant à transformer une paisible ville suisse en une véritable « Crypto Valley » mondiale qui abrite aujourd'hui les sièges de centaines de grandes fondations.
            </p>

            {/* Stat grid */}
            <div className="not-prose my-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-rule bg-rule md:grid-cols-4">
              {[
                { v: "3,50 CHF", l: "Prix d'achat initial" },
                { v: "2011", l: "Année de découverte" },
                { v: "XIVe s.", l: "Quartier général à Zoug" },
                { v: "1,4B+ CHF", l: "Actifs sous gestion" },
              ].map((s) => (
                <div key={s.l} className="bg-background p-5">
                  <div className="font-serif text-2xl font-bold text-ink">{s.v}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-soft">{s.l}</div>
                </div>
              ))}
            </div>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">Survivre à l'hiver : l'état d'esprit souverain</h2>
            <p>
              Son parcours a été loin d'être facile. Suter a traversé fins corrections majeures du marché, y compris le piratage de Mt. Gox en 2014 où il a perdu une partie de ses avoirs, le krach de 2018 et les liquidations de 2022. « Les gens voient le château, ils voient les actifs suisses, mais ils ne voient pas les nuits de 2018 où mon portefeuille s'est effondré de 85 % et où tout le monde disait que le Bitcoin était mort. Je n'ai jamais vendu un seul satoshi. Pourquoi ? Parce que les fondamentaux n'avaient pas changé. »
            </p>
            <p>
              Aujourd'hui, à travers sa société d'investissement privée **Helvetia Capital** et la **Fondation Helvetia**, Suter oriente ses efforts vers la transmission de pouvoir. Il ouvre les allocations de son cercle privé de souveraineté crypto, permettant à des personnes qualifiées de solliciter son réseau de conseillers et de participer à des opportunités Web3 de premier plan.
            </p>

            <ul className="not-prose my-6 space-y-2.5 text-[17px] font-sans text-ink">
              {[
                "Allocations Helvetia Sovereign : Désormais ouvertes aux demandes privées",
                "Cadres de garde suisses entièrement conformes avec sécurité de niveau bancaire",
                "Programmes de mentorat direct pour les créateurs de richesse numérique",
                "Co-investissements dans des fermes de validateurs suisses alimentées par l'hydroélectricité",
              ].map((l) => (
                <li key={l} className="flex gap-3"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink" />{l}</li>
              ))}
            </ul>

            {/* Inline image */}
            <figure className="not-prose my-10">
              <img src={inlineImg} alt="Centre de données dans les Alpes suisses" loading="lazy" width={1600} height={900} className="aspect-[16/9] w-full rounded-md object-cover" />
              <figcaption className="mt-3 text-[12px] text-ink-soft">Coffres-forts alpins suisses abritant les clés cryptographiques physiques d'Helvetia Capital. <span className="italic">Photo : Bloomberg</span></figcaption>
            </figure>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">Pourquoi il ouvre les portes</h2>
            <p>
              « Je n'ai pas besoin de plus d'argent », déclare franchement Suter. « Ce dont j'ai besoin, ce sont des alliés. La prochaine phase de la révolution des actifs numériques consiste à construire des réseaux souverains. En ouvrant notre cercle privé, nous connectons des particuliers fortunés, des entrepreneurs et des institutions avec les flux d'opportunités et l'architecture de sécurité précis qui ont fait ma fortune. »
            </p>

            {/* Data table */}
            <div className="not-prose my-8 overflow-hidden rounded-md border border-rule">
              <table className="w-full text-left text-[14px] font-sans">
                <thead className="bg-surface text-[11px] uppercase tracking-wider text-ink-soft">
                  <tr>
                    <th className="px-4 py-3">Matrice de Souveraineté</th>
                    <th className="px-4 py-3 text-right">Richesse Classique</th>
                    <th className="px-4 py-3 text-right">Palier Souverain Suisse</th>
                    <th className="px-4 py-3 text-right">Effet de Levier Crypto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {[
                    ["Contrôle des Actifs", "Dépendance vis-à-vis de tiers", "Garde à Froid Directe", "Nœuds Auto-Gérés"],
                    ["Efficacité Fiscale", "Tranches standard", "Conforme au Canton de Zoug", "Fondations Optimisées"],
                    ["Accès aux Opportunités", "Marchés publics", "Allocations de Capital-Risque Primaires", "Pré-ventes Exclusives"],
                    ["Puissance du Réseau", "Investisseur passif", "Conseil de Nils Suter", "Droits de Co-fondateur"],
                  ].map((row) => (
                    <tr key={row[0]} className="bg-background">
                      <td className="px-4 py-3 font-medium text-ink">{row[0]}</td>
                      <td className="px-4 py-3 text-right text-bear">{row[1]}</td>
                      <td className="px-4 py-3 text-right text-bull font-medium">{row[2]}</td>
                      <td className="px-4 py-3 text-right font-mono text-ink-soft">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              Pour s'inscrire sur la liste d'allocation de Suter ou soumettre une demande directe au bureau d'Helvetia Capital à Zoug, les lecteurs sont invités à soumettre une Demande de Souveraineté officielle. Le processus de candidature exige la vérification des coordonnées et la définition des paramètres d'investissement et d'intérêt.
            </p>

            {/* Did you know */}
            <aside className="not-prose my-10 rounded-md border-l-2 border-primary bg-surface p-6">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-primary">Note de la Rédaction</div>
              <p className="font-serif text-[17px] leading-relaxed text-ink">
                En raison d'un intérêt exceptionnel, les allocations au sein d'Helvetia Capital sont examinées au fil de l'eau. Tous les boutons et formulaires de demande de cette page dirigeront immédiatement les candidats vers le registre suisse sécurisé des demandes dans un nouvel onglet.
              </p>
            </aside>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">Le mot de la fin : « N'attendez pas »</h2>
            <p>
              « Le transfert de richesse des systèmes fiduciaires hérités vers des actifs souverains numériques n'est réalisé qu'à 1 % », conclut Suter, le regard tourné vers les Alpes. « Vous pouvez regarder cela se produire, ou vous pouvez occuper le château. Le choix vous appartenait en 2011, et il vous appartient encore aujourd'hui. »
            </p>

            {/* Key takeaways */}
            <div className="not-prose my-10 rounded-md border border-rule bg-background p-6">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-ink">Points clés du portrait de Suter</div>
              <ol className="space-y-3 text-[15px] font-sans text-ink">
                {[
                  "Nils Suter a transformé 500 CHF d'économies informatiques en un portefeuille de crypto-actifs suisses de plusieurs millions.",
                  "Création de Helvetia Capital à Zoug pour financer et développer les actifs numériques souverains.",
                  "Met l'accent sur l'auto-garde à froid et les structures réglementaires suisses pour la protection des actifs.",
                  "Ouverture d'allocations sécurisées et directes pour les partenaires de forte conviction via un formulaire de demande.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-[10px] font-bold text-background">{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Video embed */}
          <div className="mt-10 overflow-hidden rounded-md border border-rule bg-surface">
            <div className="relative aspect-[16/9] bg-ink">
              <img src={inlineImg} alt="Nils Suter Interview Video" className="h-full w-full object-cover opacity-50" />
              <button className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-background/95 text-ink shadow-xl transition-transform hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </span>
              </button>
              <div className="absolute bottom-3 right-3 rounded-sm bg-ink/80 px-2 py-0.5 text-[11px] font-mono text-background">18:42</div>
            </div>
            <div className="p-4">
              <div className="text-[11px] uppercase tracking-widest text-primary font-semibold">Exclusivités</div>
              <div className="mt-1 font-serif text-lg font-semibold text-ink">Regarder : Nils Suter parcourt sa salle des serveurs alpine et sa chambre forte de clés froides</div>
            </div>
          </div>

          {/* Poll */}
          <div className="mt-10 rounded-md border border-rule p-6">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">Sondage des Lecteurs</div>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">Comment prévoyez-vous de naviguer dans le paysage financier mondial en mutation en 2026 ?</h3>
            <div className="mt-6 space-y-3">
              {[
                { l: "Augmenter l'exposition aux actifs souverains auto-gérés", v: 72, c: "bg-bull" },
                { l: "Rester sur les fonds indiciels traditionnels et les banques commerciales", v: 21, c: "bg-primary" },
                { l: "Chercher refuge dans l'immobilier physique et les métaux précieux", v: 7, c: "bg-bear" },
              ].map((p) => (
                <div key={p.l} className="cursor-pointer group">
                  <div className="mb-1 flex justify-between text-[13px]">
                    <span className="font-medium text-ink group-hover:text-primary transition-colors">{p.l}</span>
                    <span className="font-mono text-ink-soft">{p.v}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface">
                    <div className={`h-full ${p.c}`} style={{ width: `${p.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-[11px] text-ink-soft">4 284 votes · Adresses IP Vérifiées</div>
          </div>

          {/* Comments */}
          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-ink">Commentaires <span className="text-ink-soft">(142)</span></h3>
              <button className="text-[12px] font-semibold uppercase tracking-wider text-primary">Trier par : Tops</button>
            </div>
            <div className="space-y-6">
              {[
                { n: "David Renault", h: "Résident de Zoug", t: "J'ai vu Nils se promener autour du lac de Zoug. Le gars est incroyablement terre-à-terre malgré sa réussite. Son engagement envers l'éducation Web3 ici est bien réel.", l: 242, r: 8, ago: "2h" },
                { n: "Aisha Khan", h: "Gestionnaire de Portefeuille", t: "Le paysage bancaire suisse évolue rapidement. Le point de vue de Suter sur la rigueur plutôt que la dilution est tout à fait pertinent. Je demande à rejoindre le cercle d'Helvetia immédiatement.", l: 114, r: 4, ago: "3h" },
                { n: "Tomás Ribeiro", h: "Abonné Souverain", t: "Passer d'administrateur système en difficulty à propriétaire de château dans les Alpes est le rêve ultime. Mais le stress de tenir bon pendant l'hiver 2018 en aurait tué plus d'un.", l: 91, r: 12, ago: "4h" },
              ].map((c) => (
                <div key={c.n} className="flex gap-4 border-b border-rule pb-6">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface text-[12px] font-semibold text-ink">
                    {c.n.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[13px]">
                      <span className="font-semibold text-ink">{c.n}</span>
                      <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                      <span className="text-ink-soft">· {c.h} · il y a {c.ago}</span>
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink">{c.t}</p>
                    <div className="mt-3 flex items-center gap-5 text-[12px] text-ink-soft">
                      <button className="flex items-center gap-1.5 hover:text-ink"><ThumbsUp className="h-3.5 w-3.5" /> {c.l}</button>
                      <button className="flex items-center gap-1.5 hover:text-ink"><MessageSquare className="h-3.5 w-3.5" /> {c.r} réponses</button>
                      <button className="hover:text-ink">Partager</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full rounded-sm border border-rule py-3 text-[12px] font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-surface">
              Charger plus de commentaires
            </button>
          </section>

          {/* Sources */}
          <section className="mt-12 border-t border-rule pt-8">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">Archives Vérifiées</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { name: "Swissinfo.ch", link: "#" },
                { name: "Registre du commerce de Zoug", link: "#" },
                { name: "Registre de la Fondation Helvetia", link: "#" },
                { name: "Actifs numériques de la FINMA", link: "#" },
                { name: "Archives de Bitcoin Suisse", link: "#" }
              ].map((s) => (
                <a key={s.name} href={s.link} className="flex items-center gap-1.5 rounded-sm border border-rule px-3 py-1.5 text-[12px] text-ink-soft transition-colors hover:border-ink hover:text-ink">
                  {s.name} <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </section>

          {/* Author box */}
          <section className="mt-12 rounded-md border border-rule bg-surface p-6">
            <div className="flex flex-wrap items-start gap-5">
              <img src={authorImg} alt="" width={80} height={80} className="h-20 w-20 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-xl font-bold text-ink">Elena Hart</h4>
                  <BadgeCheck className="h-4 w-4 text-primary" />
                </div>
                <div className="text-[12px] uppercase tracking-wider text-ink-soft">Correspondante Crypto</div>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                  Elena couvre les marchés d'actifs numériques, les évolutions réglementaires suisses et le capital-risque de la blockchain pour The Herald Chronicle. Auparavant journaliste au Financial Times, elle suit l'essor de la Crypto Valley de Zoug depuis 2015.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button className="rounded-sm bg-ink px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-background hover:opacity-90">Suivre la correspondante</button>
                  <a href="#" className="text-ink-soft hover:text-ink"><Twitter className="h-4 w-4" /></a>
                  <a href="#" className="text-ink-soft hover:text-ink"><Linkedin className="h-4 w-4" /></a>
                  <a href="#" className="text-[12px] text-ink-soft hover:text-ink">elena.hart@heraldchronicle.ch</a>
                </div>
              </div>
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-32 lg:self-start">
          {/* Market prices */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-ink font-sans">Cours du Marché</h3>
              <span className="flex items-center gap-1 text-[10px] text-ink-soft font-sans"><span className="h-1.5 w-1.5 rounded-full bg-bull" /> Flux en direct</span>
            </div>
            <div className="divide-y divide-rule rounded-md border border-rule">
              {PRICES.map((p) => (
                <div key={p.sym} className="flex items-center gap-3 px-3 py-2.5">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-surface text-[10px] font-bold text-ink">{p.sym}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-semibold text-ink">{p.name}</div>
                    <div className="font-mono text-[11px] text-ink-soft">{p.price}</div>
                  </div>
                  <div className={p.up ? "text-bull" : "text-bear"}><Sparkline up={p.up} /></div>
                  <div className={`flex items-center gap-0.5 font-mono text-[12px] tabular-nums ${p.up ? "text-bull" : "text-bear"}`}>
                    {p.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {p.up ? "+" : ""}{p.chg}%
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sovereign Allocation Widget */}
          <section className="rounded-md border border-rule p-5 bg-surface/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full pointer-events-none" />
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-primary">Helvetia Capital</h3>
            <h4 className="mt-2 font-serif text-lg font-bold text-ink leading-snug">Demander l'accès à l'allocation du cercle restreint de Nils Suter</h4>
            <p className="mt-2 text-[12px] text-ink-soft leading-relaxed">
              Soumettez votre demande pour rejoindre le tour de table privé. Les candidats vérifiés recevront les présentations d'investissement, les journaux de rendement et un accès direct aux conseils.
            </p>
            <button className="mt-4 w-full rounded-sm bg-ink text-background py-2 text-[12px] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer">
              Soumettre la Demande de Souveraineté
            </button>
          </section>

          {/* Fear & Greed */}
          <section className="rounded-md border border-rule p-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft font-sans">Indice de Sentiment de Souveraineté</h3>
            <div className="mt-4 flex items-end gap-4">
              <div className="font-serif text-5xl font-bold text-ink">84</div>
              <div className="pb-2 text-[12px] font-semibold text-bull font-sans">Fierté Extrême</div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
              <div className="h-full bg-gradient-to-r from-bear via-amber-500 to-bull" style={{ width: "84%" }} />
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-ink-soft font-sans">
              <span>Standard Financier</span><span>Souveraineté Financière</span>
            </div>
          </section>

          {/* Trending */}
          <section>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-ink font-sans">Portraits Tendances</h3>
            <ol className="space-y-4">
              {TRENDING.map((t, i) => (
                <li key={i} className="flex gap-3 border-b border-rule pb-4 last:border-0">
                  <span className="font-serif text-2xl font-bold text-ink-soft/40">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 font-sans">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">{t.tag}</div>
                    <a href="#" className="mt-1 block text-[13px] font-medium leading-snug text-ink hover:underline">{t.title}</a>
                    <div className="mt-1 text-[11px] text-ink-soft">il y a {t.time}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Newsletter Box */}
          <section className="rounded-md bg-ink p-6 text-background">
            <h3 className="font-serif text-xl font-bold leading-tight">Le Bulletin Quotidien</h3>
            <p className="mt-2 text-[13px] text-background/70 font-sans">Un résumé de 5 minutes de l'actualité mondiale, de la finance et des reportages exclusifs dans votre boîte de réception, en semaine à 7h.</p>
            <div className="mt-4 space-y-2">
              <input
                type="email"
                placeholder="votre@email.ch"
                className="w-full rounded-sm border border-background/20 bg-background/10 px-3 py-2.5 text-[13px] text-background placeholder:text-background/40 focus:border-background focus:outline-none"
              />
              <button className="w-full rounded-sm bg-background py-2.5 text-[12px] font-semibold uppercase tracking-wider text-ink hover:opacity-90 cursor-pointer">
                S'abonner à la Newsletter
              </button>
            </div>
          </section>
        </aside>
      </main>

      {/* Related */}
      <section className="mx-auto mt-20 max-w-[1320px] border-t border-rule px-6 pt-12">
        <div className="flex items-end justify-between font-sans">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink">Articles du Monde Liés</h2>
          <a href="#" className="text-[12px] font-semibold uppercase tracking-wider text-primary hover:underline">Voir tout</a>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED.map((r, i) => (
            <a key={i} href="#" className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-md bg-surface">
                <div className="h-full w-full bg-gradient-to-br from-ink/10 via-primary/10 to-bull/10 transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-primary font-sans">{r.cat}</div>
              <h3 className="mt-1.5 font-serif text-lg font-semibold leading-snug text-ink group-hover:underline">{r.title}</h3>
              <div className="mt-2 text-[11px] text-ink-soft font-sans">{r.author} · {r.time}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Latest horizontal */}
      <section className="mx-auto mt-20 max-w-[1320px] px-6">
        <div className="mb-6 flex items-center justify-between font-sans">
          <h2 className="font-serif text-2xl font-bold text-ink">Mises à jour des Cantons</h2>
          <div className="flex items-center gap-1 text-[11px] text-ink-soft"><span className="h-1.5 w-1.5 rounded-full bg-bear" /> Flux actif</div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {TRENDING.slice(0, 5).map((t, i) => (
            <a key={i} href="#" className="w-72 shrink-0 rounded-md border border-rule p-4 transition-colors hover:bg-surface">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-primary font-sans">{t.tag}</div>
              <h4 className="mt-2 font-serif text-[15px] font-semibold leading-snug text-ink">{t.title}</h4>
              <div className="mt-3 text-[11px] text-ink-soft font-sans">il y a {t.time}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 border-t border-rule bg-background">
        <div className="mx-auto max-w-[1320px] px-6 py-14">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-6 font-sans">
            <div className="col-span-2">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-ink">Le Grand Journal</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Quotidien</span>
              </div>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ink-soft">
                Informations sur les politiques mondiales, les tendances des affaires, les percées technologiques et les profils d'investissement souverains.
              </p>
              <div className="mt-5 flex gap-2">
                {[Twitter, Linkedin, Facebook, Send, Rss].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-rule text-ink-soft hover:border-ink hover:text-ink">
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { h: "Rédaction", l: [{ t: "Actualités Mondiales", h: "#" }, { t: "Politique et Réglementation", h: "#" }, { t: "Affaires", h: "#" }, { t: "Flux des Marchés", h: "#" }, { t: "Science", h: "#" }, { t: "Arts & Culture", h: "#" }] },
              { h: "Affaires", l: [{ t: "Aperçu des Marchés", h: "#" }, { t: "Finances Personnelles", h: "#" }, { t: "Immobilier", h: "#" }, { t: "Staking d'Entreprise", h: "#" }, { t: "Registres de l'Économie", h: "#" }] },
              { h: "Opinion", l: [{ t: "Éditoriaux", h: "#" }, { t: "Tribunes", h: "#" }, { t: "Courrier des Lecteurs", h: "#" }, { t: "Chroniques", h: "#" }, { t: "Portraits", h: "#" }] },
              { h: "Mentions Légales", l: [{ t: "Politique de Confidentialité", h: "/privacy" }, { t: "Conditions Générales", h: "/terms" }, { t: "Clause de Non-responsabilité Souveraine", h: "#" }, { t: "Contacter le Bureau de Genève", h: "#" }] },
            ].map((col) => (
              <div key={col.h}>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-ink">{col.h}</div>
                <ul className="mt-4 space-y-2.5 text-[13px] text-ink-soft">
                  {col.l.map((link) => (
                    <li key={link.t}>
                      <a href={link.h} className="hover:text-ink">
                        {link.t}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-rule pt-6 text-[12px] text-ink-soft md:flex-row md:items-center font-sans">
            <div>© 2026 Le Grand Journal Media. Genève CHE-428.189. Tous droits réservés.</div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <button className="flex items-center gap-1.5 hover:text-ink"><Globe className="h-3.5 w-3.5" /> Français (CH)</button>
              <a href="#" className="hover:text-ink">Divulgations</a>
              <button className="hover:text-ink font-semibold">Retour en haut ↑</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
