import { useEffect, useState } from "react";
import {
  Shield, CheckCircle, Database, Server, User, Mail, Phone, MessageSquare, ArrowRight,
  RefreshCw, FileText, Sparkles, Cpu, Layers, HardDrive, AlertCircle, TrendingUp, MapPin,
  Globe, Activity, HelpCircle, Lock, Terminal
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: string;
  message: string;
  timestamp: string;
  crmStatus: "pending" | "synced" | "failed";
  crmId?: string;
}

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
    success: "text-emerald-400 bg-emerald-950/40 border-emerald-900/30",
    warning: "text-amber-400 bg-amber-950/40 border-amber-900/30",
    info: "text-indigo-400 bg-indigo-950/40 border-indigo-900/30",
    default: "text-purple-400 bg-purple-950/40 border-purple-900/30"
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur border border-slate-800/80 rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-[1.01] hover:border-purple-500/20 transition-all flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-850 group-hover:bg-purple-950/50 group-hover:border-purple-900/30 transition-colors">
              <Icon className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-serif leading-tight">{title}</h3>
              {subtitle && <p className="text-[10px] text-slate-400 font-medium font-sans mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {badge && (
            <span className={`text-[10px] font-bold border px-2 py-0.5 rounded font-sans tracking-wide ${badgeClasses[badgeType]}`}>
              {badge}
            </span>
          )}
        </div>
        <div className="mt-3 text-slate-300 font-sans text-sm leading-relaxed">
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
  const [tier] = useState("General Advisory");
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
    <div className="min-h-screen relative overflow-hidden bg-[#070B13] text-slate-200 font-sans pb-24 bg-grid-pattern">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[550px] h-[550px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

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
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(99, 102, 241, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.02) 1px, transparent 1px);
        }
      `}</style>

      {/* Main Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-12 lg:py-16 flex flex-col min-h-screen justify-between gap-12">
        
        {/* Navigation / Header */}
        <header className="flex justify-between items-center border-b border-slate-800 pb-6">
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
        </header>

        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-900/35 text-purple-300 text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            ALGORITHMIC ARBITRAGE WEALTH PORTFOLIO
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Unlock High-Yield Capital Allocation
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed font-sans">
            Allocate capital directly into our high-frequency spot arbitrage pools, managed by state-of-the-art validator arrays and secure offline staking nodes.
          </p>
        </div>

        {/* -------------------- 1. CRYPTO TICKER MARQUEE LINE -------------------- */}
        <div className="w-full overflow-hidden border border-slate-800 bg-slate-950/40 py-3.5 relative rounded-2xl shadow-sm z-10">
          <div className="anim-marquee flex gap-12 whitespace-nowrap text-xs font-mono font-bold text-slate-355">
            <span>• BTC/USD: $71,842.30 <span className="text-emerald-450 font-semibold">(+2.41%)</span></span>
            <span>• ETH/USD: $3,824.10 <span className="text-emerald-450 font-semibold">(+1.87%)</span></span>
            <span>• SOL/USD: $184.22 <span className="text-emerald-450 font-semibold">(+4.18%)</span></span>
            <span>• SWISS HYDRO VALIDATOR FEE: <span className="text-purple-400">12 GWEI</span></span>
            <span>• ACTIVE CHAIN NODES: <span className="text-emerald-450">849,203 ONLINE</span></span>
            <span>• BLOCKS IN MEMPOOL: <span className="text-indigo-400">1,421 SYNCED</span></span>
            <span>• SWISS SECURE CUSTODY PROTOCOL: <span className="text-emerald-450">ACTIVE</span></span>
            <span>• BTC/USD: $71,842.30 <span className="text-emerald-450 font-semibold">(+2.41%)</span></span>
            <span>• ETH/USD: $3,824.10 <span className="text-emerald-450 font-semibold">(+1.87%)</span></span>
            <span>• SOL/USD: $184.22 <span className="text-emerald-450 font-semibold">(+4.18%)</span></span>
            <span>• SWISS HYDRO VALIDATOR FEE: <span className="text-purple-400">12 GWEI</span></span>
            <span>• ACTIVE CHAIN NODES: <span className="text-emerald-450">849,203 ONLINE</span></span>
          </div>
        </div>

        {/* Main Dashboard Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Column 1 & 2: Contact Form Card */}
          <div className="lg:col-span-2 bg-slate-900/35 backdrop-blur border border-slate-800 rounded-3xl p-8 md:p-10 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 font-serif border-b border-slate-800 pb-5">
                <FileText className="w-6 h-6 text-purple-400" />
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {submitError && (
                    <div className="bg-red-950/30 border border-red-900/40 rounded-xl p-4 text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-2.5 uppercase tracking-wider font-sans">Full Name</label>
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
                      <label className="block text-xs font-bold text-slate-300 mb-2.5 uppercase tracking-wider font-sans">Email Address</label>
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
                    <label className="block text-xs font-bold text-slate-300 mb-2.5 uppercase tracking-wider font-sans">Phone / Number</label>
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
                        className="w-full bg-slate-50/5 border border-slate-800 rounded-xl pl-12 pr-5 py-4 text-[16px] text-white placeholder-slate-500 focus:bg-slate-950 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">Verification / Message Details</label>
                      <span className="text-[10px] text-slate-550 font-bold uppercase tracking-wide">Optional</span>
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
                        className="w-full bg-slate-50/5 border border-slate-800 rounded-xl pl-12 pr-5 py-4 text-[16px] text-white placeholder-slate-500 focus:bg-slate-950 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all font-sans"
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
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-650 via-indigo-650 to-blue-600 hover:from-purple-550 hover:to-blue-500 border border-purple-500/10 py-4.5 rounded-xl font-bold text-base uppercase tracking-wider text-white shadow-lg shadow-purple-900/10 transition-all active:scale-[0.99] group cursor-pointer"
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

          {/* Column 3: Yield Chart and Network Stats (Standard cards vertical grid) */}
          <div className="flex flex-col gap-8 justify-between">
            
            {/* SECTION 1 - HELVETIA SOVEREIGN YIELD INDEX */}
            <StandardCard
              title="Sovereign Yield Index"
              subtitle="Simulated advisory yield vs traditional benchmark"
              icon={TrendingUp}
              badge="Active Growth"
              badgeType="success"
            >
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between h-28 relative overflow-hidden mb-2 mt-1">
                <svg viewBox="0 0 300 120" className="w-full h-20 overflow-visible">
                  {/* Grid Lines */}
                  <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                  <line x1="0" y1="70" x2="300" y2="70" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                  <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                  
                  {/* Baseline path */}
                  <path 
                    d="M 10 90 Q 70 85 110 55 T 220 35 T 290 15" 
                    fill="none" 
                    stroke="#1E293B" 
                    strokeWidth="3" 
                  />
                  {/* Glowing Animated Drawing line path */}
                  <path 
                    d="M 10 90 Q 70 85 110 55 T 220 35 T 290 15" 
                    fill="none" 
                    stroke="url(#gradient-purple-blue-3)" 
                    strokeWidth="3.5" 
                    className="anim-chart-line"
                  />
                  {/* Target Point */}
                  <circle cx="290" cy="15" r="4" fill="#8B5CF6" />

                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="gradient-purple-blue-3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex justify-between items-center text-xs font-mono text-slate-450 mt-2">
                  <span>YTD Performance: <strong className="text-emerald-400 font-bold">+58.4%</strong></span>
                  <span className="text-purple-400 font-bold">CHF 1.4B CAP</span>
                </div>
              </div>
            </StandardCard>

            {/* SECTION 2 - NETWORK PERFORMANCE NODE */}
            <StandardCard
              title="Network Performance"
              subtitle="Real-time validator system status metrics"
              icon={Activity}
              badge="System Normal"
              badgeType="info"
            >
              <div className="grid grid-cols-2 gap-3 mt-1.5">
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold font-sans tracking-wide">Gas Price</div>
                  <div className="text-base font-bold text-slate-100 font-mono mt-0.5">12 Gwei</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold font-sans tracking-wide">Validation</div>
                  <div className="text-base font-bold text-emerald-450 font-mono mt-0.5">99.98%</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold font-sans tracking-wide">Block Time</div>
                  <div className="text-base font-bold text-slate-100 font-mono mt-0.5">1.2s avg</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold font-sans tracking-wide">Staking Pool</div>
                  <div className="text-base font-bold text-purple-455 font-mono mt-0.5">Active</div>
                </div>
              </div>
            </StandardCard>

          </div>
        </div>

        {/* -------------------- BOTTOM GRID OF STANDARD CARDS (3 Columns) -------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* SECTION 3 - SWISS KEY BUNKERS */}
          <StandardCard
            title="Swiss Key Bunkers"
            subtitle="Secure physical custody specifications"
            icon={Lock}
            badge="Vault Isolated"
            badgeType="warning"
          >
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Decoupled physical cold storage keys nested inside deep, military-grade alpine bunker networks in Zug and Geneva.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-300 font-medium">
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

          {/* SECTION 4 - VENTURE ALLOCATION POOLS */}
          <StandardCard
            title="Venture Allocations"
            subtitle="Subscription thresholds for private Web3 capital"
            icon={Layers}
            badge="Staking Active"
          >
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Live capacity and subscription tracking for sovereign liquid staking pools.
            </p>
            <div className="space-y-4 font-mono text-xs text-slate-400">
              <div>
                <div className="flex justify-between mb-1.5 font-bold">
                  <span>Alpine Hydro Staking</span>
                  <span className="text-emerald-450">92% Filled</span>
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
                  <span className="text-purple-450">76% Filled</span>
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

          {/* SECTION 5 - ALPINE SERVER BLOCKS */}
          <StandardCard
            title="Alpine Server Blocks"
            subtitle="Ledger transactions and validator blocks tracker"
            icon={Cpu}
            badge="Ledger Sync"
          >
            <p className="text-sm text-slate-400 mb-3 leading-relaxed">
              Real-time block heights currently being processed and validated by our hydro-powered server arrays.
            </p>
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="border border-slate-800 bg-slate-950/60 p-2.5 rounded-xl">
                <div className="text-slate-500 text-[10px] font-bold uppercase">Block height</div>
                <div className="text-purple-400 font-bold text-sm mt-0.5">#849,203</div>
                <div className="text-[10px] text-slate-400 mt-0.5">12 Txns • Validated</div>
              </div>
              <div className="border border-slate-800 bg-slate-950/60 p-2.5 rounded-xl">
                <div className="text-slate-500 text-[10px] font-bold uppercase">Block height</div>
                <div className="text-purple-400 font-bold text-sm mt-0.5">#849,204</div>
                <div className="text-[10px] text-emerald-450 font-bold mt-0.5">Processing Nodes</div>
              </div>
            </div>
          </StandardCard>

          {/* SECTION 6 - SWISS VALIDATOR MAP */}
          <StandardCard
            title="Swiss Validator Map"
            subtitle="Geographic node location telemetry map"
            icon={Globe}
            badge="Swiss Hubs"
            badgeType="info"
          >
            <p className="text-sm text-slate-400 mb-3.5 leading-relaxed">
              Active ledger node infrastructure telemetry representing secure Swiss financial validator hubs.
            </p>
            {/* Switzerland Node Map Mockup */}
            <div className="h-20 relative border border-slate-850 rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden">
              <div className="absolute left-[15%] top-[45%] flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="anim-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-bold font-mono text-slate-400">Geneva</span>
              </div>
              <div className="absolute left-[45%] top-[25%] flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="anim-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-bold font-mono text-slate-400">Zurich</span>
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
                <span className="text-[11px] font-bold font-mono text-slate-400">Lugano</span>
              </div>
            </div>
          </StandardCard>

          {/* SECTION 7 - ALGORITHMIC BOT FAQS */}
          <StandardCard
            title="Trading Bot FAQ"
            subtitle="Details on algorithmic execution and arbitrage protocols"
            icon={HelpCircle}
            badge="FAQ Info"
            badgeType="default"
          >
            <div className="space-y-3 mt-1">
              <div className="border-b border-slate-800 pb-2.5 font-sans">
                <div className="font-bold text-slate-250 text-sm">What is the trading bot algorithm?</div>
                <div className="text-slate-400 text-xs mt-1 leading-relaxed">Our proprietary high-frequency system scans global spot liquidity markets to capture micro-arbitrage yield spreads automatically.</div>
              </div>
              <div className="font-sans">
                <div className="font-bold text-slate-250 text-sm">Are there physical safeguards?</div>
                <div className="text-slate-400 text-xs mt-1 leading-relaxed">Yes, all arbitrage nodes are backed by automated delta-neutral vaults with air-gapped custody protection.</div>
              </div>
            </div>
          </StandardCard>

          {/* SECTION 8 - ALGORITHMIC BOT TELEMETRY */}
          <StandardCard
            title="Trading Bot Telemetry"
            subtitle="Real-time execution logs for high-frequency nodes"
            icon={Terminal}
            badge="Execution Active"
            badgeType="success"
          >
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-900 font-mono text-xs text-emerald-450 space-y-1.5 h-24 overflow-y-auto shadow-inner leading-relaxed">
              {botLogs.map((log, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">❯</span>
                  <span className="break-all text-slate-350">{log}</span>
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-850 pt-2.5 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Arbitrage Scans Running
              </span>
              <span>Latency: 4.2ms</span>
            </div>
          </StandardCard>

        </div>

        {/* Footer */}
        <footer className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-semibold">
          <div>© 2026 Sovereign Capital Portal. All rights reserved.</div>
          <div className="flex gap-6">
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
        </footer>

      </div>
    </div>
  );
}
