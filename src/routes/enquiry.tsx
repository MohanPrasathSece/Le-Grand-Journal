import { useEffect, useState } from "react";
import {
  Shield, CheckCircle, Database, Server, User, Mail, Phone, MessageSquare, ArrowRight,
  RefreshCw, FileText, Sparkles, Cpu, Layers, HardDrive, AlertCircle, TrendingUp, MapPin,
  Globe, Activity, HelpCircle, Lock, Terminal
} from "lucide-react";

interface CardProps {
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeType?: "success" | "warning" | "info" | "default";
  children: React.ReactNode;
}

function StandardCard({ title, subtitle, icon: Icon, badge, badgeType = "default", children }: CardProps) {
  const badgeClasses = {
    success: "text-emerald-400 bg-emerald-950/45 border-emerald-900/30",
    warning: "text-amber-400 bg-amber-950/45 border-amber-900/30",
    info: "text-indigo-400 bg-indigo-950/45 border-indigo-900/30",
    default: "text-purple-400 bg-purple-950/45 border-purple-900/30"
  };

  return (
    <div className="bg-slate-900/25 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.005] hover:border-purple-550/20 transition-all flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 group-hover:bg-purple-950/50 group-hover:border-purple-900/35 transition-all duration-300">
              <Icon className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-100 leading-tight tracking-tight">{title}</h3>
              {subtitle && <p className="text-xs text-slate-400 font-sans mt-1 leading-normal">{subtitle}</p>}
            </div>
          </div>
          {badge && (
            <span className={`text-[10px] font-bold border px-2.5 py-0.5 rounded font-sans tracking-wider uppercase ${badgeClasses[badgeType]}`}>
              {badge}
            </span>
          )}
        </div>
        <div className="mt-4 text-slate-300 font-sans text-sm md:text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function EnquiryPage() {
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [animateModules, setAnimateModules] = useState(false);

  // High-frequency Bot execution log state
  const [botLogs, setBotLogs] = useState<string[]>([
    "Initializing arbitrage nodes in Zurich & Frankfurt...",
    "Scanning liquidity pools on Binance, Coinbase & Kraken...",
    "System status: Operational [Latency: 4.2ms]"
  ]);

  useEffect(() => {
    const tradeMissions = [
      "Arbitrage identified: BTC-USD (Coinbase) -> BTC-CHF (Swissquote) [+1.42%]",
      "Executing flash swap: 8.5 BTC... Success [Net: +0.12 BTC]",
      "Arbitrage identified: ETH-USDT (Binance) -> ETH-EUR (Kraken) [+0.98%]",
      "Executing flash swap: 120 ETH... Success [Net: +1.17 ETH]",
      "Gas optimization block matched: hydro staking fee at 11 Gwei",
      "Arbitrage identified: SOL-USDC (Orca) -> SOL-USD (Raydium) [+2.11%]",
      "Executing flash swap: 450 SOL... Success [Net: +9.50 SOL]",
      "Re-balancing delta-neutral hedging reserves in Zurich Vault...",
      "Liquidity scan complete. No profitable latency gaps found.",
      "Arbitrage identified: BTC-USDC (Uniswap) -> BTC-USD (Bitstamp) [+1.15%]",
      "Executing flash swap: 6.2 BTC... Success [Net: +0.071 BTC]"
    ];

    const timer = setInterval(() => {
      const randomMsg = tradeMissions[Math.floor(Math.random() * tradeMissions.length)];
      setBotLogs((prev) => {
        const updated = [...prev, `${new Date().toLocaleTimeString()} - ${randomMsg}`];
        if (updated.length > 5) {
          return updated.slice(updated.length - 5);
        }
        return updated;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // SEO Update and Data Load
  useEffect(() => {
    document.title = "Algorithmic Wealth Allocation Portal";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Allocate capital directly into secure high-frequency crypto staking and arbitrage index pools.");
    }

    // Trigger visual animations shortly after mount
    const timer = setTimeout(() => setAnimateModules(true), 250);
    return () => clearTimeout(timer);
  }, []);

  // Form Submission via secure proxy
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        console.error("Submission error: ", data.error);
        setSubmitError(data.error || "The secure advisory registry was unable to process your request. Please try again later.");
      }
    } catch (err) {
      console.error("Fetch error: ", err);
      setSubmitError("Network connectivity issue. Failed to connect to secure API endpoint.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    try {
      if (window.opener) {
        window.close();
      } else {
        window.history.pushState({}, "", "/");
      }
    } catch (e) {
      window.history.pushState({}, "", "/");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070B13] text-slate-200 font-sans bg-grid-pattern">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[550px] h-[550px] bg-indigo-900/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Global CSS keyframe styles */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes draw-line {
          from { stroke-dashoffset: 600; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes pulse-radar {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .anim-marquee { animation: marquee-scroll 35s linear infinite; }
        .anim-chart-line { stroke-dasharray: 600; stroke-dashoffset: 600; animation: draw-line 3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .anim-radar { animation: pulse-radar 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        
        .bg-grid-pattern {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(99, 102, 241, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.015) 1px, transparent 1px);
        }
      `}</style>

      {/* Navigation / Header - Sticky and Full Width */}
      <nav className="relative z-20 border-b border-slate-900 bg-slate-950/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-600 rounded-xl shadow-md text-white">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-white flex items-baseline gap-2">
                Sovereign Capital <span className="text-[10px] uppercase tracking-wider text-white font-sans px-2 py-0.5 bg-purple-600 rounded-md font-bold">PRO</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">QUANTITATIVE ALGORITHMIC PORTAL</span>
            </div>
          </div>
          <button 
            onClick={handleBack} 
            className="text-xs font-bold text-purple-400 hover:text-purple-300 px-5 py-2.5 rounded-xl border border-purple-900/40 bg-slate-900 hover:bg-slate-850 shadow-sm transition-all cursor-pointer hover:shadow"
          >
            ← Back to News
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-20 py-20 md:py-28 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-900/35 text-purple-300 text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
          ALGORITHMIC ARBITRAGE WEALTH PORTFOLIO
        </div>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
          Unlock High-Yield Capital Allocation
        </h1>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-sans max-w-3xl mx-auto">
          Allocate capital directly into our high-frequency spot arbitrage pools, managed by state-of-the-art validator arrays and secure offline staking nodes.
        </p>
      </section>

      {/* Crypto Ticker Marquee Line - Full Width */}
      <div className="w-full overflow-hidden border-y border-slate-800/80 bg-slate-950/40 py-4 relative z-10">
        <div className="anim-marquee flex gap-12 whitespace-nowrap text-xs font-mono font-bold text-slate-400">
          <span>• BTC/USD: $71,842.30 <span className="text-emerald-400 font-semibold">(+2.41%)</span></span>
          <span>• ETH/USD: $3,824.10 <span className="text-emerald-400 font-semibold">(+1.87%)</span></span>
          <span>• SOL/USD: $184.22 <span className="text-emerald-400 font-semibold">(+4.18%)</span></span>
          <span>• SWISS HYDRO VALIDATOR FEE: <span className="text-purple-400">12 GWEI</span></span>
          <span>• ACTIVE CHAIN NODES: <span className="text-emerald-400">849,203 ONLINE</span></span>
          <span>• BLOCKS IN MEMPOOL: <span className="text-indigo-400">1,421 SYNCED</span></span>
          <span>• SWISS SECURE CUSTODY PROTOCOL: <span className="text-emerald-400">ACTIVE</span></span>
          <span>• BTC/USD: $71,842.30 <span className="text-emerald-400 font-semibold">(+2.41%)</span></span>
          <span>• ETH/USD: $3,824.10 <span className="text-emerald-400 font-semibold">(+1.87%)</span></span>
          <span>• SOL/USD: $184.22 <span className="text-emerald-400 font-semibold">(+4.18%)</span></span>
          <span>• SWISS HYDRO VALIDATOR FEE: <span className="text-purple-400">12 GWEI</span></span>
          <span>• ACTIVE CHAIN NODES: <span className="text-emerald-400">849,203 ONLINE</span></span>
        </div>
      </div>

      {/* 2. CENTERED ALLOCATION FORM SECTION */}
      <section className="relative z-20 py-24 md:py-28 border-b border-slate-900/50 bg-slate-950/20">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3 font-serif border-b border-slate-800 pb-5">
                <FileText className="w-7 h-7 text-purple-400" />
                Capital Allocation Request
              </h2>

              {submitSuccess ? (
                <div className="py-16 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 mb-6 animate-bounce">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-4">Enquiry Submitted</h3>
                  <p className="text-slate-350 text-base max-w-md mx-auto mb-8 font-medium leading-relaxed">
                    Thank you! Your private advisory request has been submitted successfully. A representative will get in touch with you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="font-bold text-sm text-purple-400 hover:text-purple-300 underline transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {submitError && (
                    <div className="bg-red-950/30 border border-red-900/40 rounded-xl p-4 text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider font-sans">Full Name</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4.5 flex items-center text-slate-500">
                          <User className="w-5 h-5" />
                        </span>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name" 
                          className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-12 pr-5 py-4 text-[16px] text-white placeholder-slate-500 focus:bg-slate-950 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider font-sans">Email Address</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4.5 flex items-center text-slate-500">
                          <Mail className="w-5 h-5" />
                        </span>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@domain.com" 
                          className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-12 pr-5 py-4 text-[16px] text-white placeholder-slate-500 focus:bg-slate-950 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider font-sans">Phone / Number</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4.5 flex items-center text-slate-500">
                        <Phone className="w-5 h-5" />
                      </span>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+41 41 726 12 34" 
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-12 pr-5 py-4 text-[16px] text-white placeholder-slate-500 focus:bg-slate-950 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">Verification / Message Details</label>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Optional</span>
                    </div>
                    <div className="relative">
                      <span className="absolute top-4 left-4.5 text-slate-500">
                        <MessageSquare className="w-5 h-5" />
                      </span>
                      <textarea 
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="State your allocation target, liquidity options, or cold storage preferences (optional)..." 
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-12 pr-5 py-4 text-[16px] text-white placeholder-slate-500 focus:bg-slate-950 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all font-sans"
                      />
                    </div>
                  </div>

                  {isSubmitting ? (
                    <button 
                      type="button"
                      disabled
                      className="w-full flex items-center justify-center gap-3 bg-purple-950 border border-purple-900 py-4.5 rounded-xl font-bold text-base uppercase tracking-wider text-purple-100 shadow"
                    >
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Processing Secure Allocation Handshake...
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 border border-purple-500/10 py-4.5 rounded-xl font-bold text-base uppercase tracking-wider text-white shadow-lg shadow-purple-900/10 transition-all active:scale-[0.99] group cursor-pointer"
                    >
                      Allocate Capital Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  )}

                  <div className="flex items-center gap-2 text-[10px] text-slate-500 justify-center">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    <span>256-bit SSL Cryptographic TLS Tunnel and Compliant Data Protections in Switzerland.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: YIELD PERFORMANCE & ANALYTICS - Full Width Section */}
      <section className="py-24 md:py-32 border-b border-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/40 border border-purple-900/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
              Yield Metrics
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight">
              Yield Performance & Analytics
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 leading-relaxed">
              Track the yield performance metrics of our high-frequency automated spot arbitrage algorithms against global finance market indexes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Card 1 - Sovereign Yield Index */}
            <StandardCard
              title="Sovereign Yield Index"
              subtitle="Simulated advisory yield vs traditional benchmark"
              icon={TrendingUp}
              badge="Active Growth"
              badgeType="success"
            >
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between h-28 relative overflow-hidden mb-2 mt-1">
                <svg viewBox="0 0 300 120" className="w-full h-20 overflow-visible">
                  <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                  <line x1="0" y1="70" x2="300" y2="70" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                  <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                  
                  <path 
                    d="M 10 90 Q 70 85 110 55 T 220 35 T 290 15" 
                    fill="none" 
                    stroke="#1E293B" 
                    strokeWidth="3" 
                  />
                  <path 
                    d="M 10 90 Q 70 85 110 55 T 220 35 T 290 15" 
                    fill="none" 
                    stroke="url(#gradient-purple-blue-4)" 
                    strokeWidth="3.5" 
                    className="anim-chart-line"
                  />
                  <circle cx="290" cy="15" r="4" fill="#8B5CF6" />

                  <defs>
                    <linearGradient id="gradient-purple-blue-4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex justify-between items-center text-xs font-mono text-slate-400 mt-2">
                  <span>YTD Performance: <strong className="text-emerald-400 font-bold">+58.4%</strong></span>
                  <span className="text-purple-400 font-bold">CHF 1.4B CAP</span>
                </div>
              </div>
            </StandardCard>

            {/* Card 2 - Network Performance */}
            <StandardCard
              title="Network Performance"
              subtitle="Real-time validator system status metrics"
              icon={Activity}
              badge="System Normal"
              badgeType="info"
            >
              <div className="grid grid-cols-2 gap-4 mt-1">
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold font-sans tracking-wide">Gas Price</div>
                  <div className="text-base font-bold text-slate-100 font-mono mt-0.5">12 Gwei</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold font-sans tracking-wide">Validation</div>
                  <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">99.98%</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold font-sans tracking-wide">Block Time</div>
                  <div className="text-base font-bold text-slate-100 font-mono mt-0.5">1.2s avg</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold font-sans tracking-wide">Staking Pool</div>
                  <div className="text-base font-bold text-purple-400 font-mono mt-0.5">Active</div>
                </div>
              </div>
            </StandardCard>
          </div>
        </div>
      </section>

      {/* SECTION 4: SECURITY & CUSTODY SAFEKEEPS - Full Width Section */}
      <section className="py-24 md:py-32 border-b border-slate-900/50 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-950/40 border border-indigo-900/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
              Swiss Vault Specs
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight">
              Vault Security & Physical Safeguards
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 leading-relaxed">
              Our cold-storage nodes are locked in offline military-grade bunkers inside Switzerland to guarantee the highest level of cryptographic sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Card 3 - Swiss Key Bunkers */}
            <StandardCard
              title="Swiss Key Bunkers"
              subtitle="Secure physical custody specifications"
              icon={Lock}
              badge="Vault Isolated"
              badgeType="warning"
            >
              <p className="text-sm md:text-base text-slate-400 mb-4 leading-relaxed">
                Decoupled physical cold storage keys nested inside deep, military-grade alpine bunker networks in Zug and Geneva.
              </p>
              <ul className="space-y-2.5 text-sm md:text-base text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Multi-signature access authorization controls</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Air-gapped security, zero physical web hooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Swiss federal bank standard compliant vaults</span>
                </li>
              </ul>
            </StandardCard>

            {/* Card 4 - Swiss Validator Map */}
            <StandardCard
              title="Swiss Validator Map"
              subtitle="Geographic node location telemetry map"
              icon={Globe}
              badge="Swiss Hubs"
              badgeType="info"
            >
              <p className="text-sm md:text-base text-slate-400 mb-4 leading-relaxed">
                Active ledger node infrastructure telemetry representing secure Swiss financial validator hubs.
              </p>
              <div className="h-24 relative border border-slate-850 rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden">
                <div className="absolute left-[15%] top-[45%] flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="anim-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold font-mono text-slate-450">Geneva</span>
                </div>
                <div className="absolute left-[45%] top-[25%] flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="anim-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold font-mono text-slate-450">Zurich</span>
                </div>
                <div className="absolute left-[65%] top-[50%] flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="anim-radar absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                  </span>
                  <span className="text-[11px] font-bold font-mono text-purple-400">Zug</span>
                </div>
                <div className="absolute left-[55%] top-[72%] flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="anim-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold font-mono text-slate-450">Lugano</span>
                </div>
              </div>
            </StandardCard>
          </div>
        </div>
      </section>

      {/* SECTION 5: ALLOCATIONS & SERVER LEDGERS - Full Width Section */}
      <section className="py-24 md:py-32 border-b border-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/40 border border-purple-900/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
              Staking Caps
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight">
              Staking Pool Capacities & Ledger Nodes
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 leading-relaxed">
              Verify real-time block validation node grids and fill ratios of our high-yield staking pools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Card 5 - Venture Allocations */}
            <StandardCard
              title="Venture Allocations"
              subtitle="Subscription thresholds for private Web3 capital"
              icon={Layers}
              badge="Staking Active"
            >
              <p className="text-sm md:text-base text-slate-400 mb-4 leading-relaxed">
                Live capacity and subscription tracking for sovereign liquid staking pools.
              </p>
              <div className="space-y-4 font-mono text-xs text-slate-400 mt-2">
                <div>
                  <div className="flex justify-between mb-1.5 font-bold">
                    <span>Alpine Hydro Staking</span>
                    <span className="text-emerald-400">92% Filled</span>
                  </div>
                  <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: animateModules ? "92%" : "0%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1.5 font-bold">
                    <span>Venture Seed Pool</span>
                    <span className="text-purple-400">76% Filled</span>
                  </div>
                  <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: animateModules ? "76%" : "0%" }}
                    />
                  </div>
                </div>
              </div>
            </StandardCard>

            {/* Card 6 - Alpine Server Blocks */}
            <StandardCard
              title="Alpine Server Blocks"
              subtitle="Ledger transactions and validator blocks tracker"
              icon={Cpu}
              badge="Ledger Sync"
            >
              <p className="text-sm md:text-base text-slate-400 mb-4 leading-relaxed">
                Real-time block heights currently being processed and validated by our hydro-powered server arrays.
              </p>
              <div className="grid grid-cols-2 gap-4 font-mono text-xs mt-2">
                <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-xl">
                  <div className="text-slate-500 text-[10px] font-bold uppercase">Block height</div>
                  <div className="text-purple-400 font-bold text-sm mt-0.5">#849,203</div>
                  <div className="text-[10px] text-slate-400 mt-1">12 Txns • Validated</div>
                </div>
                <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-xl">
                  <div className="text-slate-500 text-[10px] font-bold uppercase">Block height</div>
                  <div className="text-purple-400 font-bold text-sm mt-0.5">#849,204</div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-1">Processing Nodes</div>
                </div>
              </div>
            </StandardCard>
          </div>
        </div>
      </section>

      {/* SECTION 6: ALGORITHMIC EXECUTION & FAQs - Full Width Section */}
      <section className="py-24 md:py-32 border-b border-slate-900/50 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-950/40 border border-indigo-900/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
              Live Systems
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight">
              Arbitrage Bot Telemetry & Q&A
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 leading-relaxed">
              Review live algorithmic execution tickers and frequently asked questions regarding our proprietary liquidity arbitrage engines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Card 7 - Trading Bot FAQ */}
            <StandardCard
              title="Trading Bot FAQ"
              subtitle="Details on algorithmic execution and arbitrage protocols"
              icon={HelpCircle}
              badge="FAQ Info"
              badgeType="default"
            >
              <div className="space-y-4 mt-1">
                <div className="border-b border-slate-850 pb-3 font-sans">
                  <div className="font-bold text-slate-200 text-sm md:text-base">What is the trading bot algorithm?</div>
                  <div className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed">Our proprietary high-frequency system scans global spot liquidity markets to capture micro-arbitrage yield spreads automatically.</div>
                </div>
                <div className="font-sans">
                  <div className="font-bold text-slate-200 text-sm md:text-base">Are there physical safeguards?</div>
                  <div className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed">Yes, all arbitrage nodes are backed by automated delta-neutral vaults with air-gapped custody protection.</div>
                </div>
              </div>
            </StandardCard>

            {/* Card 8 - Trading Bot Telemetry */}
            <StandardCard
              title="Trading Bot Telemetry"
              subtitle="Real-time execution logs for high-frequency nodes"
              icon={Terminal}
              badge="Execution Active"
              badgeType="success"
            >
              <div className="bg-slate-950 rounded-xl p-5 border border-slate-900 font-mono text-xs text-emerald-400 space-y-2 h-32 overflow-y-auto shadow-inner leading-relaxed mt-1">
                {botLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">❯</span>
                    <span className="break-all text-slate-300">{log}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-850 pt-3 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Arbitrage Scans Running
                </span>
                <span>Latency: 4.2ms</span>
              </div>
            </StandardCard>
          </div>
        </div>
      </section>

      {/* Footer - Full Width */}
      <footer className="relative z-20 bg-slate-950/60 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-slate-550 font-semibold">
          <div>© 2026 Sovereign Capital Portal. All rights reserved.</div>
          <div className="flex gap-8">
            <a 
              href="/privacy" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "/privacy");
              }}
              className="hover:text-purple-400 font-bold transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "/terms");
              }}
              className="hover:text-purple-400 font-bold transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

