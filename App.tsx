
import React, { useState, useEffect, useRef } from 'react';
import { 
  Monitor, Smartphone, Code, Sparkles, 
  Trash2, Plus, Settings, Rocket, Terminal, 
  Box, Download, Copy, LayoutTemplate,
  Github, RefreshCw, Cpu, ShieldCheck, 
  Workflow, Activity, ChevronRight, Cloud, Database, Globe, Server, PenTool, Zap,
  Sun, Moon, Layers, PieChart, CheckCircle2,
  Archive, Mail, MapPin, Grid, Search, LogOut, Save, Wand2, PlusCircle, CreditCard, Users, DollarSign, TrendingUp,
  History, Wallet, QrCode, ExternalLink, ShieldAlert, UserPlus, UserCheck, Fingerprint, Palette, Type as TypeIcon, ImageIcon, ShoppingCart, BarChart3, Lock,
  FolderTree, FileCode, Braces, Binary, Play, BoxSelect, Cpu as CpuIcon, Layers3,
  Smartphone as PhoneIcon, Figma, Share2, Package, Globe2, Layers as LayersIcon,
  HardDrive, MonitorPlay, Code2, Link as LinkIcon, FileJson, Cpu as Microchip,
  GitBranch, GitCommit, List, AlertCircle, Key, UserCircle, Settings2, DatabaseZap, UploadCloud, Chrome, Gitlab, HardDrive as DriveIcon, Cpu as AIStudioIcon,
  CreditCard as CardIcon, Banknote, Bitcoin, Landmark, ArrowRightLeft, BadgeDollarSign, Receipt, Clock, Tag, FileUp, FileDown, Eye, Share, Database as DBIcon, Webhook,
  ArrowRight, ShieldCheck as VerifiedIcon, Brackets, Cable, Filter, Cpu as Brain, Terminal as Console, Gauge, Shield, Boxes, Zap as Bolt,
  Activity as Heartbeat, Cpu as Processor, Server as CloudServer, Radio, Wifi, Sliders, HardDrive as Disk, Zap as Power, CodeXml, Table as TableIcon,
  // Removed duplicate Link as LinkIcon from line below
  X, ChevronDown, Check, FileText, Landmark as Bank, Smartphone as Phone, AlertTriangle
} from 'lucide-react';
import JSZip from 'jszip';
import { AppView, GeneratedWebsite, Framework, UserProfile, SubscriptionPlan, Transaction, PaymentMethod, BillingCycle, ProjectFile, DatabaseSchema } from './types';
import { generateSiteByStack } from './services/geminiService';
import { db_engine } from './services/firebaseService';
import PreviewFrame from './components/PreviewFrame';

const NAV_GROUPS: {
  title: string;
  items: {
    id: AppView;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    role?: string;
  }[];
}[] = [
  {
    title: "Quantum Core",
    items: [
      { id: AppView.DASHBOARD, label: "Neural Dashboard", icon: <Gauge size={20} /> },
      { id: AppView.PREVIEW, label: "Omni-Builder", icon: <Bolt size={20} />, badge: "V17.5" },
      { id: AppView.SYSTEM_MONITOR, label: "System Health", icon: <Heartbeat size={20} /> },
    ]
  },
  {
    title: "Forge & Bridges",
    items: [
      { id: AppView.CODE, label: "Nebula IDE Pro", icon: <Code2 size={20} /> },
      { id: AppView.FIGMA_SYNC, label: "Figma Sync", icon: <Figma size={20} /> },
      { id: AppView.API_CONNECTORS, label: "API Gateways", icon: <Webhook size={20} /> },
      { id: AppView.DB_MANAGER, label: "Schema Forge", icon: <DBIcon size={20} /> },
    ]
  },
  {
    title: "Monetary Hub",
    items: [
      { id: AppView.BILLING, label: "Billing & Vault", icon: <BadgeDollarSign size={20} /> },
      { id: AppView.ADMIN, label: "Payment Master", icon: <Shield size={20} />, role: 'ADMIN' },
    ]
  },
  {
    title: "Management",
    items: [
      { id: AppView.DATA_WAREHOUSE, label: "Artifact Vault", icon: <Database size={20} /> },
      { id: AppView.SETTINGS, label: "Node Config", icon: <Settings size={20} /> },
    ]
  }
];

