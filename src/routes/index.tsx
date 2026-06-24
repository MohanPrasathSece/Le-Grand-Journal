import { createFileRoute } from "@tanstack/react-router";
import {
  Search, Bell, Bookmark, Moon, User, ChevronRight, BadgeCheck, Clock,
  Twitter, Linkedin, Facebook, Send, Link2, Share2, TrendingUp, TrendingDown,
  Play, ThumbsUp, MessageSquare, ArrowUpRight, Globe, Rss,
} from "lucide-react";
import heroImg from "@/assets/hero-bitcoin.jpg";
import inlineImg from "@/assets/inline-trader.jpg";
import authorImg from "@/assets/author.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bitcoin Climbs Above Major Resistance — CipherWire" },
      { name: "description", content: "Bitcoin breaks key resistance as institutional ETF inflows accelerate. In-depth analysis of crypto markets, regulation, and macro factors." },
      { property: "og:title", content: "Bitcoin Climbs Above Major Resistance — CipherWire" },
      { property: "og:description", content: "Institutional demand pushes crypto markets higher. Full analysis, expert commentary, and live market data." },
    ],
  }),
  component: Index,
});

const NAV = [
  "Markets", "Bitcoin", "Ethereum", "Altcoins", "DeFi", "NFTs",
  "Web3", "Mining", "Regulation", "Technology", "Analysis", "Opinion", "Podcasts", "Events",
];

const MARQUEE = [
  { s: "BTC", p: "$71,842.30", c: "+2.41%", u: true },
  { s: "ETH", p: "$3,824.10", c: "+1.87%", u: true },
  { s: "SOL", p: "$184.22", c: "+4.18%", u: true },
  { s: "BNB", p: "$612.55", c: "-0.42%", u: false },
  { s: "XRP", p: "$0.5821", c: "-1.12%", u: false },
  { s: "ADA", p: "$0.487", c: "+0.93%", u: true },
  { s: "DOGE", p: "$0.162", c: "+3.04%", u: true },
  { s: "TON", p: "$7.24", c: "+5.71%", u: true },
  { s: "AVAX", p: "$38.10", c: "+1.22%", u: true },
  { s: "LINK", p: "$18.06", c: "+2.66%", u: true },
  { s: "DOT", p: "$8.42", c: "-0.31%", u: false },
  { s: "MATIC", p: "$0.78", c: "+1.04%", u: true },
  { s: "LTC", p: "$92.51", c: "+0.55%", u: true },
  { s: "ATOM", p: "$10.21", c: "-0.78%", u: false },
  { s: "GOLD", p: "$2,738", c: "+0.62%", u: true },
  { s: "DXY", p: "104.18", c: "-0.14%", u: false },
  { s: "SPX", p: "5,861.4", c: "+0.31%", u: true },
];

const PRICES = [
  { sym: "BTC", name: "Bitcoin", price: "$71,842.30", chg: 2.41, up: true },
  { sym: "ETH", name: "Ethereum", price: "$3,824.10", chg: 1.87, up: true },
  { sym: "BNB", name: "BNB", price: "$612.55", chg: -0.42, up: false },
  { sym: "SOL", name: "Solana", price: "$184.22", chg: 4.18, up: true },
  { sym: "XRP", name: "XRP", price: "$0.5821", chg: -1.12, up: false },
];

const TRENDING = [
  { tag: "ETF", title: "Spot Bitcoin ETFs log $1.2B weekly net inflow, breaking 2024 record", time: "12m" },
  { tag: "Ethereum", title: "Ether supply turns deflationary again as L2 fees compress", time: "38m" },
  { tag: "Regulation", title: "SEC chair signals new framework for digital asset custody", time: "1h" },
  { tag: "DeFi", title: "Aave deploys on Base, pushing TVL above $14B network-wide", time: "2h" },
  { tag: "Mining", title: "Hashrate hits new ATH ahead of difficulty adjustment", time: "3h" },
  { tag: "Stablecoins", title: "USDC market cap rebounds past $34B amid bank settlements", time: "4h" },
  { tag: "Macro", title: "Treasury yields ease as crypto correlates with risk assets", time: "5h" },
  { tag: "Web3", title: "Coinbase Smart Wallet adoption crosses one million users", time: "6h" },
  { tag: "Solana", title: "Solana stablecoin volume eclipses Tron for first time", time: "7h" },
  { tag: "Bitcoin", title: "MicroStrategy adds 4,200 BTC in latest treasury purchase", time: "9h" },
];

