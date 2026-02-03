'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/libsupabase';
import { QrCode, History, Package, User, Search, ArrowLeft, Loader2 } from 'lucide-react';

export default function InventoryApp() {
  const [view, setView] = useState<'dashboard' | 'assets' | 'history'>('dashboard');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  // Функция для загрузки данных из Supabase
  const fetchData = async (table: 'gadgets' | 'history') => {
    setLoading(true);
    const { data: result, error } = await supabase.from(table).select('*');
    if (error) {
      console.error(error);
      alert('Error fetching data');
    } else {
      setData(result || []);
    }
    setLoading(false);
  };

  // Экраны приложения
  if (view === 'assets' || view === 'history') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-white p-4 shadow-sm flex items-center gap-4">
          <button onClick={() => setView('dashboard')} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold capitalize">{view}</h1>
        </header>
        
        <main className="p-4 flex-1">
          {loading ? (
            <div className="flex justify-center mt-10"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
          ) : (
            <div className="space-y-3">
              {data.length > 0 ? data.map((item: any) => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <p className="font-bold text-slate-800">{item.name || item.gadget_name}</p>
                  <p className="text-sm text-slate-500">{item.status || item.action_date}</p>
                </div>
              )) : <p className="text-center text-slate-400 mt-10">No data found in Supabase</p>}
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white px-6 py-5 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-blue-600 tracking-tight">MAGICAL INV</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">System Online</p>
        </div>
        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-100">
          <User size={20} />
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition" size={18} />
          <input type="text" placeholder="Search gadgets..." className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-sm border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 transition-all" />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-4">
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-3xl p-8 shadow-xl shadow-blue-200 flex items-center justify-between transition-all active:scale-[0.98]"
            onClick={() => alert('Camera starting...')} // Скоро заменим на реальный сканер
          >
            <div className="text-left">
              <span className="text-xl font-bold block">Scan QR Code</span>
              <p className="text-blue-100 text-xs">Instantly check device status</p>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl"><QrCode size={32} /></div>
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => { setView('assets'); fetchData('gadgets'); }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:border-blue-200 transition active:scale-95"
            >
              <div className="text-orange-500 bg-orange-50 w-fit p-3 rounded-2xl"><Package size={24} /></div>
              <span className="font-bold text-slate-700">All Assets</span>
            </button>

            <button 
              onClick={() => { setView('history'); fetchData('history'); }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:border-blue-200 transition active:scale-95"
            >
              <div className="text-purple-500 bg-purple-50 w-fit p-3 rounded-2xl"><History size={24} /></div>
              <span className="font-bold text-slate-700">Log History</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="bg-white border-t border-slate-100 px-10 py-5 flex justify-between items-center text-slate-400">
        <Package className="text-blue-600" size={24} />
        <div className="w-12 h-1 bg-slate-100 rounded-full absolute top-0 left-1/2 -translate-x-1/2"></div>
        <History size={24} />
        <User size={24} />
      </nav>
    </div>
  );
}
