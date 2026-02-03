'use client';
import React from 'react';
import { QrCode, History, Package, User, PlusCircle, Search } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Верхняя панель */}
      <header className="bg-white px-6 py-4 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Inventory</h1>
          <p className="text-xs text-slate-400">Welcome back, Admin</p>
        </div>
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          <User size={20} />
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Поиск */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search gadgets..." 
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Главная кнопка сканера */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 shadow-blue-200 shadow-lg flex flex-col items-center justify-center transition-all active:scale-95">
          <div className="bg-white/20 p-4 rounded-full mb-3">
            <QrCode size={40} />
          </div>
          <span className="text-lg font-bold">Scan QR Code</span>
          <p className="text-blue-100 text-sm">Scan asset to check in/out</p>
        </button>

        {/* Сетка меню */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center hover:bg-slate-50 transition cursor-pointer">
            <div className="text-orange-500 bg-orange-50 p-3 rounded-lg mb-2">
              <Package size={24} />
            </div>
            <span className="font-semibold text-sm">All Gadgets</span>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center hover:bg-slate-50 transition cursor-pointer">
            <div className="text-purple-500 bg-purple-50 p-3 rounded-lg mb-2">
              <History size={24} />
            </div>
            <span className="font-semibold text-sm">History</span>
          </div>
        </div>

        {/* Последняя активность */}
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">💻</div>
                  <div>
                    <p className="font-bold text-sm">MacBook Pro 14"</p>
                    <p className="text-xs text-slate-500">Issued to John Doe</p>
                  </div>
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">RETURNED</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Нижнее меню */}
      <nav className="bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center">
        <Package className="text-blue-600" />
        <PlusCircle className="text-slate-400" />
        <History className="text-slate-400" />
        <User className="text-slate-400" />
      </nav>
    </div>
  );
}