const MASTER_ACCOUNTS = [
  { id: 'paypal', name: 'PayPal Master', icon: <CreditCard />, val: 'https://paypal.me/johnatandeveloper', color: 'text-blue-400', isLink: true },
  { id: 'wompi', name: 'Wompi Checkout', icon: <Zap />, val: 'https://checkout.wompi.pa/l/test_VPOS_yJ8ob0', color: 'text-vino-neon', isLink: true },
  { id: 'binance', name: 'Binance (Crypto)', icon: <Bitcoin />, val: '721869741', color: 'text-pina-neon', detail: 'Binance ID' },
  { id: 'nequi', name: 'Nequi Node', icon: <Phone />, val: '320 543 4546', color: 'text-uva-neon' },
  { id: 'bancolombia', name: 'Bancolombia', icon: <Bank />, val: '02400000208', color: 'text-kiwi', detail: 'Ahorros' },
  { id: 'nu', name: 'Nu Bank', icon: <CreditCard />, val: '50822348', color: 'text-uva-neon', detail: 'CC: 1036931498' },
  { id: 'western', name: 'Western Union', icon: <Globe />, val: '01735600000638343', color: 'text-[#ffcc00]', detail: 'Johnatan Vallejo' },
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [activeStack, setActiveStack] = useState<Framework>('nextjs');
  const [isGenerating, setIsGenerating] = useState(false);
  const [command, setCommand] = useState('');
  const [projects, setProjects] = useState<GeneratedWebsite[]>([]);
  const [logs, setLogs] = useState<string[]>(["[System] Nexus V17.5 Monetary Bridge Engaged.", "[Bridges] Master Billing Node Synchronized."]);
  const [sysHealth, setSysHealth] = useState({ cpu: 4, ram: 22, latency: 40 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ubt_nexus_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [website, setWebsite] = useState<GeneratedWebsite>({
    id: 'master-node',
    name: 'Omni-Nexus V17.5 Artifact',
    html: '<html><body style="background:#000814;color:white;display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;text-transform:uppercase;letter-spacing:1em"><h1>Master V17.5</h1></body></html>',
    files: [{ name: 'index.html', path: 'index.html', content: '<html><body><h1>Master V17.5</h1></body></html>', language: 'html' }],
    framework: 'nextjs',
    description: 'Master Synthesis initialization.',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isPublished: false
  });

  useEffect(() => {
    if (currentUser) {
      loadData();
      // Load sample transactions for demo
      setTransactions([
        { id: 'tx-001', userId: 'm1', userName: 'Johnatan Vallejo', amount: 500, currency: 'USD', method: 'PAYPAL', status: 'COMPLETED', date: Date.now() - 86400000, plan: 'ELITE' },
        { id: 'tx-002', userId: 'm1', userName: 'Johnatan Vallejo', amount: 150, currency: 'USD', method: 'NEQUI', status: 'PENDING', date: Date.now(), plan: 'PRO' }
      ]);
    }
  }, [currentUser]);

  const loadData = async () => {
    const data = await db_engine.project.findMany();
    setProjects(data as GeneratedWebsite[]);
  };

  const addLog = (m: string) => setLogs(p => [...p.slice(-60), `[${new Date().toLocaleTimeString()}] ${m}`]);

  const handleBuild = async () => {
    if (!command.trim()) return;
    setIsGenerating(true);
    addLog(`[Synthesis] Initializing V17.5 Monetary Bridge Synthesis...`);
    try {
      const result = await generateSiteByStack(command, activeStack);
      const newSite: GeneratedWebsite = {
        id: Math.random().toString(36).substr(2, 9),
        name: result.suggestedName,
        html: result.html,
        files: result.files,
        framework: activeStack,
        description: result.description,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isPublished: false,
        sizeKb: Math.round(JSON.stringify(result).length / 1024),
        dbSchema: result.dbSchema || { tables: [] }
      };
      await db_engine.project.upsert(newSite);
      setWebsite(newSite);
      loadData();
      addLog(`[Success] Neural Artifact Synthesized: ${newSite.name}`);
      setActiveView(AppView.PREVIEW);
    } catch (e) { addLog("[Error] Neural Buffer Overflow during synthesis."); }
    setIsGenerating(false);
  };

  const handleVerifyTransaction = (id: string, approve: boolean) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        if (approve && currentUser) {
          // Add balance to user
          setCurrentUser(u => u ? ({ ...u, balance: u.balance + t.amount }) : null);
          addLog(`[Admin] Transaction ${id} approved. User balance updated.`);
        }
        return { ...t, status: approve ? 'COMPLETED' : 'FAILED' };
      }
      return t;
    }));
  };

  const generateInvoice = (tx: Transaction) => {
    const invoiceContent = `
      =========================================
      UBT NEURAL NEXUS - MASTER INVOICE
      =========================================
      TRANS-ID: ${tx.id}
      DATE: ${new Date(tx.date).toLocaleDateString()}
      CLIENT: ${tx.userName}
      PLAN: ${tx.plan} MASTER
      AMOUNT: ${tx.amount} ${tx.currency}
      METHOD: ${tx.method}
      STATUS: ${tx.status}
      =========================================
      Property of Universal Business Technology
      Medellín Node Cluster
      =========================================
    `;
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `UBT-Nexus-Invoice-${tx.id}.txt`;
    link.click();
    addLog(`[System] Invoice generated for transaction ${tx.id}`);
  };

  if (!currentUser) {
    return (
      <div className="h-screen w-full bg-navy flex items-center justify-center p-10 relative overflow-hidden">
        <div className="absolute top-[-40%] left-[-20%] w-[1800px] h-[1800px] bg-kiwi/10 blur-[500px] animate-pulse"></div>
        <div className="glass-v2 p-24 rounded-[12rem] border border-white/10 text-center max-w-5xl z-10 animate-in zoom-in-95 duration-1000">
           <Processor size={200} className="text-[#fbff00] mx-auto mb-16 neon-pina floating" />
           <h1 className="text-[14rem] font-black text-white uppercase tracking-tighter mb-6 leading-none select-none">OMNI-NEXUS</h1>
           <p className="text-5xl text-slate-500 font-black uppercase tracking-[2em] mb-24">V17.5 MONETARY MASTER</p>
           <button onClick={() => {
              const profile: UserProfile = { uid: 'm1', displayName: 'Johnatan Vallejo', email: 'architect@ubt.dev', photoURL: 'https://github.com/john474nvll.png', role: 'ADMIN', plan: 'ELITE', location: 'Medellín Hub', balance: 5000, integrations: { githubToken: 'active' } };
              setCurrentUser(profile);
              localStorage.setItem('ubt_nexus_session', JSON.stringify(profile));
           }} className="w-full py-20 bg-gradient-to-r from-uva-neon via-pina-neon to-kiwi text-navy font-black uppercase text-6xl rounded-[8rem] shadow-4xl hover:scale-[1.04] transition-all">Engage Neural Hub</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-navy font-sans overflow-hidden select-none selection:bg-pina-neon/30">
      
      {/* Omni Sidebar V17.5 */}
      <aside className="w-[600px] border-r border-white/5 bg-navy/95 backdrop-blur-[250px] flex flex-col z-50 shadow-[0_0_150px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="p-20 border-b border-white/5">
          <div className="flex items-center gap-14 group cursor-pointer" onClick={() => setActiveView(AppView.DASHBOARD)}>
            <div className="w-32 h-32 rounded-[5rem] bg-navy-light border-4 border-pina-neon/50 flex items-center justify-center shadow-[0_0_120px_rgba(251,255,0,0.4)] group-hover:rotate-[360deg] transition-all duration-1000">
              <Bolt size={80} className="text-[#fbff00] neon-pina" />
            </div>
            <div>
              <h1 className="text-6xl font-black uppercase tracking-tighter text-white">NEXUS PRIME</h1>
              <span className="text-[16px] font-black uppercase tracking-[1em] text-kiwi">MASTER FORGE V17.5</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-16 space-y-28 scrollbar-hide">
          {NAV_GROUPS.map((group, idx) => {
            const visibleItems = group.items.filter((item: any) => !item.role || item.role === currentUser.role);
            if (visibleItems.length === 0) return null;
            return (
              <div key={idx} className="space-y-16">
                <h3 className="text-[20px] font-black uppercase tracking-[3em] text-slate-800 px-20">{group.title}</h3>
                <div className="space-y-8">
                  {visibleItems.map(item => (
                    <button key={item.id} onClick={() => setActiveView(item.id)} className={`w-full flex items-center justify-between px-20 py-12 rounded-[7rem] transition-all group ${activeView === item.id ? 'bg-[#fbff00] text-navy shadow-[0_50px_120px_-25px_rgba(251,255,0,0.7)] scale-[1.1]' : 'text-slate-600 hover:text-white hover:bg-white/5 hover:translate-x-6'}`}>
                      <div className="flex items-center gap-16">
                        <div className={activeView === item.id ? 'text-navy' : 'text-slate-800 group-hover:text-[#fbff00]'}>{item.icon}</div>
                        <span className="text-4xl font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                      {item.badge && activeView !== item.id && <span className="bg-uva-neon text-white text-[14px] font-black px-8 py-3 rounded-full uppercase tracking-tighter shadow-2xl">{item.badge}</span>}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="p-20 border-t border-white/5 bg-navy/40">
           <div className="flex items-center gap-14 bg-navy/30 p-12 rounded-[8rem] border-4 border-white/5 group hover:border-kiwi/60 transition-all cursor-pointer shadow-3xl">
              <img src={currentUser.photoURL} className="w-28 h-28 rounded-[5rem] border-4 border-pina-neon/40 group-hover:scale-125 transition-all shadow-2xl grayscale group-hover:grayscale-0" />
              <div className="flex-1 truncate">
                 <span className="block text-5xl font-black uppercase text-white truncate leading-none mb-4">{currentUser.displayName}</span>
                 <span className="block text-[16px] font-black text-kiwi uppercase tracking-[0.8em]">{currentUser.plan} ELITE</span>
              </div>
              <button onClick={() => { setCurrentUser(null); localStorage.removeItem('ubt_nexus_session'); }} className="p-10 bg-navy-light rounded-[3rem] text-slate-800 hover:text-frambuesa transition-all hover:scale-110 active:rotate-180"><LogOut size={48} /></button>
           </div>
        </div>
      </aside>

      {/* Main Node Node V17.5 */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden bg-[radial-gradient(circle_at_0%_100%,rgba(158,255,0,0.06),transparent_50%)]">
        
        {/* Global Taskbar V17.5 */}
        <header className="h-52 border-b border-white/5 px-40 flex items-center justify-between backdrop-blur-[300px] z-40 bg-navy/70 shadow-3xl">
          <div className="flex items-center gap-48">
            <h2 className="text-9xl font-black text-white uppercase tracking-tighter leading-none truncate max-w-[1000px]">{website.name}</h2>
            <div className="h-24 w-px bg-white/10"></div>
            <div className="flex gap-16">
               <TaskBtn icon={<Wallet />} label="Billing" color="hover:text-pina-neon" onClick={() => setActiveView(AppView.BILLING)} />
               <TaskBtn icon={<Code2 />} label="IDE" color="hover:text-uva-neon" onClick={() => setActiveView(AppView.CODE)} />
               <TaskBtn icon={<Database />} label="Vault" color="hover:text-kiwi" onClick={() => setActiveView(AppView.DATA_WAREHOUSE)} />
            </div>
          </div>
          <div className="flex items-center gap-24">
             <div className="px-24 py-10 bg-navy-light border-4 border-white/10 rounded-full flex items-center gap-10 shadow-3xl">
                <Processor size={32} className="text-kiwi animate-spin duration-[3000ms]" />
                <span className="text-[18px] font-black text-white uppercase tracking-[0.5em]">Monetary Link Stable</span>
             </div>
             <button onClick={handleBuild} className="px-48 py-14 bg-gradient-to-r from-vino-tinto via-uva-neon to-pina-neon text-navy rounded-full font-black uppercase text-4xl tracking-[1em] shadow-4xl hover:scale-110 active:scale-90 transition-all flex items-center gap-12 group">
               <Sparkles size={56} className="group-hover:rotate-180 transition-all duration-1000" /> FORGE
             </button>
          </div>
        </header>

        <div className="flex-1 p-32 flex flex-col overflow-hidden relative">
          
          {/* DASHBOARD V17.5 */}
          {activeView === AppView.DASHBOARD && (
             <div className="w-full max-w-[2400px] mx-auto space-y-40 animate-in zoom-in-95 duration-1000 pb-96 overflow-y-auto pr-20 scrollbar-hide px-20">
                <div className="grid grid-cols-4 gap-20">
                   <MasterStat icon={<Wallet />} label="Master Balance" val={`$${currentUser.balance}`} color="text-kiwi" />
                   <MasterStat icon={<History />} label="Transactions" val={transactions.length.toString()} color="text-uva-neon" />
                   <MasterStat icon={<Heartbeat />} label="Neural Load" val="3.8%" color="text-pina-neon" />
                   <MasterStat icon={<DatabaseZap />} label="Cluster" val="Active" color="text-[#a5f3fc]" />
                </div>

                <div className="grid grid-cols-2 gap-32 h-[900px]">
                   <div className="glass-v2 p-32 rounded-[14rem] border border-white/5 flex flex-col shadow-4xl relative group overflow-hidden">
                      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-kiwi opacity-5 blur-[250px]"></div>
                      <h3 className="text-8xl font-black text-white uppercase tracking-tighter mb-24 px-16">Payment Directory</h3>
                      <div className="flex-1 overflow-y-auto space-y-12 pr-12 scrollbar-hide px-16 pb-24">
                         {MASTER_ACCOUNTS.map(acc => (
                            <div key={acc.id} onClick={() => acc.isLink ? window.open(acc.val, '_blank') : navigator.clipboard.writeText(acc.val)} className="flex items-center justify-between p-20 bg-navy/40 rounded-[10rem] border-4 border-white/5 hover:border-pina-neon/70 transition-all cursor-pointer group shadow-3xl hover:scale-[1.04]">
                               <div className="flex items-center gap-20">
                                  <div className={`p-16 bg-navy-light rounded-[6rem] ${acc.color} group-hover:rotate-[360deg] transition-all duration-1000 shadow-2xl`}>{acc.icon}</div>
                                  <div>
                                     <h4 className="text-7xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-pina-neon transition-colors">{acc.name}</h4>
                                     <span className="text-slate-800 font-black text-[20px] uppercase tracking-widest">{acc.val} {acc.detail && `// ${acc.detail}`}</span>
                                  </div>
                               </div>
                               <div className="text-slate-900 group-hover:text-pina-neon transition-all">
                                 {acc.isLink ? <ExternalLink size={80} /> : <Copy size={80} />}
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>

                   <div className="glass-v2 p-32 rounded-[14rem] border border-white/5 flex flex-col shadow-4xl overflow-hidden relative">
                      <h3 className="text-7xl font-black text-white uppercase tracking-tighter mb-24 px-16">Recent Ledger</h3>
                      <div className="flex-1 overflow-y-auto space-y-12 pr-16 scrollbar-hide px-16">
                         {transactions.map(tx => (
                            <div key={tx.id} className="p-16 bg-navy/40 rounded-[8rem] border-2 border-white/5 flex items-center justify-between group hover:border-uva-neon transition-all">
                               <div className="flex items-center gap-14">
                                  <div className={`p-10 rounded-full ${tx.status === 'COMPLETED' ? 'bg-kiwi/10 text-kiwi' : 'bg-pina-neon/10 text-pina-neon'}`}>
                                    {tx.status === 'COMPLETED' ? <CheckCircle2 size={48} /> : <Clock size={48} />}
                                  </div>
                                  <div>
                                     <h5 className="text-5xl font-black text-white uppercase">{tx.plan} MASTER</h5>
                                     <span className="text-2xl text-slate-800 font-black uppercase">{new Date(tx.date).toLocaleDateString()} // {tx.id}</span>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <span className="block text-6xl font-black text-white">${tx.amount}</span>
                                  <button onClick={() => generateInvoice(tx)} className="text-2xl text-uva-neon font-black uppercase hover:text-white transition-all underline">Download Factura</button>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* BILLING MASTER VIEW V17.5 */}
          {activeView === AppView.BILLING && (
             <div className="w-full max-w-[2000px] mx-auto space-y-40 animate-in zoom-in-95 duration-1000 pb-96 overflow-y-auto pr-20 scrollbar-hide px-20">
                <div className="text-center py-20">
                   <h2 className="text-[16rem] font-black text-white uppercase tracking-tighter leading-none mb-6">Monetary Vault</h2>
                   <p className="text-5xl font-black uppercase tracking-[2.5em] text-slate-800">Choose your Neural Tier</p>
                </div>
                
                <div className="grid grid-cols-3 gap-24">
                   <PricingTier plan="LITE" price="49" features={['10 Artifacts/mo', 'Basic Neural Synthesis', 'GitHub Sync']} color="text-slate-400" />
                   <PricingTier plan="PRO" price="149" features={['50 Artifacts/mo', 'Advanced Bridge Forge', 'Priority Deployment', 'Figma Sync']} color="text-uva-neon" highlight />
                   <PricingTier plan="ELITE" price="499" features={['Unlimited Forging', 'Supreme Master Logic', 'Dedicated Medellín Node', 'Enterprise Ledger']} color="text-pina-neon" />
                </div>

                <div className="glass-v2 p-40 rounded-[15rem] border border-white/5 shadow-4xl text-center space-y-32">
                   <h3 className="text-8xl font-black text-white uppercase tracking-tighter">Transfer Node Directory</h3>
                   <p className="text-3xl font-black text-slate-800 uppercase tracking-widest">Select a method to recharge your credits manually or via direct bridge.</p>
                   <div className="grid grid-cols-4 gap-16">
                      {MASTER_ACCOUNTS.map(acc => (
                         <button key={acc.id} onClick={() => acc.isLink ? window.open(acc.val, '_blank') : alert("Copied to clipboard")} className="p-20 bg-navy/40 rounded-[10rem] border-4 border-white/5 hover:border-kiwi transition-all group shadow-3xl">
                            <div className={`${acc.color} mb-8 group-hover:scale-125 transition-transform flex justify-center`}>{React.cloneElement(acc.icon as any, { size: 120 })}</div>
                            <span className="block text-4xl font-black text-white uppercase tracking-tighter">{acc.name}</span>
                         </button>
                      ))}
                   </div>
                   <div className="p-24 bg-navy-light rounded-[10rem] border-4 border-vino-neon/20 flex items-center justify-between">
                      <div className="flex items-center gap-16">
                         <AlertTriangle size={80} className="text-vino-neon animate-pulse" />
                         <div className="text-left">
                            <h4 className="text-5xl font-black text-white uppercase">Manual Verification Required</h4>
                            <p className="text-2xl font-black text-slate-800 uppercase tracking-widest">For Bank Transfers (Nequi, Bancolombia, Nu), please send the screenshot to Support.</p>
                         </div>
                      </div>
                      <button className="px-16 py-8 bg-uva-neon text-white rounded-full font-black uppercase text-4xl tracking-widest shadow-4xl">Message Support</button>
                   </div>
                </div>
             </div>
          )}

          {/* ADMIN PAYMENT MASTER V17.5 */}
          {activeView === AppView.ADMIN && (
             <div className="w-full max-w-[2400px] mx-auto space-y-40 animate-in zoom-in-95 duration-1000 pb-96 overflow-y-auto pr-20 scrollbar-hide px-20">
                <div className="flex items-center justify-between py-20">
                   <div>
                      <h2 className="text-[14rem] font-black text-white uppercase tracking-tighter leading-none mb-4">Payment Master</h2>
                      <p className="text-5xl font-black uppercase tracking-[2.5em] text-slate-800">Master Verification Protocol</p>
                   </div>
                   <div className="flex gap-20">
                      <MasterStat icon={<TrendingUp />} label="Total Revenue" val="$128K" color="text-kiwi" />
                      <MasterStat icon={<Users />} label="Paying Users" val="842" color="text-uva-neon" />
                   </div>
                </div>

                <div className="glass-v2 p-32 rounded-[15rem] border border-white/5 shadow-4xl">
                   <h3 className="text-7xl font-black text-white uppercase tracking-tighter mb-24 px-16">Pending Verifications</h3>
                   <div className="space-y-16">
                      {transactions.filter(t => t.status === 'PENDING').map(tx => (
                         <div key={tx.id} className="p-24 bg-navy/40 rounded-[12rem] border-4 border-white/5 flex items-center justify-between group hover:border-pina-neon/50 transition-all">
                            <div className="flex items-center gap-20">
                               <img src="https://github.com/john474nvll.png" className="w-32 h-32 rounded-full border-4 border-white/10" />
                               <div>
                                  <h4 className="text-6xl font-black text-white uppercase">{tx.userName}</h4>
                                  <p className="text-3xl text-slate-700 font-black uppercase tracking-widest">{tx.method} // ${tx.amount} ${tx.currency} // {tx.id}</p>
                               </div>
                            </div>
                            <div className="flex gap-12">
                               <button onClick={() => handleVerifyTransaction(tx.id, false)} className="px-12 py-6 border-4 border-frambuesa text-frambuesa rounded-full font-black uppercase text-3xl hover:bg-frambuesa hover:text-white transition-all">Reject Node</button>
                               <button onClick={() => handleVerifyTransaction(tx.id, true)} className="px-24 py-10 bg-kiwi text-navy rounded-full font-black uppercase text-5xl tracking-widest shadow-4xl hover:scale-110 transition-all">Approve Credits</button>
                            </div>
                         </div>
                      ))}
                      {transactions.filter(t => t.status === 'PENDING').length === 0 && <div className="py-40 text-center text-slate-900 text-9xl font-black uppercase opacity-10 tracking-[1em]">Ledger Clear</div>}
                   </div>
                </div>
             </div>
          )}

          {/* OMNI-BUILDER PREVIEW (FALLBACK) */}
          {activeView === AppView.PREVIEW && (
             <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in-95 duration-1000 relative pb-80">
                <div className="w-full h-full max-w-[2600px] rounded-[12rem] border-[60px] border-navy shadow-4xl overflow-hidden glass-v2 relative flex flex-col">
                   <PreviewFrame html={website.html} />
                   
                   {/* Synthesis Simulation V17.5 */}
                   {isGenerating && (
                      <div className="absolute inset-0 bg-navy/98 backdrop-blur-[400px] flex flex-col items-center justify-center z-50">
                         <div className="relative mb-80">
                            <div className="absolute inset-0 bg-kiwi/60 blur-[600px] rounded-full animate-pulse"></div>
                            <div className="w-[850px] h-[850px] border-[50px] border-white/5 border-t-kiwi rounded-full animate-spin"></div>
                            <Processor size={400} className="absolute inset-0 m-auto text-kiwi neon-pina animate-bounce" />
                         </div>
                         <h2 className="text-[25rem] font-black text-white uppercase tracking-[2.5em] animate-pulse leading-none select-none">FORGING</h2>
                         <p className="text-8xl text-kiwi font-black uppercase tracking-[4em] animate-pulse mt-64">Synthesis Phase 5: Monetary Node Sync...</p>
                      </div>
                   )}
                </div>

                <div className="absolute bottom-32 w-full max-w-[2400px] px-24 z-50">
                   <div className="glass-v2 p-20 rounded-[12rem] border-[10px] border-white/10 flex items-center shadow-4xl group focus-within:border-kiwi/100 transition-all duration-1000 scale-[1.15]">
                      <div className="p-20 bg-navy-light rounded-[8rem] mr-24 shadow-4xl transition-transform group-focus-within:scale-140 group-focus-within:rotate-12 border-4 border-kiwi/10"><Sparkles size={250} className="text-kiwi neon-pina" /></div>
                      <input 
                        value={command} 
                        onChange={e => setCommand(e.target.value)} 
                        onKeyDown={e => e.key === 'Enter' && handleBuild()} 
                        placeholder="Master Neural Directive..." 
                        className="bg-transparent flex-1 outline-none text-[12rem] font-black text-white placeholder:text-slate-900 tracking-tighter" 
                      />
                      <button onClick={handleBuild} className="ml-24 px-96 h-96 bg-gradient-to-r from-kiwi via-uva-neon to-pina-neon text-navy rounded-[10rem] font-black uppercase text-[10rem] tracking-[1.5em] shadow-4xl hover:scale-[1.08] transition-all">FORGE</button>
                   </div>
                </div>
             </div>
          )}

          {/* FALLBACK FOR OTHERS */}
          {(activeView === AppView.CODE || activeView === AppView.DB_MANAGER || activeView === AppView.DATA_WAREHOUSE) && (
             <div className="flex-1 flex flex-col items-center justify-center opacity-50">
                <Processor size={200} className="text-white mb-12 animate-spin duration-[20s]" />
                <h3 className="text-9xl font-black text-white uppercase tracking-tighter">Module Synchronizing...</h3>
                <p className="text-4xl text-slate-800 font-black uppercase tracking-[1em]">V17.5 Monetary Bridge Priority</p>
                <button onClick={() => setActiveView(AppView.DASHBOARD)} className="mt-20 px-16 py-8 bg-white/5 rounded-full text-white font-black uppercase text-2xl tracking-widest hover:bg-white/10 transition-all">Return to Core</button>
             </div>
          )}

        </div>

        {/* Global Footer Taskbar V17.5 */}
        <footer className="h-[28rem] border-t border-white/5 px-40 flex items-center justify-between z-50 bg-navy/98 backdrop-blur-[350px] relative shadow-[0_-100px_200px_rgba(0,0,0,1)]">
           <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-kiwi/80 to-transparent shadow-[0_0_80px_#9eff00]"></div>
           <div className="flex items-center gap-120">
              <div className="flex flex-col">
                 <span className="text-[32px] font-black uppercase tracking-[4em] text-kiwi mb-14">Universal Business Technology Neural Architect Master Node</span>
                 <h3 className="text-[12rem] font-black text-white uppercase tracking-widest leading-none select-none">Omni-Nexus // V17.5 Master Protocol</h3>
              </div>
           </div>
           <div className="flex items-center gap-80 text-right">
              <div className="space-y-6">
                 <span className="block text-[28px] font-black uppercase tracking-[3em] text-slate-800">Chief Master Architect Medellín Node Cluster</span>
                 <span className="block text-[14rem] font-black uppercase tracking-widest leading-none select-none" style={{ background: 'linear-gradient(to right, #9eff00, #af00ff, #fbff00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Johnatan Vallejo M.</span>
              </div>
              <img src="https://github.com/john474nvll.png" className="w-80 h-80 rounded-[12rem] border-[16px] border-white/5 shadow-4xl scale-140 hover:rotate-[360deg] transition-all duration-[2000ms] cursor-pointer active:scale-175 ring-8 ring-kiwi/10" />
           </div>
        </footer>
      </main>
    </div>
  );
};

// V17.5 Monetary Components
const PricingTier = ({ plan, price, features, color, highlight }: any) => (
  <div className={`glass-v2 p-32 rounded-[16rem] border-4 flex flex-col items-center text-center group hover:scale-105 transition-all shadow-4xl ${highlight ? 'border-uva-neon shadow-[0_0_150px_rgba(175,0,255,0.2)]' : 'border-white/5'}`}>
     <h4 className={`text-6xl font-black uppercase tracking-tighter mb-4 ${color}`}>{plan} NODE</h4>
     <div className="flex items-baseline gap-4 mb-20">
        <span className="text-[12rem] font-black text-white leading-none">${price}</span>
        <span className="text-4xl font-black text-slate-800 uppercase tracking-widest">/mo</span>
     </div>
     <div className="space-y-6 flex-1 mb-24">
        {features.map((f: string, i: number) => (
           <div key={i} className="flex items-center gap-10 justify-center">
              <Check size={32} className={color} />
              <span className="text-3xl font-black text-slate-500 uppercase tracking-widest">{f}</span>
           </div>
        ))}
     </div>
     <button className={`w-full py-12 rounded-[6rem] font-black uppercase text-4xl tracking-widest transition-all ${highlight ? 'bg-uva-neon text-white shadow-4xl' : 'bg-white/5 text-white hover:bg-white/10'}`}>Select Protocol</button>
  </div>
);

const MasterStat = ({ icon, label, val, color }: any) => (
  <div className="glass-v2 p-24 rounded-[12rem] border border-white/5 flex flex-col items-center justify-center text-center group hover:scale-[1.1] transition-all duration-1000 shadow-4xl relative overflow-hidden">
     <div className={`p-16 bg-navy-light rounded-[7rem] ${color} mb-14 shadow-4xl transition-transform group-hover:rotate-[360deg] duration-[1500ms]`}>{React.cloneElement(icon, { size: 100 })}</div>
     <span className="block text-[28px] font-black uppercase tracking-[2.5em] text-slate-800 mb-10">{label}</span>
     <span className="block text-[10rem] font-black text-white tracking-tighter uppercase leading-none">{val}</span>
  </div>
);

const TaskBtn = ({ icon, label, color, onClick }: any) => (
  <button onClick={onClick} className={`group flex flex-col items-center gap-8 transition-all ${color} relative`}>
     <div className="p-12 bg-navy-light rounded-[3rem] group-hover:bg-white/15 group-hover:scale-140 transition-all shadow-3xl">{React.cloneElement(icon as any, { size: 56 })}</div>
     <span className="text-[16px] font-black uppercase tracking-[0.8em] opacity-0 group-hover:opacity-100 transition-opacity absolute top-36 bg-navy/95 p-4 rounded-2xl whitespace-nowrap border-2 border-white/10 z-50 shadow-2xl">{label}</span>
  </button>
);

export default App;
