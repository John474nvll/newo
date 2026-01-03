
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
  Activity as Heartbeat, Cpu as Processor, Server as CloudServer, Radio, Wifi, Sliders, HardDrive as Disk, Zap as Power
} from 'lucide-react';
import JSZip from 'jszip';
import { AppView, GeneratedWebsite, Framework, UserProfile, SubscriptionPlan, Transaction, PaymentMethod, BillingCycle, ProjectFile } from './types';
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
      { id: AppView.PREVIEW, label: "Omni-Builder", icon: <Bolt size={20} />, badge: "V17.0" },
      { id: AppView.SYSTEM_MONITOR, label: "System Health", icon: <Heartbeat size={20} /> },
    ]
  },
  {
    title: "Forge & Bridges",
    items: [
      { id: AppView.CODE, label: "Nebula IDE Pro", icon: <Code2 size={20} /> },
      { id: AppView.FIGMA_SYNC, label: "Figma Sync", icon: <Figma size={20} /> },
      { id: AppView.API_CONNECTORS, label: "External APIs", icon: <Webhook size={20} /> },
      { id: AppView.DB_MANAGER, label: "Schema Forge", icon: <DBIcon size={20} /> },
    ]
  },
  {
    title: "Deployment",
    items: [
      { id: AppView.DEPLOY_MANAGER, label: "Cloud Ship", icon: <Rocket size={20} /> },
      { id: AppView.DATA_WAREHOUSE, label: "Artifact Vault", icon: <Database size={20} /> },
    ]
  },
  {
    title: "Finances & Master",
    items: [
      { id: AppView.BILLING, label: "Monetary Vault", icon: <BadgeDollarSign size={20} /> },
      { id: AppView.ADMIN, label: "System Master", icon: <Shield size={20} />, role: 'ADMIN' },
      { id: AppView.SETTINGS, label: "Node Config", icon: <Settings2 size={20} /> },
    ]
  }
];

