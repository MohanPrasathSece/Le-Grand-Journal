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
  "World", "Business", "Markets", "Technology", "Science", "Policy", "Opinion", "Culture", "Travel",
];

const MARQUEE = [
  { s: "S&P 500", p: "5,861.40", c: "+0.31%", u: true },
  { s: "Dow Jones", p: "43,210.80", c: "+0.18%", u: true },
  { s: "Nasdaq", p: "18,520.10", c: "+0.65%", u: true },
  { s: "Gold (oz)", p: "$2,738.50", c: "+0.62%", u: true },
  { s: "Crude Oil", p: "$78.42", c: "-0.52%", u: false },
  { s: "EUR/USD", p: "1.0841", c: "+0.14%", u: true },
  { s: "USD/CHF", p: "0.8750", c: "-0.18%", u: false },
  { s: "BTC/USD", p: "$71,842.30", c: "+2.41%", u: true },
];

const PRICES = [
  { sym: "SPX", name: "S&P 500 Index", price: "5,861.40", chg: 0.31, up: true },
  { sym: "XAU", name: "Gold (troy oz)", price: "$2,738.50", chg: 0.62, up: true },
  { sym: "CHF", name: "USD/CHF Rate", price: "0.8750", chg: -0.18, up: false },
  { sym: "BTC", name: "Bitcoin / USD", price: "$71,842.30", chg: 2.41, up: true },
];

const TRENDING = [
  { tag: "BUSINESS", title: "Federal Reserve hints at rate cuts as core inflation cools to 2.4%", time: "12m" },
  { tag: "EXCLUSIVE", title: "Inside Zug's Alpine Castle: Nils Suter on turning CHF 500 into a digital empire", time: "38m" },
  { tag: "TECHNOLOGY", title: "EU commission details draft guidelines for generative artificial intelligence", time: "1h" },
  { tag: "POLICY", title: "Geneva climate accord signs 14 new states for clean hydro power grids", time: "2h" },
  { tag: "SWITZERLAND", title: "Swiss watchmaking exports climb 6.8% led by luxury mechanical lines", time: "3h" },
];

const RELATED = [
  { cat: "Markets", title: "Global equities climb to record highs following tech earnings rally", time: "2h ago", author: "M. Alvarez" },
  { cat: "Policy", title: "Swiss central bank shifts reserves into sovereign debt securities", time: "3h ago", author: "K. Yamada" },
  { cat: "Opinion", title: "Why individual financial sovereignty is Switzerland's next frontier", time: "5h ago", author: "Nils Suter" },
  { cat: "Technology", title: "Inside the deep security bunkers hosting European data ledgers", time: "7h ago", author: "R. Müller" },
];

