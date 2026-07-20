import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Shield, CheckCircle, Database, Server, User, Mail, Phone, MessageSquare, ArrowRight,
  RefreshCw, FileText, Sparkles, Cpu, Layers, HardDrive, AlertCircle, TrendingUp, MapPin,
  Globe, Activity, HelpCircle, Lock, Terminal
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trackMetaEvent } from "@/lib/metaPixel";

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

// Country-specific phone validation patterns
const COUNTRY_PHONE_PATTERNS: Record<string, { dialCode: string; pattern: RegExp; example: string }> = {
  IE: { dialCode: "353", pattern: /^8\d{8}$/, example: "87 123 4567" },
  CH: { dialCode: "41", pattern: /^(\+41|0041|0)?[1-9]\d{8}$/, example: "079 123 45 67" },
  FR: { dialCode: "33", pattern: /^(\+33|0033|0)?[1-9]\d{8}$/, example: "06 12 34 56 78" },
  BE: { dialCode: "32", pattern: /^(\+32|0032|0)?[1-9]\d{8}$/, example: "0471 12 34 56" },
  CA: { dialCode: "1", pattern: /^(\+1|001)?[2-9]\d{9}$/, example: "416 123 4567" },
  US: { dialCode: "1", pattern: /^(\+1|001)?[2-9]\d{9}$/, example: "212 555 1234" },
  GB: { dialCode: "44", pattern: /^(\+44|0044|0)?[1-9]\d{9}$/, example: "07700 900123" },
  DE: { dialCode: "49", pattern: /^(\+49|0049|0)?[1-9]\d{10}$/, example: "0151 12345678" },
  ES: { dialCode: "34", pattern: /^(\+34|0034|0)?[6-9]\d{8}$/, example: "612 345 678" },
  IT: { dialCode: "39", pattern: /^(\+39|0039|0)?[3]\d{8,9}$/, example: "333 1234567" },
  NL: { dialCode: "31", pattern: /^(\+31|0031|0)?[6]\d{8}$/, example: "06 12345678" },
  SE: { dialCode: "46", pattern: /^(\+46|0046|0)?[7-9]\d{8}$/, example: "070 123 45 67" },
  AU: { dialCode: "61", pattern: /^(\+61|0061|0)?[4]\d{8}$/, example: "0412 345 678" },
  IN: { dialCode: "91", pattern: /^(\+91|0091|0)?[6-9]\d{9}$/, example: "98765 43210" },
  AE: { dialCode: "971", pattern: /^(\+971|00971)?[5]\d{8}$/, example: "050 123 4567" },
  SG: { dialCode: "65", pattern: /^(\+65|0065)?[8-9]\d{7}$/, example: "8123 4567" },
  ZA: { dialCode: "27", pattern: /^(\+27|0027|0)?[6-8]\d{8}$/, example: "082 123 4567" },
  BR: { dialCode: "55", pattern: /^(\+55|0055)?[1-9]{2}[9]?\d{8}$/, example: "11 91234-5678" },
  MX: { dialCode: "52", pattern: /^(\+52|0052)?[1-9]{2}\d{8}$/, example: "55 1234 5678" },
  JP: { dialCode: "81", pattern: /^(\+81|0081|0)?[789]\d{8,9}$/, example: "090 1234 5678" },
  CY: { dialCode: "357", pattern: /^(\+357|00357)?[9]\d{7}$/, example: "99 123456" },
};

// Swiss phone number regex — accepts: +41XXXXXXXXX, 0041XXXXXXXXX, 0XXXXXXXXX, XXXXXXXXX (9 digits)
const SWISS_PHONE_REGEX = /^(\+41|0041|0)?[1-9]\d{8}$/;

