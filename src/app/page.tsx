'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/libsupabase';
import { 
  QrCode, History, Package, User, Search, 
  ArrowLeft, Loader2, LogOut, Filter, Monitor, 
  Smartphone, Laptop, Tablet, HardDrive 
} from 'lucide-react';

// --- ГИГАНТСКАЯ БАЗА ДАННЫХ ДЛЯ ДЕМО ---
const MASTER_DATA = [
  { id: 1, type: 'Laptop', name: 'MacBook Pro 14"', model: 'M3 Max / 64GB', os: 'macOS Sonoma', year: 2023, status: 'In Stock' },
  { id: 2, type: 'Laptop', name: 'MacBook Pro 16"', model: 'M2 Max / 32GB', os: 'macOS Ventura', year: 2022, status: 'In Stock' },
  { id: 3, type: 'Laptop', name: 'MacBook Air 13"', model: 'M1 / 8GB', os: 'macOS Monterey', year: 2020, status: 'Low Stock' },
  { id: 4, type: 'Laptop', name: 'ThinkPad X1 Carbon', model: 'Gen 11 / i7-1355U', os: 'Windows 11 Pro', year: 2023, status: 'In Stock' },
  { id: 5, type: 'Laptop', name: 'Dell XPS 15', model: '9530 / i9 / RTX 4070', os: 'Windows 11 Pro', year: 2023, status: 'In Stock' },
  { id: 6, type: 'Smartphone', name: 'iPhone 15 Pro', model: '256GB / Titanium', os: 'iOS 17', year: 2023, status: 'In Stock' },
  { id: 7, type: 'Smartphone', name: 'Samsung Galaxy S23', model: 'Ultra / 512GB', os: 'Android 14', year: 2023, status: 'In Stock' },
  { id: 8, type: 'Tablet', name: 'iPad Pro 12.9"', model: 'M2 / Gen 6', os: 'iPadOS 17', year: 2022, status: 'In Stock' },
  { id: 9, type: 'Monitor', name: 'Studio Display', model: '27" 5K / Tilt', os: 'Firmware 17', year: 2022, status: 'In Stock' },
  { id: 10, type: 'Monitor', name: 'Dell UltraSharp', model: 'U2723QE / 4K', os: 'N/A', year: 2022, status: 'In Stock' },
  { id: 11, type: 'Smartphone', name: 'Google Pixel 8', model: 'Pro / 128GB', os: 'Android 14', year: 2023, status: 'Out of Stock' },
  { id: 12, type: 'Laptop', name: 'Surface Laptop 5', model: '13.5" / i5', os: 'Windows 11', year: 2022, status: 'In Stock' },
  { id: 13, type: 'Accessory', name: 'Magic Mouse', model: 'Black / USB-C', os: 'N/A', year: 2022, status: 'In Stock' },
  { id: 14, type: 'Laptop', name: 'MacBook Pro 13"', model: 'Intel i7 / 16GB', os: 'macOS Catalina', year: 2019, status: 'Assigned' },
];