const RELATED = [
  { cat: "Markets", title: "Why traders are watching the $73K liquidation wall this week", time: "2h ago", author: "M. Alvarez" },
  { cat: "Analysis", title: "Funding rates suggest crowded longs, but spot bid stays firm", time: "3h ago", author: "K. Yamada" },
  { cat: "Regulation", title: "Europe's MiCA enforcement enters phase two — what changes", time: "4h ago", author: "L. Conti" },
  { cat: "Ethereum", title: "Restaking risk: how EigenLayer reshaped validator economics", time: "5h ago", author: "J. Patel" },
  { cat: "Bitcoin", title: "Miner sell pressure cools as block subsidy halving normalizes", time: "6h ago", author: "S. Becker" },
  { cat: "Web3", title: "Onchain identity standards converge around ERC-6492", time: "7h ago", author: "R. Müller" },
  { cat: "Opinion", title: "The institutional decade for crypto has quietly begun", time: "9h ago", author: "E. Hart" },
  { cat: "Technology", title: "Modular rollups and the slow death of monolithic chains", time: "11h ago", author: "T. Okonkwo" },
];

const TICKER = [
  "BTC +2.41%", "ETH +1.87%", "SOL +4.18%", "BNB -0.42%", "XRP -1.12%",
  "ADA +0.93%", "DOGE +3.04%", "TON +5.71%", "AVAX +1.22%", "LINK +2.66%",
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

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breaking bar */}
      <div className="border-b border-rule bg-ink text-background">
        <div className="mx-auto flex max-w-[1320px] items-center gap-4 px-6 py-2 text-[12px]">
          <span className="shrink-0 rounded-sm bg-bear px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">Breaking</span>
          <div className="relative flex-1 overflow-hidden">
            <div className="ticker-track flex gap-10 whitespace-nowrap">
              {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i} className="text-background/80">• {t}</span>
              ))}
            </div>
          </div>
          <span className="hidden shrink-0 text-background/60 md:inline">Bitcoin crosses new resistance as ETF inflows accelerate</span>
        </div>
      </div>

      {/* Utility bar */}
      <div className="hidden border-b border-rule bg-surface md:block">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-1.5 text-[11px] text-ink-soft">
          <div className="flex items-center gap-4">
            <span className="font-medium text-ink">Friday, Nov 14, 2025</span>
            <span className="hidden lg:inline">New York · 09:42 EST</span>
            <span className="hidden items-center gap-1.5 lg:flex"><span className="h-1.5 w-1.5 rounded-full bg-bull" /> Markets Open</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-ink">Newsletters</a>
            <a href="#" className="hover:text-ink">Podcasts</a>
            <a href="#" className="hover:text-ink">Events</a>
            <a href="#" className="hover:text-ink">Research</a>
            <span className="h-3 w-px bg-rule" />
            <a href="#" className="hover:text-ink">Sign in</a>
            <a href="#" className="font-semibold text-ink hover:underline">Try Pro</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-rule bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center gap-6 px-6 py-3">
          <a href="/" className="flex items-baseline gap-1.5">
            <span className="font-serif text-2xl font-bold tracking-tight text-ink">CipherWire</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Pro</span>
          </a>
          <div className="ml-auto flex items-center gap-1">
            {[Search, Bell, Bookmark, Moon].map((Icon, i) => (
              <button key={i} className="rounded-md p-2 text-ink-soft transition-colors hover:bg-surface hover:text-ink">
                <Icon className="h-4 w-4" />
              </button>
            ))}
            <button className="ml-2 rounded-sm bg-ink px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-background transition-opacity hover:opacity-90">
              Subscribe
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
                className={`shrink-0 text-[12px] font-medium uppercase tracking-wider transition-colors hover:text-ink ${i === 1 ? "text-ink" : "text-ink-soft"}`}
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
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-ink-soft">Live</span>
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
          <a href="#" className="hover:text-ink">Crypto</a>
          <ChevronRight className="h-3 w-3" />
          <a href="#" className="hover:text-ink">Bitcoin</a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink">Institutional Demand</span>
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
            <span>Bitcoin</span>
            <span className="h-3 w-px bg-rule" />
            <span className="text-ink-soft">Markets · Analysis</span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-ink md:text-[52px]">
            Bitcoin Climbs Above Major Resistance as Institutional Demand Pushes Crypto Markets Higher
          </h1>

          <p className="mt-6 font-serif text-xl leading-relaxed text-ink-soft">
            Spot bitcoin ETFs absorbed more than $1.2&nbsp;billion of net inflows last week, propelling the
            largest cryptocurrency through a price ceiling that had capped advances since spring and reigniting
            a broad rally across digital assets.
          </p>

          {/* Author card */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-rule py-4">
            <img src={authorImg} alt="Elena Hart" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                Elena Hart
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="text-[11px] text-ink-soft">Crypto Correspondent · CipherWire</div>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-4 text-[11px] text-ink-soft">
              <span>Published <span className="text-ink">Nov 14, 2025</span></span>
              <span>Updated <span className="text-ink">2h ago</span></span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 9 min read</span>
              <span className="flex items-center gap-1 rounded-full border border-rule px-2 py-0.5">
                <BadgeCheck className="h-3 w-3 text-bull" /> Fact checked
              </span>
            </div>
          </div>

          {/* Hero image */}
          <figure className="mt-8">
            <img src={heroImg} alt="Bitcoin coins in front of trading screen" width={1600} height={900} className="aspect-[16/9] w-full rounded-md object-cover" />
            <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-[12px] text-ink-soft">
              <span>Bitcoin extended its rally past a multi-month resistance level as ETF flows accelerated.</span>
              <span className="italic">Photo: CipherWire / Reuters</span>
            </figcaption>
          </figure>

          {/* Body */}
          <div className="prose-article mt-10 space-y-6 font-serif text-[19px] leading-[1.8] text-ink">
            <p>
              Bitcoin pushed decisively above a price level that had acted as a ceiling for much of the year,
              extending a rally that has been driven less by the speculative retail manias of past cycles and
              more by sustained, programmatic buying from regulated financial vehicles. The world's largest
              cryptocurrency traded as high as $72,400 in New York on Thursday before settling near $71,800,
              its highest weekly close on record.
            </p>
            <p>
              Analysts and fund managers interviewed by <em>CipherWire</em> said the move reflects a structural
              shift in demand. Spot bitcoin exchange-traded funds, approved by U.S. regulators earlier this year,
              have accumulated more than $34&nbsp;billion in net inflows, with BlackRock's IBIT alone now holding
              over 380,000 coins — roughly 1.8% of all bitcoin that will ever exist.
            </p>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">A market reshaped by institutional flows</h2>
            <p>
              The composition of today's buyer base bears little resemblance to the one that drove the 2021 cycle.
              Pension consultants, registered investment advisors and family offices — actors that historically
              avoided digital assets — now dominate the marginal bid. Coinbase's prime brokerage reported that
              institutional clients accounted for more than 80% of platform volume in the third quarter.
            </p>

            {/* Pull quote */}
            <blockquote className="my-10 border-l-2 border-primary pl-6 font-serif text-2xl leading-snug text-ink">
              "What we are watching is not a speculative blow-off. It is the slow, deliberate repricing of
              bitcoin as a treasury reserve asset by institutions that, until recently, were not allowed to own it."
              <footer className="mt-3 text-[13px] font-sans font-medium not-italic text-ink-soft">
                — Marcus Chen, Head of Digital Assets, Northbridge Capital
              </footer>
            </blockquote>

            <p>
              Trading desks at major banks have begun staffing dedicated crypto coverage teams. Goldman Sachs and
              Morgan Stanley both expanded prime services for digital assets in the past quarter, while Fidelity
              moved bitcoin custody from a research product into a core institutional offering.
            </p>

            {/* Stat grid */}
            <div className="not-prose my-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-rule bg-rule md:grid-cols-4">
              {[
                { v: "$71,842", l: "BTC Spot" },
                { v: "+2.41%", l: "24h Change" },
                { v: "$1.2B", l: "ETF Net Inflow (wk)" },
                { v: "76 / 100", l: "Fear & Greed" },
              ].map((s) => (
                <div key={s.l} className="bg-background p-5">
                  <div className="font-serif text-2xl font-bold text-ink">{s.v}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-ink-soft">{s.l}</div>
                </div>
              ))}
            </div>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">ETF inflows and the new buyer base</h2>
            <p>
              The eleven spot bitcoin ETFs now trading in the United States have collectively become one of the
              most successful product launches in the history of the exchange-traded fund industry. Net assets
              under management crossed $90&nbsp;billion in October, ahead of the timeline most analysts projected
              at launch.
            </p>
            <ul className="not-prose my-6 space-y-2.5 text-[17px] font-sans text-ink">
              {[
                "BlackRock IBIT: 384,200 BTC under management",
                "Fidelity FBTC: 191,500 BTC under management",
                "ARK 21Shares ARKB: 52,800 BTC under management",
                "Bitwise BITB: 41,600 BTC under management",
                "Other issuers (combined): 168,900 BTC",
              ].map((l) => (
                <li key={l} className="flex gap-3"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink" />{l}</li>
              ))}
            </ul>

            <p>
              "The reason the price action looks different this cycle is because the buyer is different," said
              Priya Anand, a portfolio strategist at Wellesley Asset Research. "ETF inflows compound. They don't
              chase candles."
            </p>

            {/* Inline image */}
            <figure className="not-prose my-10">
              <img src={inlineImg} alt="Trading floor" loading="lazy" width={1600} height={900} className="aspect-[16/9] w-full rounded-md object-cover" />
              <figcaption className="mt-3 text-[12px] text-ink-soft">Trading desks have expanded crypto coverage as institutional volume climbs. <span className="italic">Photo: Bloomberg</span></figcaption>
            </figure>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">Macro tailwinds and regulatory clarity</h2>
            <p>
              The rally is unfolding against a macroeconomic backdrop that is, on balance, supportive. The
              Federal Reserve's pivot away from its tightening cycle has weakened the dollar and revived
              appetite for risk assets. Real yields have eased, gold has rallied to fresh highs, and equity
              indexes have climbed in tandem with bitcoin — a correlation that historically softens when
              monetary conditions loosen.
            </p>

            {/* Data table */}
            <div className="not-prose my-8 overflow-hidden rounded-md border border-rule">
              <table className="w-full text-left text-[14px] font-sans">
                <thead className="bg-surface text-[11px] uppercase tracking-wider text-ink-soft">
                  <tr>
                    <th className="px-4 py-3">Asset</th>
                    <th className="px-4 py-3 text-right">YTD</th>
                    <th className="px-4 py-3 text-right">30D Vol.</th>
                    <th className="px-4 py-3 text-right">Corr. SPX</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {[
                    ["Bitcoin", "+58.4%", "42%", "0.41"],
                    ["Ethereum", "+34.2%", "55%", "0.48"],
                    ["Gold", "+27.1%", "14%", "0.12"],
                    ["S&P 500", "+19.6%", "12%", "1.00"],
                  ].map((row) => (
                    <tr key={row[0]} className="bg-background">
                      <td className="px-4 py-3 font-medium text-ink">{row[0]}</td>
                      <td className="px-4 py-3 text-right font-mono text-bull">{row[1]}</td>
                      <td className="px-4 py-3 text-right font-mono text-ink">{row[2]}</td>
                      <td className="px-4 py-3 text-right font-mono text-ink-soft">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              Regulatory developments have also worked in the asset class's favor. The Securities and Exchange
              Commission's reversal on spot ETFs, the passage of Europe's Markets in Crypto-Assets framework,
              and the establishment of stablecoin oversight regimes in Singapore, Hong Kong and the United
              Kingdom have collectively lowered the perceived regulatory tail risk that long deterred allocators.
            </p>

            {/* Did you know */}
            <aside className="not-prose my-10 rounded-md border-l-2 border-primary bg-surface p-6">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-primary">Did you know?</div>
              <p className="font-serif text-[17px] leading-relaxed text-ink">
                Roughly 19.7&nbsp;million of bitcoin's 21&nbsp;million-coin maximum supply has already been
                mined. After the April 2024 halving, the daily issuance rate dropped to about 450 BTC — less
                than half of the average daily inflow into U.S. spot ETFs in the past quarter.
              </p>
            </aside>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">Technical picture: breakout or blow-off?</h2>
            <p>
              Chartists were watching the $69,000–$70,000 zone closely. The region had capped four separate
              advances since March and represented the prior all-time-high range. A weekly close above it,
              technicians argue, opens the door to price discovery with limited overhead supply.
            </p>
            <p>
              Derivatives positioning, however, urges caution. Funding rates on perpetual swaps have ticked
              into elevated territory, and open interest at major venues is approaching cycle highs. Such
              conditions have historically preceded sharp, short-lived corrections — a feature, not a bug,
              of leveraged crypto markets.
            </p>

            <h2 className="!font-serif !text-3xl !font-bold !leading-tight !text-ink">Outlook</h2>
            <p>
              Most strategists interviewed declined to forecast a precise year-end target but emphasized the
              difference between a flow-driven repricing and a sentiment-driven bubble. "If ETF inflows
              continue at even half the current pace, the supply-demand math gets uncomfortable for sellers,"
              said Chen. "That doesn't preclude 20% drawdowns — those are inherent to the asset — but it does
              change the trajectory of the dips."
            </p>
            <p>
              For now, the market's tone is one of measured conviction. The era of crypto as a fringe trade
              is, by most measures, over. What replaces it — a maturing macro asset, a generational tech
              cycle, or both — is the question the next twelve months will answer.
            </p>

            {/* Key takeaways */}
            <div className="not-prose my-10 rounded-md border border-rule bg-background p-6">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-ink">Key takeaways</div>
              <ol className="space-y-3 text-[15px] font-sans text-ink">
                {[
                  "Bitcoin closed above a multi-month resistance band on record ETF demand.",
                  "Spot ETFs have absorbed $34B in net inflows year-to-date, reshaping the buyer base.",
                  "Macroeconomic conditions — softer dollar, easing yields — support risk assets broadly.",
                  "Derivatives positioning suggests near-term volatility despite the constructive structure.",
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
              <img src={inlineImg} alt="" className="h-full w-full object-cover opacity-50" />
              <button className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-background/95 text-ink shadow-xl transition-transform hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </span>
              </button>
              <div className="absolute bottom-3 right-3 rounded-sm bg-ink/80 px-2 py-0.5 text-[11px] font-mono text-background">12:48</div>
            </div>
            <div className="p-4">
              <div className="text-[11px] uppercase tracking-widest text-primary">Market Analysis</div>
              <div className="mt-1 font-serif text-lg font-semibold text-ink">Watch: Why this rally looks different from 2021</div>
            </div>
          </div>

          {/* Poll */}
          <div className="mt-10 rounded-md border border-rule p-6">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">Reader Poll</div>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">What's your six-month outlook for bitcoin?</h3>
            <div className="mt-6 space-y-3">
              {[
                { l: "Bullish", v: 64, c: "bg-bull" },
                { l: "Neutral", v: 22, c: "bg-ink-soft" },
                { l: "Bearish", v: 14, c: "bg-bear" },
              ].map((p) => (
                <div key={p.l}>
                  <div className="mb-1 flex justify-between text-[13px]">
                    <span className="font-medium text-ink">{p.l}</span>
                    <span className="font-mono text-ink-soft">{p.v}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface">
                    <div className={`h-full ${p.c}`} style={{ width: `${p.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-[11px] text-ink-soft">12,438 votes · Live</div>
          </div>

          {/* Comments */}
          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-ink">Comments <span className="text-ink-soft">(284)</span></h3>
              <button className="text-[12px] font-semibold uppercase tracking-wider text-primary">Sort: Top</button>
            </div>
            <div className="space-y-6">
              {[
                { n: "David Renault", h: "Verified", t: "Excellent breakdown of the ETF flow dynamics. The buyer composition shift is the story that doesn't get enough airtime.", l: 124, r: 12, ago: "2h" },
                { n: "Aisha Khan", h: "Portfolio Manager", t: "Funding rate caveat is well placed. We've trimmed leverage above $70K — not the trend, just the entry.", l: 86, r: 8, ago: "3h" },
                { n: "Tomás Ribeiro", h: "Subscriber", t: "Would love a follow-up on Ethereum's deflationary mechanics post-Dencun. Different asset, same institutionalization arc.", l: 54, r: 5, ago: "4h" },
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
            <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">Sources & References</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["CoinMarketCap", "CoinGlass", "Glassnode", "TradingView", "SEC.gov", "Bloomberg", "Reuters", "CoinDesk"].map((s) => (
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
                  Elena covers digital asset markets, institutional adoption, and crypto regulation for CipherWire.
                  Previously a markets reporter at the Financial Times, she has interviewed central bankers, exchange
                  founders, and protocol developers across three continents.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button className="rounded-sm bg-ink px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-background hover:opacity-90">Follow</button>
                  <a href="#" className="text-ink-soft hover:text-ink"><Twitter className="h-4 w-4" /></a>
                  <a href="#" className="text-ink-soft hover:text-ink"><Linkedin className="h-4 w-4" /></a>
                  <a href="#" className="text-[12px] text-ink-soft hover:text-ink">elena.hart@cipherwire.com</a>
                </div>
              </div>
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-20 lg:self-start">
          {/* Market prices */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-ink">Market Prices</h3>
              <span className="flex items-center gap-1 text-[10px] text-ink-soft"><span className="h-1.5 w-1.5 rounded-full bg-bull" /> Live</span>
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

          {/* Fear & Greed */}
          <section className="rounded-md border border-rule p-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">Fear & Greed Index</h3>
            <div className="mt-4 flex items-end gap-4">
              <div className="font-serif text-5xl font-bold text-ink">76</div>
              <div className="pb-2 text-[12px] font-semibold text-bull">Greed</div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
              <div className="h-full bg-gradient-to-r from-bear via-amber-500 to-bull" style={{ width: "76%" }} />
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-ink-soft">
              <span>Extreme Fear</span><span>Extreme Greed</span>
            </div>
          </section>

          {/* Trending */}
          <section>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-ink">Trending Now</h3>
            <ol className="space-y-4">
              {TRENDING.map((t, i) => (
                <li key={i} className="flex gap-3 border-b border-rule pb-4 last:border-0">
                  <span className="font-serif text-2xl font-bold text-ink-soft/40">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">{t.tag}</div>
                    <a href="#" className="mt-1 block text-[13px] font-medium leading-snug text-ink hover:underline">{t.title}</a>
                    <div className="mt-1 text-[11px] text-ink-soft">{t.time} ago</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Newsletter */}
          <section className="rounded-md bg-ink p-6 text-background">
            <h3 className="font-serif text-xl font-bold leading-tight">The Morning Block</h3>
            <p className="mt-2 text-[13px] text-background/70">A 5-minute crypto markets brief in your inbox, weekdays at 7am ET.</p>
            <div className="mt-4 space-y-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-sm border border-background/20 bg-background/10 px-3 py-2.5 text-[13px] text-background placeholder:text-background/40 focus:border-background focus:outline-none"
              />
              <button className="w-full rounded-sm bg-background py-2.5 text-[12px] font-semibold uppercase tracking-wider text-ink hover:opacity-90">
                Subscribe — Free
              </button>
            </div>
            <div className="mt-3 text-[10px] text-background/50">No spam. Unsubscribe anytime.</div>
          </section>

          {/* Ad */}
          <div className="grid h-64 place-items-center rounded-md border border-dashed border-rule text-[11px] uppercase tracking-widest text-ink-soft">
            Advertisement
          </div>

          {/* Tags */}
          <section>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-ink">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {["Bitcoin", "Ethereum", "AI", "Web3", "ETF", "Mining", "Stablecoins", "Altcoins", "DeFi"].map((t) => (
                <a key={t} href="#" className="rounded-sm border border-rule px-3 py-1 text-[12px] text-ink-soft hover:border-ink hover:text-ink">#{t}</a>
              ))}
            </div>
          </section>
        </aside>
      </main>

      {/* Related */}
      <section className="mx-auto mt-20 max-w-[1320px] border-t border-rule px-6 pt-12">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink">Related Stories</h2>
          <a href="#" className="text-[12px] font-semibold uppercase tracking-wider text-primary hover:underline">View all</a>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED.map((r, i) => (
            <a key={i} href="#" className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-md bg-surface">
                <div className="h-full w-full bg-gradient-to-br from-ink/10 via-primary/10 to-bull/10 transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-primary">{r.cat}</div>
              <h3 className="mt-1.5 font-serif text-lg font-semibold leading-snug text-ink group-hover:underline">{r.title}</h3>
              <div className="mt-2 text-[11px] text-ink-soft">{r.author} · {r.time}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Latest horizontal */}
      <section className="mx-auto mt-20 max-w-[1320px] px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-ink">Latest News</h2>
          <div className="flex items-center gap-1 text-[11px] text-ink-soft"><span className="h-1.5 w-1.5 rounded-full bg-bear" /> Updated continuously</div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {TRENDING.slice(0, 8).map((t, i) => (
            <a key={i} href="#" className="w-72 shrink-0 rounded-md border border-rule p-4 transition-colors hover:bg-surface">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">{t.tag}</div>
              <h4 className="mt-2 font-serif text-[15px] font-semibold leading-snug text-ink">{t.title}</h4>
              <div className="mt-3 text-[11px] text-ink-soft">{t.time} ago</div>
            </a>
          ))}
        </div>
      </section>

      {/* Market snapshot */}
      <section className="mx-auto mt-20 max-w-[1320px] px-6">
        <h2 className="mb-6 font-serif text-2xl font-bold text-ink">Market Snapshot</h2>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-rule bg-rule md:grid-cols-3 lg:grid-cols-6">
          {[
            { s: "BTC", p: "$71,842", c: "+2.41%", u: true },
            { s: "ETH", p: "$3,824", c: "+1.87%", u: true },
            { s: "SOL", p: "$184.22", c: "+4.18%", u: true },
            { s: "XRP", p: "$0.582", c: "-1.12%", u: false },
            { s: "ADA", p: "$0.487", c: "+0.93%", u: true },
            { s: "DOGE", p: "$0.162", c: "+3.04%", u: true },
          ].map((m) => (
            <div key={m.s} className="bg-background p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">{m.s}</div>
              <div className="mt-2 font-serif text-xl font-bold text-ink">{m.p}</div>
              <div className={`mt-1 font-mono text-[12px] ${m.u ? "text-bull" : "text-bear"}`}>{m.c}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-6 text-[12px] text-ink-soft">
          <span>Total Market Cap: <span className="font-mono text-ink">$2.71T</span></span>
          <span>24h Volume: <span className="font-mono text-ink">$128.4B</span></span>
          <span>BTC Dominance: <span className="font-mono text-ink">54.2%</span></span>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mx-auto mt-24 max-w-[1320px] px-6">
        <div className="rounded-md border border-rule bg-surface px-8 py-14 text-center md:px-16 md:py-20">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-primary">Newsletter</div>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-bold leading-tight text-ink md:text-4xl">
            The signal in the noise of crypto markets, delivered every morning.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-ink-soft">
            Join 240,000+ traders, analysts, and allocators who start their day with CipherWire's flagship brief.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <input type="email" placeholder="Enter your email" className="flex-1 rounded-sm border border-rule bg-background px-4 py-3 text-[14px] text-ink focus:border-ink focus:outline-none" />
            <button className="rounded-sm bg-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-wider text-background hover:opacity-90">Subscribe</button>
          </form>
          <div className="mt-3 text-[11px] text-ink-soft">By subscribing you agree to our Privacy Policy.</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 border-t border-rule bg-background">
        <div className="mx-auto max-w-[1320px] px-6 py-14">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
            <div className="col-span-2">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-ink">CipherWire</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Pro</span>
              </div>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ink-soft">
                Editorial-grade reporting on digital asset markets, infrastructure, and policy — for the people who move them.
              </p>
              <div className="mt-5 flex gap-2">
                {[Twitter, Linkedin, Facebook, Send, Rss].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-rule text-ink-soft hover:border-ink hover:text-ink">
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-ink">Get the app</div>
                <div className="mt-3 flex gap-2">
                  <a href="#" className="rounded-sm border border-rule px-3 py-2 text-[11px] text-ink-soft hover:border-ink hover:text-ink">App Store</a>
                  <a href="#" className="rounded-sm border border-rule px-3 py-2 text-[11px] text-ink-soft hover:border-ink hover:text-ink">Google Play</a>
                </div>
              </div>
            </div>
            {[
              { h: "Company", l: ["About", "Editorial Policy", "Corrections", "Careers", "Press", "Diversity", "Ethics"] },
              { h: "Categories", l: ["Bitcoin", "Ethereum", "Markets", "Regulation", "Web3", "NFT", "DeFi", "Mining", "Stablecoins"] },
              { h: "Products", l: ["Pro Terminal", "Research", "API & Data", "Newsletters", "Podcasts", "Events", "Indices"] },
              { h: "Legal", l: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Advertising", "Disclosures", "Accessibility", "Contact"] },
            ].map((col) => (
              <div key={col.h}>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-ink">{col.h}</div>
                <ul className="mt-4 space-y-2.5 text-[13px] text-ink-soft">
                  {col.l.map((l) => <li key={l}><a href="#" className="hover:text-ink">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-rule pt-8 text-[12px] text-ink-soft md:grid-cols-4">
            {[
              { h: "Trusted Sources", l: "Reuters · Bloomberg · AP" },
              { h: "Member of", l: "Digital Content Next" },
              { h: "Awards", l: "SABEW 2024 · Webby Honoree" },
              { h: "Verified", l: "Trust Project · IFCN signatory" },
            ].map((b) => (
              <div key={b.h}>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-ink">{b.h}</div>
                <div className="mt-1.5">{b.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-rule pt-6 text-[12px] text-ink-soft md:flex-row md:items-center">
            <div>© 2025 CipherWire Media, Inc. All rights reserved. Prices delayed up to 60 seconds.</div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <button className="flex items-center gap-1.5 hover:text-ink"><Globe className="h-3.5 w-3.5" /> English (US)</button>
              <a href="#" className="hover:text-ink">Do Not Sell My Info</a>
              <a href="#" className="hover:text-ink">Cookie Settings</a>
              <a href="#" className="hover:text-ink">Sitemap</a>
              <a href="#" className="hover:text-ink">RSS</a>
              <a href="#" className="hover:text-ink">Help Center</a>
              <button className="hover:text-ink">Back to top ↑</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