const API_PRESETS = [
  { id: 'openai', name: 'OpenAI GPT-4o', icon: <Brain />, status: 'Active', color: 'text-kiwi' },
  { id: 'anthropic', name: 'Claude 3.5', icon: <Cpu />, status: 'Standby', color: 'text-uva-neon' },
  { id: 'huggingface', name: 'HuggingFace', icon: <Layers />, status: 'Inactive', color: 'text-slate-500' },
  { id: 'stripe', name: 'Stripe Gateway', icon: <CreditCard />, status: 'Active', color: 'text-pina-neon' },
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [activeStack, setActiveStack] = useState<Framework>('nextjs');
  const [isGenerating, setIsGenerating] = useState(false);
  const [command, setCommand] = useState('');
  const [projects, setProjects] = useState<GeneratedWebsite[]>([]);
  const [logs, setLogs] = useState<string[]>(["[Kernel] Omni-Nexus V17.0 Master Protocol Engaged.", "[Bridges] All neural pathways stabilized."]);
  const [activeFile, setActiveFile] = useState<string>('index.html');
  const [sysHealth, setSysHealth] = useState({ cpu: 8, ram: 34, latency: 45, throughput: 1.2, disk: 18 });
  const [deployStep, setDeployStep] = useState(0);
  
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ubt_nexus_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [website, setWebsite] = useState<GeneratedWebsite>({
    id: 'master-node',
    name: 'Omni-Nexus Master Artifact',
    html: '<html><body style="background:#000814;color:white;display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;text-transform:uppercase;letter-spacing:1em"><h1>Omni-Nexus V17.0</h1></body></html>',
    files: [{ name: 'index.html', path: 'index.html', content: '<html><body><h1>Master V17</h1></body></html>', language: 'html' }],
    framework: 'nextjs',
    description: 'Master Synthesis initialization.',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isPublished: false
  });

  useEffect(() => {
    if (currentUser) {
      loadData();
      const interval = setInterval(() => {
        setSysHealth(prev => ({
          cpu: Math.floor(Math.random() * 15) + 5,
          ram: Math.floor(Math.random() * 5) + 30,
          latency: Math.floor(Math.random() * 20) + 30,
          throughput: Number((Math.random() * 2 + 1).toFixed(1)),
          disk: prev.disk
        }));
      }, 4000);
      return () => clearInterval(interval);
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
    addLog(`[Synthesis] Initiating Master Forge Synthesis Protocol...`);
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
        sizeKb: Math.round(JSON.stringify(result).length / 1024)
      };
      await db_engine.project.upsert(newSite);
      setWebsite(newSite);
      loadData();
      addLog(`[Success] Master Artifact Stabilized: ${newSite.name}`);
      setActiveView(AppView.PREVIEW);
    } catch (e) { addLog("[Error] Neural Buffer Overflow during synthesis."); }
    setIsGenerating(false);
  };

  const startDeployment = () => {
    setDeployStep(1);
    addLog("[Deploy] Initiating Cloud Ship Protocol...");
    setTimeout(() => {
      setDeployStep(2);
      addLog("[Deploy] Provisioning Edge Node on Vercel Cluster...");
      setTimeout(() => {
        setDeployStep(3);
        addLog("[Deploy] Propagating Neural Artifact to Global CDNs...");
        setTimeout(() => {
          setDeployStep(4);
          const url = `https://${website.name.toLowerCase().replace(/\s/g, '-')}.nexus.dev`;
          setWebsite(prev => ({ ...prev, deployUrl: url, isPublished: true }));
          addLog(`[Success] Artifact Live at: ${url}`);
        }, 3000);
      }, 2500);
    }, 2000);
  };

  if (!currentUser) {
    return (
      <div className="h-screen w-full bg-navy flex items-center justify-center p-10 relative overflow-hidden">
        <div className="absolute top-[-40%] left-[-20%] w-[1800px] h-[1800px] bg-kiwi/10 blur-[500px] animate-pulse"></div>
        <div className="glass-v2 p-24 rounded-[12rem] border border-white/10 text-center max-w-5xl z-10 animate-in zoom-in-95 duration-1000 shadow-[0_150px_300px_-50px_rgba(0,0,0,1)]">
           <Processor size={200} className="text-[#fbff00] mx-auto mb-16 neon-pina floating" />
           <h1 className="text-[14rem] font-black text-white uppercase tracking-tighter mb-6 leading-none select-none">OMNI-NEXUS</h1>
           <p className="text-5xl text-slate-500 font-black uppercase tracking-[2em] mb-24">V17.0 MASTER FORGE</p>
           <button onClick={() => {
              const profile: UserProfile = { uid: 'm1', displayName: 'Vallejo Architect', email: 'architect@ubt.dev', photoURL: 'https://github.com/john474nvll.png', role: 'ADMIN', plan: 'ELITE', location: 'Medellín Nexus Hub', balance: 12500, transactions: [], integrations: { vercelToken: 'active' } };
              setCurrentUser(profile);
              localStorage.setItem('ubt_nexus_session', JSON.stringify(profile));
           }} className="w-full py-20 bg-gradient-to-r from-uva-neon via-pina-neon to-kiwi text-navy font-black uppercase text-6xl rounded-[8rem] shadow-[0_60px_200px_-40px_rgba(251,255,0,0.7)] hover:scale-[1.04] active:scale-95 transition-all">Engage Neural Hub</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-navy font-sans overflow-hidden select-none selection:bg-pina-neon/30 selection:text-pina-neon">
      
      {/* Omni Sidebar V17 */}
      <aside className="w-[600px] border-r border-white/5 bg-navy/95 backdrop-blur-[250px] flex flex-col z-50 shadow-[0_0_150px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-pina-neon opacity-5 blur-[100px]"></div>
        <div className="p-20 border-b border-white/5 relative">
          <div className="flex items-center gap-14 group cursor-pointer" onClick={() => setActiveView(AppView.DASHBOARD)}>
            <div className="w-32 h-32 rounded-[5rem] bg-navy-light border-4 border-pina-neon/50 flex items-center justify-center shadow-[0_0_120px_rgba(251,255,0,0.4)] group-hover:rotate-[360deg] transition-all duration-1000">
              <Bolt size={80} className="text-[#fbff00] neon-pina" />
            </div>
            <div>
              <h1 className="text-6xl font-black uppercase tracking-tighter text-white">NEXUS PRIME</h1>
              <span className="text-[16px] font-black uppercase tracking-[1em] text-kiwi">MASTER FORGE V17</span>
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

      {/* Main OS Layer V17 */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden bg-[radial-gradient(circle_at_0%_100%,rgba(158,255,0,0.06),transparent_50%)]">
        
        {/* Global Taskbar V17 */}
        <header className="h-52 border-b border-white/5 px-40 flex items-center justify-between backdrop-blur-[300px] z-40 bg-navy/70 shadow-3xl relative">
          <div className="flex items-center gap-48">
            <div className="flex flex-col">
              <span className="text-[14px] font-black text-slate-800 uppercase tracking-[1.5em] mb-2">Workspace Node</span>
              <h2 className="text-9xl font-black text-white uppercase tracking-tighter leading-none truncate max-w-[1000px] group cursor-default">
                {website.name} <span className="text-pina-neon opacity-0 group-hover:opacity-100 transition-opacity">_</span>
              </h2>
            </div>
            <div className="h-24 w-px bg-white/10"></div>
            <div className="flex gap-16">
               <TaskBtn icon={<Download />} label="Export" color="hover:text-pina-neon" />
               <TaskBtn icon={<Github />} label="Git Forge" color="hover:text-kiwi" onClick={() => setActiveView(AppView.CODE)} />
               <TaskBtn icon={<Figma />} label="Figma Sync" color="hover:text-uva-neon" onClick={() => setActiveView(AppView.FIGMA_SYNC)} />
               <TaskBtn icon={<Globe2 />} label="Go Live" color="hover:text-[#a5f3fc]" onClick={() => setActiveView(AppView.DEPLOY_MANAGER)} />
            </div>
          </div>
          
          <div className="flex items-center gap-24">
             <div className="px-24 py-10 bg-navy-light border-4 border-white/10 rounded-full flex items-center gap-10 shadow-3xl group hover:border-uva-neon/50 transition-all cursor-help">
                <Processor size={32} className="text-uva-neon animate-spin duration-[3000ms]" />
                <div className="flex flex-col">
                   <span className="text-[18px] font-black text-white uppercase tracking-[0.8em]">Omni Engine</span>
                   <span className="text-[12px] font-black text-kiwi uppercase">Syncing Node Medellín</span>
                </div>
             </div>
             <button onClick={handleBuild} className="px-48 py-14 bg-gradient-to-r from-vino-tinto via-uva-neon to-pina-neon text-white rounded-full font-black uppercase text-4xl tracking-[1em] shadow-[0_40px_180px_-40px_rgba(175,0,255,1)] hover:scale-110 active:scale-90 transition-all flex items-center gap-12 group">
               <Sparkles size={56} className="group-hover:rotate-180 transition-all duration-1000" /> FORGE
             </button>
          </div>
        </header>

        <div className="flex-1 p-32 flex flex-col overflow-hidden relative">
          
          {/* DASHBOARD V17 */}
          {activeView === AppView.DASHBOARD && (
             <div className="w-full max-w-[2400px] mx-auto space-y-40 animate-in zoom-in-95 duration-1000 pb-96 overflow-y-auto pr-20 scrollbar-hide px-20">
                <div className="grid grid-cols-4 gap-20">
                   <MasterStat icon={<Layers />} label="Forge Artifacts" val={projects.length.toString()} color="text-uva-neon" />
                   <MasterStat icon={<Heartbeat />} label="Neural Load" val={`${sysHealth.cpu}%`} color="text-pina-neon" />
                   <MasterStat icon={<Radio />} label="Network Latency" val={`${sysHealth.latency}ms`} color="text-kiwi" />
                   <MasterStat icon={<DatabaseZap />} label="Node Storage" val={`${sysHealth.ram}%`} color="text-[#a5f3fc]" />
                </div>

                <div className="grid grid-cols-2 gap-32 h-[1000px]">
                   <div className="glass-v2 p-32 rounded-[14rem] border border-white/5 flex flex-col shadow-4xl relative group overflow-hidden">
                      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-uva-neon opacity-5 blur-[250px]"></div>
                      <div className="flex items-center justify-between mb-24 px-16">
                         <h3 className="text-8xl font-black text-white uppercase tracking-tighter">Cluster Archive</h3>
                         <button onClick={() => setActiveView(AppView.DATA_WAREHOUSE)} className="px-16 py-6 bg-navy-light rounded-full text-[20px] font-black text-slate-800 uppercase tracking-widest hover:text-pina-neon transition-all">Vault Access</button>
                      </div>
                      <div className="flex-1 overflow-y-auto space-y-12 pr-12 scrollbar-hide px-16 pb-24">
                         {projects.map(p => (
                            <div key={p.id} onClick={() => { setWebsite(p); setActiveView(AppView.PREVIEW); }} className="flex items-center justify-between p-20 bg-navy/40 rounded-[10rem] border-4 border-white/5 hover:border-pina-neon/70 transition-all cursor-pointer group shadow-3xl hover:scale-[1.04]">
                               <div className="flex items-center gap-20">
                                  <div className="p-16 bg-navy-light rounded-[6rem] text-uva-neon group-hover:rotate-[360deg] transition-all duration-1000 shadow-2xl"><BoxSelect size={80} /></div>
                                  <div>
                                     <h4 className="text-7xl font-black text-white uppercase tracking-tighter mb-6 group-hover:text-pina-neon transition-colors">{p.name}</h4>
                                     <div className="flex items-center gap-14">
                                        <span className="px-8 py-3 bg-white/5 rounded-full text-[20px] font-black text-slate-700 uppercase tracking-[0.5em]">{p.framework}</span>
                                        <span className="text-kiwi font-black text-[20px] uppercase">{p.sizeKb} KB</span>
                                     </div>
                                  </div>
                               </div>
                               <ArrowRight size={100} className="text-slate-900 group-hover:text-pina-neon group-hover:translate-x-8 transition-all" />
                            </div>
                         ))}
                         {!projects.length && <div className="py-80 text-center text-slate-900 text-9xl font-black uppercase tracking-[1.5em] opacity-10">Empty Cluster</div>}
                      </div>
                   </div>

                   <div className="glass-v2 p-32 rounded-[14rem] border border-white/5 flex flex-col shadow-4xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                      <h3 className="text-7xl font-black text-white uppercase tracking-tighter mb-24 px-16 flex items-center gap-10">
                        <Console size={64} className="text-pina-neon" /> Omni-Terminal
                      </h3>
                      <div className="flex-1 overflow-y-auto space-y-14 pr-16 scrollbar-hide font-mono text-4xl pl-16 border-l-[12px] border-white/5 pb-24">
                         {logs.slice().reverse().map((l, i) => (
                           <div key={i} className="flex gap-16 border-l-[12px] border-transparent hover:border-uva-neon pl-16 pb-16 transition-all group">
                              <span className="text-slate-900 group-hover:text-uva-neon transition-colors select-none">#</span>
                              <p className="text-slate-700 group-hover:text-slate-200 transition-colors whitespace-pre-wrap leading-relaxed">{l}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* OMNI-BUILDER V17 */}
          {activeView === AppView.PREVIEW && (
             <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in-95 duration-1000 relative pb-80">
                <div className="w-full h-full max-w-[2600px] rounded-[12rem] border-[60px] border-navy shadow-[0_500px_1200px_-250px_rgba(0,0,0,1)] overflow-hidden glass-v2 relative flex flex-col group">
                   <PreviewFrame html={website.html} />
                   
                   {/* Intelligent Master Overlay */}
                   <div className="absolute top-20 left-20 space-y-16 z-30 group-hover:translate-x-4 transition-all duration-700">
                      <PaletteItem icon={<ShoppingCart />} label="Omni-Market" type="COMMERCE" />
                      <PaletteItem icon={<BarChart3 />} label="Revenue Matrix" type="FINANCE" />
                      <PaletteItem icon={<Lock />} label="Guard V17" type="SECURITY" />
                      <div className="h-px w-full bg-white/10 my-16"></div>
                      <PaletteItem icon={<CloudServer />} label="Deploy Now" type="CLOUD" onClick={() => setActiveView(AppView.DEPLOY_MANAGER)} highlight />
                   </div>

                   {/* Synthesis Master Simulation V17 */}
                   {isGenerating && (
                      <div className="absolute inset-0 bg-navy/98 backdrop-blur-[400px] flex flex-col items-center justify-center z-50">
                         <div className="relative mb-80">
                            <div className="absolute inset-0 bg-pina-neon/60 blur-[600px] rounded-full animate-pulse"></div>
                            <div className="w-[850px] h-[850px] border-[50px] border-white/5 border-t-pina-neon rounded-full animate-spin duration-[2000ms]"></div>
                            <Processor size={400} className="absolute inset-0 m-auto text-pina-neon neon-pina animate-bounce" />
                         </div>
                         <h2 className="text-[25rem] font-black text-white uppercase tracking-[2.5em] animate-pulse leading-none select-none">FORGING</h2>
                         <p className="text-8xl text-kiwi font-black uppercase tracking-[4em] animate-pulse mt-64">Master Neural Synthesis Engaged...</p>
                         <div className="mt-32 w-[1200px] h-6 bg-white/5 rounded-full overflow-hidden shadow-2xl">
                            <div className="h-full bg-pina-neon w-1/3 animate-[progress_15s_linear_infinite] shadow-[0_0_40px_#fbff00]"></div>
                         </div>
                      </div>
                   )}
                </div>

                {/* Master Quantum Prompt V17 */}
                <div className="absolute bottom-32 w-full max-w-[2400px] px-24 z-50">
                   <div className="glass-v2 p-20 rounded-[12rem] border-[10px] border-white/10 flex items-center shadow-[0_400px_800px_-150px_rgba(0,0,0,1)] group focus-within:border-pina-neon/100 transition-all duration-1000 scale-[1.15]">
                      <div className="p-20 bg-navy-light rounded-[8rem] mr-24 shadow-4xl transition-transform group-focus-within:scale-140 group-focus-within:rotate-12 border-4 border-pina-neon/10"><Sparkles size={250} className="text-pina-neon neon-pina" /></div>
                      <input 
                        value={command} 
                        onChange={e => setCommand(e.target.value)} 
                        onKeyDown={e => e.key === 'Enter' && handleBuild()} 
                        placeholder="Neural Architect Directive..." 
                        className="bg-transparent flex-1 outline-none text-[12rem] font-black text-white placeholder:text-slate-900 tracking-tighter" 
                      />
                      <button onClick={handleBuild} disabled={isGenerating || !command.trim()} className="ml-24 px-96 h-96 bg-gradient-to-r from-vino-tinto via-uva-neon to-kiwi text-navy rounded-[10rem] font-black uppercase text-[10rem] tracking-[1.5em] shadow-[0_60px_250px_-50px_rgba(251,255,0,0.9)] hover:scale-[1.08] active:scale-90 disabled:opacity-20 transition-all duration-1000">SYNTH</button>
                   </div>
                </div>
             </div>
          )}

          {/* SYSTEM MONITOR V17 */}
          {activeView === AppView.SYSTEM_MONITOR && (
             <div className="w-full max-w-[2200px] mx-auto space-y-40 animate-in zoom-in-95 duration-1000 pb-96 overflow-y-auto pr-20 scrollbar-hide px-20">
                <div className="text-center py-20">
                   <h2 className="text-[14rem] font-black text-white uppercase tracking-tighter leading-none mb-6">System Health</h2>
                   <p className="text-5xl font-black uppercase tracking-[2.5em] text-slate-800">Real-time Node Telemetry</p>
                </div>
                <div className="grid grid-cols-2 gap-24">
                   <HealthStat icon={<Processor />} label="CPU Utilization" val={`${sysHealth.cpu}%`} detail="Optimized Cluster" color="text-kiwi" />
                   <HealthStat icon={<Disk />} label="Memory Node" val={`${sysHealth.ram}%`} detail="32GB Neural Buffer" color="text-uva-neon" />
                   <HealthStat icon={<Wifi />} label="Latency Path" val={`${sysHealth.latency}ms`} detail="Medellín Core Node" color="text-pina-neon" />
                   <HealthStat icon={<Power />} label="Throughput" val={`${sysHealth.throughput} GB/s`} detail="Omni-Bandwidth" color="text-[#a5f3fc]" />
                </div>
             </div>
          )}

          {/* ARTIFACT VAULT V17 */}
          {activeView === AppView.DATA_WAREHOUSE && (
             <div className="w-full max-w-[2400px] mx-auto space-y-32 animate-in slide-in-from-right-40 duration-1000 pb-96 overflow-y-auto pr-20 scrollbar-hide px-20">
                <div className="flex items-center justify-between py-16">
                   <h2 className="text-[10rem] font-black text-white uppercase tracking-tighter leading-none">Artifact Vault</h2>
                   <div className="flex gap-10">
                      <button onClick={loadData} className="p-10 bg-navy-light rounded-full text-kiwi hover:rotate-180 transition-all duration-1000 shadow-3xl"><RefreshCw size={50} /></button>
                   </div>
                </div>
                <div className="grid grid-cols-3 gap-16">
                   {projects.map(p => (
                      <div key={p.id} className="glass-v2 p-20 rounded-[10rem] border border-white/5 hover:border-uva-neon/50 transition-all group shadow-4xl cursor-pointer" onClick={() => { setWebsite(p); setActiveView(AppView.PREVIEW); }}>
                         <div className="h-80 bg-navy-light rounded-[8rem] mb-12 flex items-center justify-center relative overflow-hidden">
                            <BoxSelect size={120} className="text-white/10 group-hover:scale-150 group-hover:text-uva-neon/20 transition-all duration-1000" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-navy/60 backdrop-blur-md">
                               <span className="text-3xl font-black text-white uppercase tracking-widest">Restore Artifact</span>
                            </div>
                         </div>
                         <h4 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 truncate">{p.name}</h4>
                         <div className="flex justify-between items-center">
                            <span className="text-2xl font-black text-slate-800 uppercase tracking-widest">{p.framework} Node</span>
                            <span className="text-2xl font-black text-kiwi uppercase">{p.sizeKb} KB</span>
                         </div>
                      </div>
                   ))}
                   {projects.length === 0 && <div className="col-span-3 py-80 text-center text-slate-900 text-8xl font-black uppercase tracking-[1em] opacity-20">Warehouse Empty</div>}
                </div>
             </div>
          )}

          {/* MONETARY VAULT V17 */}
          {activeView === AppView.BILLING && (
             <div className="w-full max-w-[2000px] mx-auto space-y-40 animate-in zoom-in-95 duration-1000 pb-96 overflow-y-auto pr-20 scrollbar-hide px-20">
                <div className="text-center py-20">
                   <h2 className="text-[14rem] font-black text-white uppercase tracking-tighter leading-none mb-6">Monetary Node</h2>
                   <p className="text-5xl font-black uppercase tracking-[2.5em] text-slate-800">Financial Neural Credits</p>
                </div>
                <div className="grid grid-cols-2 gap-24">
                   <div className="glass-v2 p-32 rounded-[14rem] border border-white/5 shadow-4xl flex flex-col items-center text-center group hover:scale-[1.02] transition-all">
                      <Wallet size={150} className="text-pina-neon mb-12 group-hover:rotate-12 transition-transform" />
                      <h3 className="text-6xl font-black text-white uppercase tracking-tighter mb-4">Master Balance</h3>
                      <span className="text-[12rem] font-black text-kiwi leading-none mb-10">${currentUser.balance.toLocaleString()}</span>
                      <button className="w-full py-12 bg-gradient-to-r from-vino-tinto to-uva-neon text-white rounded-[6rem] font-black uppercase text-4xl tracking-widest hover:scale-105 transition-all">Recharge Credits</button>
                   </div>
                   <div className="glass-v2 p-32 rounded-[14rem] border border-white/5 shadow-4xl flex flex-col justify-between">
                      <div className="space-y-12">
                         <h3 className="text-6xl font-black text-white uppercase tracking-tighter px-10">Neural Plan</h3>
                         <div className="bg-navy-light p-16 rounded-[10rem] border-4 border-kiwi/20 text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 bg-kiwi text-navy font-black uppercase text-2xl group-hover:scale-125 transition-all">Active</div>
                            <span className="block text-[20px] font-black text-slate-600 uppercase tracking-widest mb-4">Current Tier</span>
                            <span className="block text-[8rem] font-black text-white uppercase tracking-tighter leading-none">{currentUser.plan}</span>
                            <p className="text-3xl text-kiwi font-black uppercase tracking-widest mt-10">Infinite Processing Enabled</p>
                         </div>
                      </div>
                      <button className="w-full py-12 border-4 border-white/10 rounded-[6rem] text-4xl font-black text-white uppercase tracking-widest hover:bg-white/5 transition-all">Upgrade Node Level</button>
                   </div>
                </div>
             </div>
          )}

          {/* MASTER ADMIN V17 */}
          {activeView === AppView.ADMIN && (
             <div className="w-full max-w-[2200px] mx-auto space-y-40 animate-in zoom-in-95 duration-1000 pb-96 overflow-y-auto pr-20 scrollbar-hide px-20">
                <div className="text-center py-20">
                   <h2 className="text-[14rem] font-black text-white uppercase tracking-tighter leading-none mb-6">System Master</h2>
                   <p className="text-5xl font-black uppercase tracking-[2.5em] text-slate-800">Global Cluster Management</p>
                </div>
                <div className="grid grid-cols-3 gap-16">
                   <AdminCard icon={<Users />} label="Master Users" val="4,290" />
                   <AdminCard icon={<Server />} label="Active Nodes" val="12" />
                   <AdminCard icon={<VerifiedIcon />} label="Deployments" val="8,102" />
                   <AdminCard icon={<Activity />} label="Uptime Engine" val="99.99%" />
                   <AdminCard icon={<ShieldAlert />} label="Incidents" val="0" />
                   <AdminCard icon={<TrendingUp />} label="Ecosystem Growth" val="+42%" />
                </div>
             </div>
          )}

          {/* NODE CONFIG (SETTINGS) V17 */}
          {activeView === AppView.SETTINGS && (
             <div className="w-full max-w-[1800px] mx-auto space-y-40 animate-in zoom-in-95 duration-1000 pb-96 overflow-y-auto pr-20 scrollbar-hide px-20">
                <div className="text-center py-20">
                   <h2 className="text-[12rem] font-black text-white uppercase tracking-tighter leading-none mb-6">Node Config</h2>
                   <p className="text-4xl font-black uppercase tracking-[2em] text-slate-800">Neural Environment Settings</p>
                </div>
                <div className="glass-v2 p-24 rounded-[12rem] border border-white/5 shadow-4xl space-y-20">
                   <SettingRow label="Architect Display Name" val={currentUser.displayName} icon={<UserCircle />} />
                   <SettingRow label="Neural Link Email" val={currentUser.email} icon={<Mail />} />
                   <SettingRow label="Vercel Master Token" val="••••••••••••••••" icon={<Cloud />} />
                   <SettingRow label="GitHub Personal Key" val="••••••••••••••••" icon={<Github />} />
                   <SettingRow label="Figma Design API" val="••••••••••••••••" icon={<Figma />} />
                   <div className="pt-20 border-t border-white/5 flex justify-end">
                      <button className="px-24 py-10 bg-pina-neon text-navy rounded-full font-black uppercase text-3xl tracking-widest shadow-3xl hover:scale-110 transition-all">Save Node Config</button>
                   </div>
                </div>
             </div>
          )}

          {/* OTHERS (FALLBACK) */}
          {(activeView === AppView.CODE || activeView === AppView.FIGMA_SYNC || activeView === AppView.DB_MANAGER || activeView === AppView.API_CONNECTORS) && (
            <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in-95 duration-1000 opacity-50">
               <Processor size={200} className="text-white mb-12 animate-spin duration-[10s]" />
               <h3 className="text-8xl font-black text-white uppercase tracking-tighter">Module Not Optimized</h3>
               <p className="text-4xl text-slate-800 font-black uppercase tracking-[1em]">V17.0 Master Protocol Only</p>
               <button onClick={() => setActiveView(AppView.DASHBOARD)} className="mt-20 px-16 py-8 bg-white/5 rounded-full text-white font-black uppercase text-2xl tracking-widest hover:bg-white/10">Return to Core</button>
            </div>
          )}

        </div>

        {/* Global Footer Taskbar V17 */}
        <footer className="h-[28rem] border-t border-white/5 px-40 flex items-center justify-between z-50 bg-navy/98 backdrop-blur-[350px] relative shadow-[0_-100px_200px_rgba(0,0,0,1)]">
           <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-pina-neon/80 to-transparent shadow-[0_0_60px_#fbff00]"></div>
           <div className="flex items-center gap-120">
              <div className="flex flex-col">
                 <span className="text-[32px] font-black uppercase tracking-[4em] text-pina-neon mb-14">Universal Business Technology Neural Architect Master Node</span>
                 <h3 className="text-[12rem] font-black text-white uppercase tracking-widest leading-none select-none">Omni-Nexus // V17.0 Master Protocol</h3>
              </div>
           </div>
           <div className="flex items-center gap-80 text-right">
              <div className="space-y-6">
                 <span className="block text-[28px] font-black uppercase tracking-[3em] text-slate-800">Chief Master Architect Medellín Node Cluster</span>
                 <span className="block text-[14rem] font-black uppercase tracking-widest leading-none select-none" style={{ background: 'linear-gradient(to right, #fbff00, #af00ff, #9eff00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Johnatan Vallejo M.</span>
              </div>
              <img src="https://github.com/john474nvll.png" className="w-80 h-80 rounded-[12rem] border-[16px] border-white/5 shadow-4xl scale-140 hover:rotate-[360deg] transition-all duration-[2000ms] cursor-pointer active:scale-175 ring-8 ring-kiwi/10" />
           </div>
        </footer>
      </main>
    </div>
  );
};

// V17 Master Forge Sub-components
const MasterStat = ({ icon, label, val, color }: any) => (
  <div className="glass-v2 p-24 rounded-[12rem] border border-white/5 flex flex-col items-center justify-center text-center group hover:scale-[1.1] transition-all duration-1000 shadow-4xl relative overflow-hidden">
     <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
     <div className={`p-20 bg-navy-light rounded-[7rem] ${color} mb-20 shadow-4xl transition-transform group-hover:rotate-[360deg] duration-[1500ms]`}>{React.cloneElement(icon, { size: 140 })}</div>
     <span className="block text-[28px] font-black uppercase tracking-[2.5em] text-slate-800 mb-14">{label}</span>
     <span className="block text-[14rem] font-black text-white tracking-tighter uppercase leading-none">{val}</span>
  </div>
);

const HealthStat = ({ icon, label, val, detail, color }: any) => (
  <div className="glass-v2 p-20 rounded-[10rem] border border-white/5 shadow-4xl flex flex-col items-center text-center group hover:border-kiwi transition-all">
     <div className={`p-14 bg-navy-light rounded-[5rem] ${color} mb-12 shadow-3xl group-hover:scale-125 transition-transform`}>{React.cloneElement(icon, { size: 100 })}</div>
     <span className="text-[20px] font-black text-slate-700 uppercase tracking-[1em] mb-4">{label}</span>
     <span className="text-[10rem] font-black text-white uppercase tracking-tighter leading-none mb-6">{val}</span>
     <span className={`text-3xl font-black uppercase tracking-widest ${color}`}>{detail}</span>
  </div>
);

const AdminCard = ({ icon, label, val }: any) => (
  <div className="glass-v2 p-16 rounded-[8rem] border border-white/5 shadow-3xl flex flex-col items-center text-center group hover:scale-105 transition-all">
     <div className="p-10 bg-navy-light rounded-[3.5rem] text-uva-neon mb-8 shadow-2xl group-hover:rotate-12 transition-transform">{React.cloneElement(icon, { size: 60 })}</div>
     <span className="text-2xl font-black text-slate-800 uppercase tracking-[0.5em] mb-4">{label}</span>
     <span className="text-8xl font-black text-white uppercase tracking-tighter leading-none">{val}</span>
  </div>
);

const SettingRow = ({ label, val, icon }: any) => (
  <div className="flex items-center justify-between p-12 bg-navy/40 rounded-[6rem] border-2 border-white/5 hover:border-uva-neon/40 transition-all group">
     <div className="flex items-center gap-10">
        <div className="p-8 bg-navy-light rounded-[3rem] text-slate-800 group-hover:text-uva-neon transition-colors">{React.cloneElement(icon, { size: 48 })}</div>
        <div>
           <span className="block text-2xl font-black text-slate-700 uppercase tracking-widest mb-2">{label}</span>
           <span className="block text-4xl font-black text-white uppercase truncate max-w-2xl">{val}</span>
        </div>
     </div>
     <button className="px-14 py-6 bg-navy-light text-white rounded-full text-2xl font-black uppercase tracking-widest hover:text-pina-neon transition-all">Modify Node</button>
  </div>
);

const PaletteItem = ({ icon, label, type, onClick, highlight }: any) => (
  <button onClick={onClick} className={`w-[700px] flex items-center gap-20 p-14 rounded-[8rem] bg-navy/85 border-4 ${highlight ? 'border-kiwi shadow-[0_0_80px_rgba(158,255,0,0.3)]' : 'border-white/10'} text-white hover:bg-white/10 hover:scale-[1.08] transition-all group relative overflow-hidden shadow-4xl backdrop-blur-[400px]`}>
     <div className={`p-14 rounded-[5.5rem] shadow-3xl transition-transform group-hover:rotate-12 ${highlight ? 'bg-kiwi text-navy' : 'bg-navy-light'}`}>{React.cloneElement(icon as any, { size: 100 })}</div>
     <div className="text-left">
        <span className="block text-[18px] font-black uppercase tracking-[1.5em] text-slate-800 mb-6">{type} NODE</span>
        <span className="block text-7xl font-black uppercase tracking-tighter leading-none">{label}</span>
     </div>
     <div className="absolute right-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-kiwi opacity-0 group-hover:opacity-100 transition-opacity animate-pulse shadow-[0_0_80px_#9eff00]"></div>
  </button>
);

const TaskBtn = ({ icon, label, color, onClick }: any) => (
  <button onClick={onClick} className={`group flex flex-col items-center gap-8 transition-all ${color} relative`}>
     <div className="p-12 bg-navy-light rounded-[3rem] group-hover:bg-white/15 group-hover:scale-140 transition-all shadow-3xl">{React.cloneElement(icon as any, { size: 56 })}</div>
     <span className="text-[16px] font-black uppercase tracking-[0.8em] opacity-0 group-hover:opacity-100 transition-opacity absolute top-36 bg-navy/95 p-4 rounded-2xl whitespace-nowrap border-2 border-white/10 z-50 shadow-2xl">{label}</span>
  </button>
);

export default App;