export default function InventorySystem() {
  const [session, setSession] = useState<any>(null);
  const [view, setView] = useState<'dashboard' | 'search'>('dashboard');
  const [loading, setLoading] = useState(false);
  
  // Auth states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOS, setFilterOS] = useState('All');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = isRegister 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  // --- ЛОГИКА ФИЛЬТРАЦИИ ---
  const filteredAssets = useMemo(() => {
    return MASTER_DATA.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOS = filterOS === 'All' || item.os.includes(filterOS);
      const matchesType = filterType === 'All' || item.type === filterType;
      return matchesSearch && matchesOS && matchesType;
    });
  }, [searchQuery, filterOS, filterType]);

  // --- КОМПОНЕНТ: ЭКРАН ВХОДА ---
  if (!session) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-slate-800">INV_SYSTEM</h1>
            <p className="text-slate-400 text-sm">{isRegister ? 'Create admin account' : 'Sign in to manage stock'}</p>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={e => setPassword(e.target.value)} required />
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex justify-center">
              {loading ? <Loader2 className="animate-spin" /> : (isRegister ? 'Register' : 'Login')}
            </button>
          </form>
          <button onClick={() => setIsRegister(!isRegister)} className="w-full mt-6 text-sm font-bold text-blue-600 uppercase tracking-widest">
            {isRegister ? 'Switch to Login' : 'Need Registration?'}
          </button>
        </div>
      </div>
    );
  }

  // --- КОМПОНЕНТ: ЭКРАН ПОИСКА ---
  if (view === 'search') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-20">
          <button onClick={() => setView('dashboard')} className="p-2 hover:bg-slate-100 rounded-full"><ArrowLeft size={24} /></button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              autoFocus
              type="text" 
              placeholder="Search by name or model..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Сайдбар фильтров */}
          <aside className="w-64 bg-white border-r p-6 hidden md:block space-y-8">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">OS System</h3>
              <div className="space-y-2">
                {['All', 'macOS', 'Windows', 'iOS', 'Android'].map(os => (
                  <button key={os} onClick={() => setFilterOS(os)} className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${filterOS === os ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>{os}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">Device Type</h3>
              <div className="space-y-2">
                {['All', 'Laptop', 'Smartphone', 'Monitor', 'Tablet'].map(type => (
                  <button key={type} onClick={() => setFilterType(type)} className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${filterType === type ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>{type}</button>
                ))}
              </div>
            </div>
          </aside>

          {/* Таблица результатов */}
          <main className="flex-1 overflow-auto p-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Name</th>
                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Model / OS</th>
                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Year</th>
                    <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAssets.map(item => (
                    <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{item.type}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-600 font-medium">{item.model}</p>
                        <p className="text-xs text-slate-400">{item.os}</p>
                      </td>
                      <td className="p-4 text-center text-sm font-mono text-slate-500">{item.year}</td>
                      <td className="p-4 text-right">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${
                          item.status === 'In Stock' ? 'bg-green-100 text-green-700' : 
                          item.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredAssets.length === 0 && (
                <div className="p-20 text-center">
                  <p className="text-slate-400 font-medium">No assets matching your search criteria.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    );
  }

  // --- КОМПОНЕНТ: DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white px-8 py-6 shadow-sm flex justify-between items-center border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-blue-600 tracking-tighter italic">MAGICAL_INV</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{session.user.email}</p>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 transition uppercase tracking-widest">
          <LogOut size={16} /> Logout
        </button>
      </header>

      <main className="p-8 max-w-5xl mx-auto w-full space-y-8">
        {/* Краткая сводка */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total Fleet</p>
            <p className="text-3xl font-black text-slate-800">{MASTER_DATA.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Low Stock</p>
            <p className="text-3xl font-black text-orange-500">2</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Out</p>
            <p className="text-3xl font-black text-red-500">1</p>
          </div>
        </div>

        {/* ГЛАВНОЕ ДЕЙСТВИЕ: ПОИСК */}
        <div className="space-y-4 text-center">
          <button 
            onClick={() => setView('search')}
            className="w-full bg-white border-2 border-slate-200 p-8 rounded-3xl flex flex-col items-center gap-4 hover:border-blue-400 transition group active:scale-[0.98]"
          >
            <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <Search size={32} />
            </div>
            <div className="text-center">
              <span className="text-xl font-black text-slate-800 uppercase tracking-tight">Open Global Search</span>
              <p className="text-slate-400 text-sm font-medium">Find models, check OS variations and stock</p>
            </div>
          </button>

          <button onClick={() => alert('Scanner requires HTTPS')} className="w-full bg-slate-900 text-white p-6 rounded-3xl flex items-center justify-center gap-4 hover:bg-slate-800 transition shadow-xl shadow-slate-200">
            <QrCode size={24} />
            <span className="font-bold text-sm uppercase tracking-widest">Fast QR Scan</span>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center gap-2 font-black text-[10px] text-slate-400 uppercase tracking-widest">
            <History size={14} /> System Activity Log
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center text-sm border-l-2 border-blue-500 pl-4 py-1">
              <span className="font-bold text-slate-700">Admin issued **MacBook Pro 14"**</span>
              <span className="text-[10px] font-bold text-slate-300">NOW</span>
            </div>
            <div className="flex justify-between items-center text-sm border-l-2 border-slate-200 pl-4 py-1">
              <span className="text-slate-500">New asset added: **Pixel 8 Pro**</span>
              <span className="text-[10px] font-bold text-slate-300">2H AGO</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