const TICKER = [
  "LE GRAND JOURNAL DAILY", "FED DISCUSSES RATE ADJUSTMENTS", "NILS SUTER INTERVIEW GAINS GLOBAL INTEREST", "GOLD CONTINUES RECORD RUN",
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
    document.title = "The Swiss Alchemist: How Nils Suter Bought a Zug Castle with Bitcoin — Le Grand Journal";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Inside the Castle of Zug: Switzerland’s most famous crypto pioneer Nils Suter details how Bitcoin saved his life, his philosophy on sovereignty, and why he is funding Europe's next-gen developers.");
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
          <span className="shrink-0 rounded-sm bg-bear px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">EXCLUSIVE</span>
          <div className="relative flex-1 overflow-hidden">
            <div className="ticker-track flex gap-10 whitespace-nowrap">
              {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i} className="text-background/80">• {t}</span>
              ))}
            </div>
          </div>
          <span className="hidden shrink-0 text-background/60 md:inline">Zug Crypto pioneer Nils Suter breaks silence in rare interview</span>
        </div>
      </div>

      {/* Utility bar */}
      <div className="hidden border-b border-rule bg-surface md:block">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-1.5 text-[11px] text-ink-soft">
          <div className="flex items-center gap-4">
            <span className="font-medium text-ink">Wednesday, June 24, 2026</span>
            <span className="hidden lg:inline">Geneva · 13:47 CET</span>
            <span className="hidden items-center gap-1.5 lg:flex"><span className="h-1.5 w-1.5 rounded-full bg-bull" /> Markets Active</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-ink">Newsletters</a>
            <a href="#" className="hover:text-ink">Briefings</a>
            <a href="#" className="hover:text-ink font-semibold text-primary">Join Sovereign Circle</a>
            <a href="#" className="font-semibold text-ink hover:underline">Apply for Allocation</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-rule bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center gap-6 px-6 py-3">
          <a href="/" className="flex items-baseline gap-1.5">
            <span className="font-serif text-2xl font-bold tracking-tight text-ink">Le Grand Journal</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Daily</span>
          </a>
          <div className="ml-auto flex items-center gap-1">
            {[Search, Bell, Bookmark, Moon].map((Icon, i) => (
              <button key={i} className="rounded-md p-2 text-ink-soft transition-colors hover:bg-surface hover:text-ink">
                <Icon className="h-4 w-4" />
              </button>
            ))}
            <button className="ml-2 rounded-sm bg-ink px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-background transition-opacity hover:opacity-90">
              Apply for Allocation
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
            <span className="ml-auto shrink-0 text-[11px] text-ink-soft">More ▾</span>
          </div>
        </nav>
        {/* Live price marquee */}
        <div className="border-t border-rule bg-background">
          <div className="mx-auto flex max-w-[1320px] items-center gap-3 px-6 py-1.5">
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-ink-soft">Markets</span>
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
          <a href="#" className="hover:text-ink">Home</a>
          <ChevronRight className="h-3 w-3" />
          <a href="#" className="hover:text-ink">Profiles</a>
          <ChevronRight className="h-3 w-3" />
          <a href="#" className="hover:text-ink">Sovereign Citizens</a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink">Nils Suter Profile</span>
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
            <span>Special Report</span>
            <span className="h-3 w-px bg-rule" />
            <span className="text-ink-soft">Swiss Sovereignty · Profiles</span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-ink md:text-[52px]">
            The Swiss Alchemist: How Zug's 'Crypto Maverick' Nils Suter Turned a CHF 500 Bet into a Castle in the Alps
          </h1>

          <p className="mt-6 font-serif text-xl leading-relaxed text-ink-soft">
            In an exclusive interview inside his renovated 14th-century estate in Zug, Switzerland’s most famous crypto pioneer Nils Suter details how Bitcoin saved his life, his philosophy on sovereignty, and why he is opening access to his inner circle.
          </p>

          {/* Author card */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-rule py-4">
            <img src={authorImg} alt="Elena Hart" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                Elena Hart
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="text-[11px] text-ink-soft">Crypto Correspondent · The Herald Chronicle</div>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-4 text-[11px] text-ink-soft">
              <span>Published <span className="text-ink">June 24, 2026</span></span>
              <span>Updated <span className="text-ink">10m ago</span></span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 11 min read</span>
              <span className="flex items-center gap-1 rounded-full border border-rule px-2 py-0.5">
                <BadgeCheck className="h-3 w-3 text-bull" /> Verified Profile
              </span>
            </div>
          </div>

          {/* Hero image */}
          <figure className="mt-8">
            <img src={heroImg} alt="Nils Suter's private crypto mining chalet in Zug" width={1600} height={900} className="aspect-[16/9] w-full rounded-md object-cover" />
            <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-[12px] text-ink-soft">
              <span>Nils Suter's private estate in the canton of Zug, funded entirely through digital asset accumulation.</span>
              <span className="italic">Photo: The Herald Chronicle / Jean-Luc Bovet</span>
            </figcaption>
          </figure>

          {/* Body */}
          <div className="prose-article mt-10 space-y-6 font-serif text-[19px] leading-[1.8] text-ink">
            <p>
              Nestled high above the mist-covered waters of Lake Zug, the medieval gates of Schloss Oberwil swing open to reveal a paradox. Outside, the stone walls stand as they have since 1380. Inside, a glowing bank of screens displays real-time block validations across three continents. This is the headquarters of <strong>Nils Suter</strong>, a 38-year-old former Zurich system administrator who is widely considered Switzerland's most successful individual crypto accumulator.
            </p>
            <p>
              Suter’s story is legendary in Zug's "Crypto Valley," but he has rarely spoken to the press. Today, dressed in a simple merino wool sweater, he pours mineral water and explains how an impulse buy of CHF 500 in 2011 transformed him from an overworked IT engineer struggling to pay a CHF 900 rent into a sovereign billionaire.
            </p>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">"My colleagues thought I lost my mind"</h2>
            <p>
              In 2011, Suter was working at a traditional Swiss private bank in Zurich. "I was maintaining legacy servers, watching massive quantities of capital move across screens, none of which belonged to me," Suter recalls. "I worked 60 hours a week, and at the end of the month, after tax and Zurich rents, I had nothing left."
            </p>
            <p>
              When he read the Bitcoin whitepaper in a cryptography forum, something clicked. He spent CHF 500—exactly half of his savings at the time—to purchase Bitcoin at roughly CHF 3.50 per coin. "My colleagues at the bank laughed. They told me it was play money for internet geeks and that I'd lose everything. I told them that the traditional system depends on your dependency. Crypto depends on your capability."
            </p>

            {/* Pull quote */}
            <blockquote className="my-10 border-l-2 border-primary pl-6 font-serif text-2xl leading-snug text-ink">
              "Sovereignty isn't just about financial yield. It's about time. For the first time in human history, an individual can secure their labor and wealth in code that no state, bank, or corporation can dilute or confiscate."
              <footer className="mt-3 text-[13px] font-sans font-medium not-italic text-ink-soft">
                — Nils Suter, inside Schloss Oberwil, Zug
              </footer>
            </blockquote>

            <p>
              By the time Suter relocated to Zug in 2013, he had accumulated thousands of coins. He became one of the foundational architects of the canton's crypto tax guidelines, helping transform Zug from a sleepy Swiss town into the undisputed global "Crypto Valley" that hosts hundreds of major foundation headquarters today.
            </p>

            {/* Stat grid */}
            <div className="not-prose my-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-rule bg-rule md:grid-cols-4">
              {[
                { v: "CHF 3.50", l: "Initial Buy Price" },
                { v: "2011", l: "Discovery Year" },
                { v: "14th Cent.", l: " Zug Headquarters" },
                { v: "CHF 1.4B+", l: "Assets Under Management" },
              ].map((s) => (
                <div key={s.l} className="bg-background p-5">
                  <div className="font-serif text-2xl font-bold text-ink">{s.v}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-soft">{s.l}</div>
                </div>
              ))}
            </div>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">Surviving the winter: The sovereign mindset</h2>
            <p>
              His journey was far from easy. Suter held through five major market drawdowns, including the 2014 Mt. Gox hack where he lost a portion of his holdings, the 2018 crash, and the 2022 liquidations. "People see the castle, they see the Swiss assets, but they don't see the nights in 2018 where my portfolio crashed 85% and everyone said Bitcoin was dead. I never sold a single satoshi. Why? Because the fundamentals didn't change."
            </p>
            <p>
              Now, through his private venture vehicle **Helvetia Capital** and the **Helvetia Foundation**, Suter is shifting his focus from accumulation to empowerment. He is opening allocations to his private crypto-sovereign circle, allowing qualified individuals to query his advisory network and participate in early-stage Web3 deals.
            </p>

            <ul className="not-prose my-6 space-y-2.5 text-[17px] font-sans text-ink">
              {[
                "Helvetia Sovereign allocations: Now open for private applications",
                "Fully compliant Swiss custody frameworks with bank-grade security",
                "Direct mentorship programs for digital wealth builders",
                "Co-investments in Swiss hydro-powered validator farms",
              ].map((l) => (
                <li key={l} className="flex gap-3"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink" />{l}</li>
              ))}
            </ul>

            {/* Inline image */}
            <figure className="not-prose my-10">
              <img src={inlineImg} alt="Swiss Alpine datacenter" loading="lazy" width={1600} height={900} className="aspect-[16/9] w-full rounded-md object-cover" />
              <figcaption className="mt-3 text-[12px] text-ink-soft">Swiss alpine vault facilities housing the physical cryptographic keys for Helvetia Capital. <span className="italic">Photo: Bloomberg</span></figcaption>
            </figure>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">Why he is opening the gates</h2>
            <p>
              "I don't need more money," Suter says frankly. "What I need are allies. The next phase of the digital asset revolution is about building sovereign networks. By opening our private circle, we are connecting high-net-worth individuals, entrepreneurs, and institutions with the exact deal flow and security architecture that built my fortune."
            </p>

            {/* Data table */}
            <div className="not-prose my-8 overflow-hidden rounded-md border border-rule">
              <table className="w-full text-left text-[14px] font-sans">
                <thead className="bg-surface text-[11px] uppercase tracking-wider text-ink-soft">
                  <tr>
                    <th className="px-4 py-3">Sovereignty Matrix</th>
                    <th className="px-4 py-3 text-right">Standard Wealth</th>
                    <th className="px-4 py-3 text-right">Swiss Sovereign Tier</th>
                    <th className="px-4 py-3 text-right">Crypto Leverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {[
                    ["Asset Control", "Third-party dependency", "Direct Cold Custody", "Self-Custodial Nodes"],
                    ["Tax Efficiency", "Standard brackets", "Zug Canton Compliant", "Optimized Foundations"],
                    ["Deal Access", "Public markets", "Early VC Allocations", "Exclusive Pre-sales"],
                    ["Network Power", "Passive investor", "Nils Suter Advisory", "Co-Founder Rights"],
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
              To apply for Suter’s allocation list or submit a direct enquiry to Helvetia Capital's Zug office, readers are directed to submit an official Sovereign Enquiry. The application process requires verifying contact details and stating investment/interest parameters.
            </p>

            {/* Did you know */}
            <aside className="not-prose my-10 rounded-md border-l-2 border-primary bg-surface p-6">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-primary">Editor's Note</div>
              <p className="font-serif text-[17px] leading-relaxed text-ink">
                Due to extreme interest, allocations inside Helvetia Capital are reviewed on a rolling basis. All buttons and apply panels on this page will immediately route applicants to the secure Swiss Enquiry Registry in a new tab.
              </p>
            </aside>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">The final word: "Do not wait"</h2>
            <p>
              "The transfer of wealth from legacy trust systems to digital sovereign assets is only 1% complete," Suter finishes, looking out over the Alps. "You can watch it happen, or you can occupy the castle. The choice was yours in 2011, and it remains yours today."
            </p>

            {/* Key takeaways */}
            <div className="not-prose my-10 rounded-md border border-rule bg-background p-6">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-ink">Key takeaways from Suter's profile</div>
              <ol className="space-y-3 text-[15px] font-sans text-ink">
                {[
                  "Nils Suter turned CHF 500 of IT savings into a multi-million Swiss crypto portfolio.",
                  "Establishing Helvetia Capital in Zug to fund and scale sovereign digital assets.",
                  "Emphasizes cold self-custody and Swiss regulatory structures for asset protection.",
                  "Opening secure, direct allocations for high-conviction partners via enquiry form.",
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
              <div className="text-[11px] uppercase tracking-widest text-primary font-semibold">Exclusives</div>
              <div className="mt-1 font-serif text-lg font-semibold text-ink">Watch: Nils Suter walks through his alpine server room and cold key vault</div>
            </div>
          </div>

          {/* Poll */}
          <div className="mt-10 rounded-md border border-rule p-6">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">Reader Poll</div>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">How do you plan to navigate the shifting global financial landscape in 2026?</h3>
            <div className="mt-6 space-y-3">
              {[
                { l: "Increase exposure to self-custodial sovereign assets", v: 72, c: "bg-bull" },
                { l: "Stay with traditional index funds and commercial banks", v: 21, c: "bg-primary" },
                { l: "Seek shelter in physical real estate & precious metals", v: 7, c: "bg-bear" },
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
            <div className="mt-4 text-[11px] text-ink-soft">4,284 votes · Verified IP Addresses</div>
          </div>

          {/* Comments */}
          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-ink">Comments <span className="text-ink-soft">(142)</span></h3>
              <button className="text-[12px] font-semibold uppercase tracking-wider text-primary">Sort: Top</button>
            </div>
            <div className="space-y-6">
              {[
                { n: "David Renault", h: "Zug Resident", t: "I've seen Nils walking around Lake Zug. The guy is incredibly down to earth despite his success. His commitment to Web3 education here is real.", l: 242, r: 8, ago: "2h" },
                { n: "Aisha Khan", h: "Portfolio Manager", t: "The Swiss banking landscape is shifting fast. Suter's point about diligence over dilution is spot on. Applying for Helvetia's circle immediately.", l: 114, r: 4, ago: "3h" },
                { n: "Tomás Ribeiro", h: "Sovereign Subscriber", t: "Struggling sysadmin to Alpine castle owner is the ultimate dream. But the stress of holding through the 2018 winter would have killed most people.", l: 91, r: 12, ago: "4h" },
              ].map((c) => (
                <div key={c.n} className="flex gap-4 border-b border-rule pb-6">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface text-[12px] font-semibold text-ink">
                    {c.n.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[13px]">
                      <span className="font-semibold text-ink">{c.n}</span>
                      <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                      <span className="text-ink-soft">· {c.h} · {c.ago} ago</span>
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink">{c.t}</p>
                    <div className="mt-3 flex items-center gap-5 text-[12px] text-ink-soft">
                      <button className="flex items-center gap-1.5 hover:text-ink"><ThumbsUp className="h-3.5 w-3.5" /> {c.l}</button>
                      <button className="flex items-center gap-1.5 hover:text-ink"><MessageSquare className="h-3.5 w-3.5" /> {c.r} replies</button>
                      <button className="hover:text-ink">Share</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full rounded-sm border border-rule py-3 text-[12px] font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-surface">
              Load more comments
            </button>
          </section>

          {/* Sources */}
          <section className="mt-12 border-t border-rule pt-8">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">Verified Archives</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Swissinfo.ch", "Zug Commercial Registry", "Helvetia Foundation Ledger", "FINMA Digital Assets", "Bitcoin Suisse Archive"].map((s) => (
                <a key={s} href="#" className="flex items-center gap-1.5 rounded-sm border border-rule px-3 py-1.5 text-[12px] text-ink-soft transition-colors hover:border-ink hover:text-ink">
                  {s} <ArrowUpRight className="h-3 w-3" />
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
                <div className="text-[12px] uppercase tracking-wider text-ink-soft">Crypto Correspondent</div>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                  Elena covers digital asset markets, Swiss regulatory shifts, and blockchain venture capital for The Herald Chronicle. Previously a reporter at the Financial Times, she has covered the rise of Zug's Crypto Valley since 2015.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button className="rounded-sm bg-ink px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-background hover:opacity-90">Follow Correspondent</button>
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
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-ink font-sans">Market Prices</h3>
              <span className="flex items-center gap-1 text-[10px] text-ink-soft font-sans"><span className="h-1.5 w-1.5 rounded-full bg-bull" /> Live Feed</span>
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
            <h4 className="mt-2 font-serif text-lg font-bold text-ink leading-snug">Apply for Nils Suter's Inner Circle Allocation</h4>
            <p className="mt-2 text-[12px] text-ink-soft leading-relaxed">
              Submit your enquiry to join the private round. Verified applicants receive investment decks, yield logs, and direct advisory access.
            </p>
            <button className="mt-4 w-full rounded-sm bg-ink text-background py-2 text-[12px] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer">
              Submit Sovereign Enquiry
            </button>
          </section>

          {/* Fear & Greed */}
          <section className="rounded-md border border-rule p-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft font-sans">Sovereignty Sentiment Index</h3>
            <div className="mt-4 flex items-end gap-4">
              <div className="font-serif text-5xl font-bold text-ink">84</div>
              <div className="pb-2 text-[12px] font-semibold text-bull font-sans">Extreme Pride</div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
              <div className="h-full bg-gradient-to-r from-bear via-amber-500 to-bull" style={{ width: "84%" }} />
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-ink-soft font-sans">
              <span>Financial Standard</span><span>Financial Sovereignty</span>
            </div>
          </section>

          {/* Trending */}
          <section>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-ink font-sans">Trending Profiles</h3>
            <ol className="space-y-4">
              {TRENDING.map((t, i) => (
                <li key={i} className="flex gap-3 border-b border-rule pb-4 last:border-0">
                  <span className="font-serif text-2xl font-bold text-ink-soft/40">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 font-sans">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">{t.tag}</div>
                    <a href="#" className="mt-1 block text-[13px] font-medium leading-snug text-ink hover:underline">{t.title}</a>
                    <div className="mt-1 text-[11px] text-ink-soft">{t.time} ago</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Newsletter Box */}
          <section className="rounded-md bg-ink p-6 text-background">
            <h3 className="font-serif text-xl font-bold leading-tight">The Daily Brief</h3>
            <p className="mt-2 text-[13px] text-background/70 font-sans">A 5-minute summary of global news, finance, and exclusive features in your inbox, weekdays at 7am.</p>
            <div className="mt-4 space-y-2">
              <input
                type="email"
                placeholder="your@email.ch"
                className="w-full rounded-sm border border-background/20 bg-background/10 px-3 py-2.5 text-[13px] text-background placeholder:text-background/40 focus:border-background focus:outline-none"
              />
              <button className="w-full rounded-sm bg-background py-2.5 text-[12px] font-semibold uppercase tracking-wider text-ink hover:opacity-90 cursor-pointer">
                Join Free Newsletter
              </button>
            </div>
          </section>
        </aside>
      </main>

      {/* Related */}
      <section className="mx-auto mt-20 max-w-[1320px] border-t border-rule px-6 pt-12">
        <div className="flex items-end justify-between font-sans">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink">Related World Stories</h2>
          <a href="#" className="text-[12px] font-semibold uppercase tracking-wider text-primary hover:underline">View all</a>
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
          <h2 className="font-serif text-2xl font-bold text-ink">Canton updates</h2>
          <div className="flex items-center gap-1 text-[11px] text-ink-soft"><span className="h-1.5 w-1.5 rounded-full bg-bear" /> Feed active</div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {TRENDING.slice(0, 5).map((t, i) => (
            <a key={i} href="#" className="w-72 shrink-0 rounded-md border border-rule p-4 transition-colors hover:bg-surface">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-primary font-sans">{t.tag}</div>
              <h4 className="mt-2 font-serif text-[15px] font-semibold leading-snug text-ink">{t.title}</h4>
              <div className="mt-3 text-[11px] text-ink-soft font-sans">{t.time} ago</div>
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
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Daily</span>
              </div>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ink-soft">
                Reporting on global policy, business trends, technological breakthroughs, and sovereign investment profiles.
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
              { h: "News Desk", l: [{ t: "World News", h: "#" }, { t: "Politics & Policy", h: "#" }, { t: "Business", h: "#" }, { t: "Markets Feed", h: "#" }, { t: "Science", h: "#" }, { t: "Arts & Culture", h: "#" }] },
              { h: "Business", l: [{ t: "Markets Overview", h: "#" }, { t: "Personal Finance", h: "#" }, { t: "Real Estate", h: "#" }, { t: "Enterprise Staking", h: "#" }, { t: "Economy Logs", h: "#" }] },
              { h: "Opinion", l: [{ t: "Editorials", h: "#" }, { t: "Op-Eds", h: "#" }, { t: "Letters to Editor", h: "#" }, { t: "Columns", h: "#" }, { t: "Profiles", h: "#" }] },
              { h: "Legal", l: [{ t: "Privacy Policy", h: "/privacy" }, { t: "Terms & Conditions", h: "/terms" }, { t: "Sovereign Disclaimer", h: "#" }, { t: "Contact Geneva Office", h: "#" }] },
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
            <div>© 2026 Le Grand Journal Media. Geneva CHE-428.189. All rights reserved.</div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <button className="flex items-center gap-1.5 hover:text-ink"><Globe className="h-3.5 w-3.5" /> English (CH)</button>
              <a href="#" className="hover:text-ink">Disclosures</a>
              <button className="hover:text-ink font-semibold">Back to top ↑</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