export default function EnquiryPage() {
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [countryCode, setCountryCode] = useState("CH");

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [animateModules, setAnimateModules] = useState(false);
  const [mounted, setMounted] = useState(false);

  // High-frequency Bot execution log state
  const [botLogs, setBotLogs] = useState<string[]>([
    "Initialisation des nœuds d'arbitrage à Zurich & Francfort...",
    "Analyse des pools de liquidité sur Binance, Coinbase & Kraken...",
    "Statut du système : Opérationnel [Latence : 4,2 ms]"
  ]);

  useEffect(() => {
    const tradeMissions = [
      "Arbitrage identifié : BTC-USD (Coinbase) -> BTC-CHF (Swissquote) [+1,42 %]",
      "Exécution du flash swap : 8,5 BTC... Succès [Net : +0,12 BTC]",
      "Arbitrage identifié : ETH-USDT (Binance) -> ETH-EUR (Kraken) [+0,98 %]",
      "Exécution du flash swap : 120 ETH... Succès [Net : +1,17 ETH]",
      "Bloc d'optimisation de gaz correspondant : frais de jalonnement hydro à 11 Gwei",
      "Arbitrage identifié : SOL-USDC (Orca) -> SOL-USD (Raydium) [+2,11 %]",
      "Exécution du flash swap : 450 SOL... Succès [Net : +9,50 SOL]",
      "Rééquilibrage des réserves de couverture delta-neutres dans le coffre-fort de Zurich...",
      "Analyse de liquidité terminée. Aucun écart de latence rentable trouvé.",
      "Arbitrage identifié : BTC-USDC (Uniswap) -> BTC-USD (Bitstamp) [+1,15 %]",
      "Exécution du flash swap : 6,2 BTC... Succès [Net : +0,071 BTC]"
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
    setMounted(true);
    document.title = "Portail d'Allocation Algorithmique de Capital";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Allouez des capitaux directement dans des pools d'arbitrage et de jalonnement crypto à haute fréquence sécurisés.");
    }

    // Trigger visual animations shortly after mount
    const timer = setTimeout(() => setAnimateModules(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only keep digits and a leading '+' — strip spaces, dashes, brackets, etc. on every keystroke
    // This means the stored value is always clean: what the user sees is exactly what gets sent
    const raw = e.target.value;
    const cleaned = raw.startsWith("+")
      ? "+" + raw.slice(1).replace(/\D/g, "")
      : raw.replace(/\D/g, "");
    setPhone(cleaned);
    if (phoneError) setPhoneError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // The phone state is already digits-only (enforced by handlePhoneChange),
    // but strip any residual whitespace just in case of autofill edge cases
    const cleanNum = phone.replace(/\s+/g, "");
    
    // Country-specific validation
    const countryPattern = COUNTRY_PHONE_PATTERNS[countryCode];
    
    // --- Frontend validation ---
    if (!cleanNum) {
      setPhoneError("Veuillez entrer un numéro de téléphone");
      setIsSubmitting(false);
      return;
    }
    if (!countryPattern.pattern.test(cleanNum)) {
      setPhoneError(`Veuillez entrer un numéro valide pour ${countryCode} (ex: ${countryPattern.example})`);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");
    setPhoneError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send the whitespace-stripped phone so the backend formatter gets a clean string
        body: JSON.stringify({
          name,
          email,
          phone: cleanNum,
          message,
          countryCode,
          leadType: "contact",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        trackMetaEvent("Lead", {
          content_name: "Enquiry Form",
          email: email,
          phone: cleanNum,
        });
        trackMetaEvent("Contact");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setCountryCode("CH");
      } else {
        console.error("Submission error: ", data.error);
        
        // Show professional messaging without technical "error" jargon
        if (data.error === "already_exists" || (data.error && data.error.includes("déjà contactés")) || (data.message && data.message.includes("déjà contactés"))) {
          setSubmitError("Vous nous avez déjà contactés. Veuillez patienter.");
        } else if (data.error === "invalid_lead" || (data.error && data.error.includes("valides"))) {
          setSubmitError(data.message || "Certaines informations saisies ne semblent pas valides. Veuillez vérifier le format de votre numéro de téléphone et de votre e-mail.");
        } else {
          setSubmitError(
            data.message || data.error ||
              "Le registre sécurisé des demandes n'a pas pu traiter votre demande. Veuillez réessayer plus tard."
          );
        }
      }
    } catch (err: any) {
      const rawMsg = (err?.message || err?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists") || rawMsg.toLowerCase().includes("contacted")) {
        toast.success("Vous nous avez déjà contactés. Veuillez patienter.");
        return;
      }
      console.error("Fetch error: ", err);
      setSubmitError(
        "Problème de connectivité réseau. Échec de la connexion au point de terminaison de l'API sécurisée."
      );
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
    } catch (e: any) {
      const rawMsg = (e?.message || e?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists") || rawMsg.toLowerCase().includes("contacted")) {
        toast.success("Vous nous avez déjà contactés. Veuillez patienter.");
        return;
      }
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
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">PORTAIL ALGORITHMIQUE QUANTITATIF</span>
            </div>
          </div>
          <button 
            onClick={handleBack} 
            className="text-xs font-bold text-purple-400 hover:text-purple-300 px-5 py-2.5 rounded-xl border border-purple-900/40 bg-slate-900 hover:bg-slate-850 shadow-sm transition-all cursor-pointer hover:shadow"
          >
            ← Retour aux Actualités
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-20 py-20 md:py-28 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-900/35 text-purple-300 text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
          PORTEFEUILLE DE RICHESSE D'ARBITRAGE ALGORITHMIQUE
        </div>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
          Libérez une allocation de capital à haut rendement
        </h1>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-sans max-w-3xl mx-auto">
          Allouez des capitaux directement dans nos pools d'arbitrage au comptant à haute fréquence, gérés par des réseaux de validateurs de pointe et des nœuds de staking hors ligne sécurisés.
        </p>
      </section>

      {/* Crypto Ticker Marquee Line - Full Width */}
      <div className="w-full overflow-hidden border-y border-slate-800/80 bg-slate-950/40 py-4 relative z-10">
        <div className="anim-marquee flex gap-12 whitespace-nowrap text-xs font-mono font-bold text-slate-400">
          <span>• BTC/USD: $71 842,30 <span className="text-emerald-400 font-semibold">(+2,41%)</span></span>
          <span>• ETH/USD: $3 824,10 <span className="text-emerald-400 font-semibold">(+1,87%)</span></span>
          <span>• SOL/USD: $184,22 <span className="text-emerald-400 font-semibold">(+4,18%)</span></span>
          <span>• FRAIS DE VALIDATEUR HYDRO SUISSE : <span className="text-purple-400">12 GWEI</span></span>
          <span>• NŒUDS DE CHAÎNE ACTIFS : <span className="text-emerald-400">849 203 EN LIGNE</span></span>
          <span>• BLOCS DANS LE MEMPOOL : <span className="text-indigo-400">1 421 SYNCHRONISÉS</span></span>
          <span>• PROTOCOLE DE GARDE SÉCURISÉ SUISSE : <span className="text-emerald-400">ACTIF</span></span>
          <span>• BTC/USD: $71 842,30 <span className="text-emerald-400 font-semibold">(+2,41%)</span></span>
          <span>• ETH/USD: $3 824,10 <span className="text-emerald-400 font-semibold">(+1,87%)</span></span>
          <span>• SOL/USD: $184,22 <span className="text-emerald-400 font-semibold">(+4,18%)</span></span>
          <span>• FRAIS DE VALIDATEUR HYDRO SUISSE : <span className="text-purple-400">12 GWEI</span></span>
          <span>• NŒUDS DE CHAÎNE ACTIFS : <span className="text-emerald-400">849 203 EN LIGNE</span></span>
        </div>
      </div>

      {/* 2. CENTERED ALLOCATION FORM SECTION */}
      <section className="relative z-20 py-24 md:py-28 border-b border-slate-900/50 bg-slate-950/20">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3 font-serif border-b border-slate-800 pb-5">
                <FileText className="w-7 h-7 text-purple-400" />
                Demande d'Allocation de Capital
              </h2>

              {submitSuccess ? (
                <div className="py-16 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 mb-6 animate-bounce">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-4">Demande Soumise</h3>
                  <p className="text-slate-350 text-base max-w-md mx-auto mb-8 font-medium leading-relaxed">
                    Merci ! Votre demande de conseil privée a été soumise avec succès. Un représentant vous contactera sous peu.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="font-bold text-sm text-purple-400 hover:text-purple-300 underline transition-colors cursor-pointer"
                  >
                    Soumettre une autre demande
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
                      <label className="block text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider font-sans">Nom complet</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4.5 flex items-center text-slate-500">
                          <User className="w-5 h-5" />
                        </span>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Votre Nom" 
                          className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-12 pr-5 py-4 text-[16px] text-white placeholder-slate-500 focus:bg-slate-950 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider font-sans">Adresse e-mail sécurisée</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4.5 flex items-center text-slate-500">
                          <Mail className="w-5 h-5" />
                        </span>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre.nom@domaine.com" 
                          className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-12 pr-5 py-4 text-[16px] text-white placeholder-slate-500 focus:bg-slate-950 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider font-sans">Numéro de téléphone</label>
                    <div className="relative">
                      
<div style={{ display: 'flex', gap: '8px', width: '100%' }}>
    {mounted ? (
      <Select value={countryCode} onValueChange={(value) => setCountryCode(value)}>
        <SelectTrigger className="flex h-[58px] w-[140px] items-center justify-between whitespace-nowrap rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-4 text-[16px] text-white shadow-sm transition-all focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 hover:bg-slate-950/80 cursor-pointer [&>span]:line-clamp-1">
          <SelectValue placeholder="CH +41" />
        </SelectTrigger>
        <SelectContent className="bg-slate-950 border border-slate-800 text-white rounded-xl max-h-[300px]">
          <SelectItem value="CH" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">CH +41</SelectItem>
          <SelectItem value="FR" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">FR +33</SelectItem>
          <SelectItem value="BE" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">BE +32</SelectItem>
          <SelectItem value="CA" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">CA +1</SelectItem>
          <SelectItem value="US" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">US +1</SelectItem>
          <SelectItem value="GB" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">GB +44</SelectItem>
          <SelectItem value="DE" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">DE +49</SelectItem>
          <SelectItem value="ES" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">ES +34</SelectItem>
          <SelectItem value="IT" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">IT +39</SelectItem>
          <SelectItem value="NL" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">NL +31</SelectItem>
          <SelectItem value="SE" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">SE +46</SelectItem>
          <SelectItem value="AU" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">AU +61</SelectItem>
          <SelectItem value="IN" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">IN +91</SelectItem>
          <SelectItem value="AE" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">AE +971</SelectItem>
          <SelectItem value="SG" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">SG +65</SelectItem>
          <SelectItem value="ZA" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">ZA +27</SelectItem>
          <SelectItem value="BR" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">BR +55</SelectItem>
          <SelectItem value="MX" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">MX +52</SelectItem>
          <SelectItem value="JP" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">JP +81</SelectItem>
          <SelectItem value="CY" className="focus:bg-slate-900 focus:text-white cursor-pointer py-2.5 pl-3 pr-8 text-sm">CY +357</SelectItem>
        </SelectContent>
      </Select>
    ) : (
      <div className="flex h-[58px] w-[140px] items-center justify-between whitespace-nowrap rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-4 text-[16px] text-white/40 shadow-sm font-medium">
        <span>{countryCode} +{COUNTRY_PHONE_PATTERNS[countryCode]?.dialCode || "41"}</span>
        <span className="text-[10px] opacity-40">▼</span>
      </div>
    )}
<input 
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+41791234567"
                        inputMode="numeric"
                        maxLength={15}
                        className={`w-full bg-slate-950/60 border rounded-xl pl-4 pr-5 py-4 text-[16px] text-white placeholder-slate-500 focus:bg-slate-950 focus:ring-4 outline-none transition-all font-mono tracking-widest ${
                          phoneError
                            ? "border-red-600/70 focus:border-red-500 focus:ring-red-500/10"
                            : "border-slate-800 focus:border-purple-500 focus:ring-purple-500/5"
                        }`}
                       style={{ flex: 1 }} />
</div>
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-500 font-sans">
                      <span>Entrez votre numéro sans espaces — ex: </span>
                      <span className="font-mono text-slate-400">{COUNTRY_PHONE_PATTERNS[countryCode]?.example}</span>
                    </p>
                    {phoneError && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-sm text-red-400 font-semibold font-sans">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {phoneError}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">Description de l'intention d'investissement et du cas</label>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Optionnel</span>
                    </div>
                    <div className="relative">
                      <span className="absolute top-4 left-4.5 text-slate-500">
                        <MessageSquare className="w-5 h-5" />
                      </span>
                      <textarea 
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Précisez votre allocation cible, vos options de liquidité ou vos préférences de stockage à froid (optionnel)..." 
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
                      Transmission sécurisée des paramètres d'allocation...
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 border border-purple-500/10 py-4.5 rounded-xl font-bold text-base uppercase tracking-wider text-white shadow-lg shadow-purple-900/10 transition-all active:scale-[0.99] group cursor-pointer"
                    >
                      Soumettre la demande d'allocation
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  )}

                  <div className="flex items-center gap-2 text-[10px] text-slate-500 justify-center">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Tunnel cryptographique TLS SSL 256 bits et protection des données conforme en Suisse.</span>
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
              Mesures de Rendement
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight">
              Performance des Rendements & Analyses
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 leading-relaxed">
              Suivez les performances de rendement de nos algorithmes d'arbitrage automatique au comptant à haute fréquence par rapport aux indices du marché financier mondial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Card 1 - Sovereign Yield Index */}
            <StandardCard
              title="Indice de Rendement Souverain"
              subtitle="Rendement simulé des conseils vs indice de référence traditionnel"
              icon={TrendingUp}
              badge="Croissance Active"
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
                  <span>Performance YTD : <strong className="text-emerald-400 font-bold">+58,4 %</strong></span>
                  <span className="text-purple-400 font-bold">CHF 1,4B CAP</span>
                </div>
              </div>
            </StandardCard>

            {/* Card 2 - Network Performance */}
            <StandardCard
              title="Performance du Réseau"
              subtitle="Mesures de statut en temps réel du système de validation"
              icon={Activity}
              badge="Système Normal"
              badgeType="info"
            >
              <div className="grid grid-cols-2 gap-4 mt-1">
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold font-sans tracking-wide">Prix du Gaz</div>
                  <div className="text-base font-bold text-slate-100 font-mono mt-0.5">12 Gwei</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold font-sans tracking-wide">Validation</div>
                  <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">99,98 %</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold font-sans tracking-wide">Temps de bloc</div>
                  <div className="text-base font-bold text-slate-100 font-mono mt-0.5">1,2s moy</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold font-sans tracking-wide">Pool de Staking</div>
                  <div className="text-base font-bold text-purple-400 font-mono mt-0.5">Actif</div>
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
              Spécifications des Coffres Suisses
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight">
              Sécurité des Chambres Fortes & Protections Physiques
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 leading-relaxed">
              Nos nœuds de stockage à froid sont verrouillés dans des bunkers hors ligne de qualité militaire en Suisse pour garantir le plus haut niveau de souveraineté cryptographique.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Card 3 - Swiss Key Bunkers */}
            <StandardCard
              title="Bunkers de Clés Suisses"
              subtitle="Spécifications de garde physique sécurisée"
              icon={Lock}
              badge="Coffre Isolé"
              badgeType="warning"
            >
              <p className="text-sm md:text-base text-slate-400 mb-4 leading-relaxed">
                Clés physiques de stockage à froid déconnectées, nichées au sein de réseaux de bunkers alpins profonds et de niveau militaire à Zoug et Genève.
              </p>
              <ul className="space-y-2.5 text-sm md:text-base text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Contrôles d'accès par autorisation multi-signature</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Sécurité isolée (« air-gapped »), aucun point d'accès réseau physique</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Coffres-forts conformes aux normes des banques fédérales suisses</span>
                </li>
              </ul>
            </StandardCard>

            {/* Card 4 - Swiss Validator Map */}
            <StandardCard
              title="Carte des Validateurs Suisses"
              subtitle="Carte de télémétrie géographique des nœuds"
              icon={Globe}
              badge="Hubs Suisses"
              badgeType="info"
            >
              <p className="text-sm md:text-base text-slate-400 mb-4 leading-relaxed">
                Télémétrie active de l'infrastructure des nœuds du grand livre représentant les hubs de validateurs financiers suisses sécurisés.
              </p>
              <div className="h-24 relative border border-slate-850 rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden">
                <div className="absolute left-[15%] top-[45%] flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="anim-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold font-mono text-slate-450">Genève</span>
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
                  <span className="text-[11px] font-bold font-mono text-purple-400">Zoug</span>
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
              Plafonds de Staking
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight">
              Capacités des Pools de Staking & Nœuds de Registre
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 leading-relaxed">
              Vérifiez les grilles de nœuds de validation de blocs en temps réel et les taux de remplissage de nos pools de jalonnement à haut rendement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Card 5 - Venture Allocations */}
            <StandardCard
              title="Allocations de Capital-Risque"
              subtitle="Seuils de souscription pour le capital Web3 privé"
              icon={Layers}
              badge="Staking Actif"
            >
              <p className="text-sm md:text-base text-slate-400 mb-4 leading-relaxed">
                Suivi en direct de la capacité et des souscriptions pour les pools de jalonnement liquide souverains.
              </p>
              <div className="space-y-4 font-mono text-xs text-slate-400 mt-2">
                <div>
                  <div className="flex justify-between mb-1.5 font-bold">
                    <span>Jalonnement Hydro Alpin</span>
                    <span className="text-emerald-400">Rempli à 92 %</span>
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
                    <span>Pool d'Amorçage de Capital-Risque</span>
                    <span className="text-purple-400">Rempli à 76 %</span>
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
              title="Blocs de Serveurs Alpins"
              subtitle="Suivi des transactions du registre et des blocs de validation"
              icon={Cpu}
              badge="Synchro du Registre"
            >
              <p className="text-sm md:text-base text-slate-400 mb-4 leading-relaxed">
                Hauteurs de blocs en temps réel en cours de traitement et de validation par nos baies de serveurs alimentées par l'hydroélectricité.
              </p>
              <div className="grid grid-cols-2 gap-4 font-mono text-xs mt-2">
                <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-xl">
                  <div className="text-slate-500 text-[10px] font-bold uppercase">Hauteur de bloc</div>
                  <div className="text-purple-400 font-bold text-sm mt-0.5">#849,203</div>
                  <div className="text-[10px] text-slate-400 mt-1">12 Txns • Validées</div>
                </div>
                <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-xl">
                  <div className="text-slate-500 text-[10px] font-bold uppercase">Hauteur de bloc</div>
                  <div className="text-purple-400 font-bold text-sm mt-0.5">#849,204</div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-1">Nœuds de Traitement</div>
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
              Systèmes en Direct
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-white tracking-tight">
              Télémétrie du Bot d'Arbitrage & FAQ
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 leading-relaxed">
              Consultez les indicateurs d'exécution algorithmique en direct et les questions fréquemment posées concernant nos moteurs d'arbitrage de liquidité exclusifs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Card 7 - Trading Bot FAQ */}
            <StandardCard
              title="FAQ du Bot de Trading"
              subtitle="Détails sur l'exécution algorithmique et les protocoles d'arbitrage"
              icon={HelpCircle}
              badge="Infos FAQ"
              badgeType="default"
            >
              <div className="space-y-4 mt-1">
                <div className="border-b border-slate-850 pb-3 font-sans">
                  <div className="font-bold text-slate-200 text-sm md:text-base">Quel est l'algorithme du bot de trading ?</div>
                  <div className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed">Notre système propriétaire à haute fréquence analyse les marchés mondiaux de liquidité au comptant pour capturer automatiquement les écarts de rendement de micro-arbitrage.</div>
                </div>
                <div className="font-sans">
                  <div className="font-bold text-slate-200 text-sm md:text-base">Existe-t-il des garanties physiques ?</div>
                  <div className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed">Oui, tous les nœuds d'arbitrage sont adossés à des coffres-forts automatisés delta-neutres avec une protection de garde isolée (« air-gapped »).</div>
                </div>
              </div>
            </StandardCard>

            {/* Card 8 - Trading Bot Telemetry */}
            <StandardCard
              title="Télémétrie du Bot de Trading"
              subtitle="Journaux d'exécution en temps réel pour les nœuds à haute fréquence"
              icon={Terminal}
              badge="Exécution Active"
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
                  Analyses d'Arbitrage en Cours
                </span>
                <span>Latence : 4,2 ms</span>
              </div>
            </StandardCard>
          </div>
        </div>
      </section>

      {/* Footer - Full Width */}
      <footer className="relative z-20 bg-slate-950/60 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-slate-550 font-semibold">
          <div>© 2026 Portail Sovereign Capital. Tous droits réservés.</div>
          <div className="flex gap-8">
            <a 
              href="/privacy" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "/privacy");
              }}
              className="hover:text-purple-400 font-bold transition-colors"
            >
              Politique de Confidentialité
            </a>
            <a 
              href="/terms" 
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "/terms");
              }}
              className="hover:text-purple-400 font-bold transition-colors"
            >
              Conditions Générales
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

