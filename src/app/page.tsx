"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Package, Mail, Lock, RefreshCcw, LogOut, Plus, Search, 
  LayoutDashboard, ChevronRight, UserPlus, LogIn 
} from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function InventorySystem() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false); // Переключатель вход/регистрация
  
  // Поля формы
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Данные инвентаря
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) fetchItems();
      setLoading(false);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchItems();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchItems() {
    const { data } = await supabase.from('items').select('*').order('created_at', { ascending: false });
    setItems(data || []);
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (isRegistering) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert("Check your email for confirmation link!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
    }
    setLoading(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <RefreshCcw className="animate-spin text-blue-500 w-10 h-10" />
    </div>
  );

  // --- ЭКРАН ВХОДА / РЕГИСТРАЦИИ ---
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-2xl">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2 text-white">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-400 text-center mb-8 text-sm">
            {isRegistering ? 'Register to start managing assets' : 'Sign in to access your inventory'}
          </p>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
              <input 
                type="email" placeholder="Your Gmail" 
                className="w-full bg-gray-900 border border-gray-700 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
              <input 
                type="password" placeholder="Password" 
                className="w-full bg-gray-900 border border-gray-700 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={password} onChange={(e) => setPassword(e.target.value)} required
              />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2">
              {isRegistering ? <UserPlus className="w-5 h-5"/> : <LogIn className="w-5 h-5"/>}
              {isRegistering ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-400 text-sm hover:underline"
            >
              {isRegistering ? 'Already have an account? Sign In' : 'New here? Create an account'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- ОСНОВНОЙ ЭКРАН (ИНВЕНТАРЬ) ---
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">Inventory Pro</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Account</p>
              <p className="text-sm text-blue-400 font-medium">{user.email}</p>
            </div>
            <button onClick={() => supabase.auth.signOut()} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
           <div>
              <h2 className="text-3xl font-bold">Dashboard</h2>
              <p className="text-gray-500 text-sm">Managing {items.length} assets</p>
           </div>
           <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20">
              <Plus className="w-5 h-5"/> Add New Item
           </button>
        </div>

        {/* Список товаров */}
        <div className="bg-gray-800/30 border border-gray-800 rounded-3xl overflow-hidden">
          {items.length === 0 ? (
            <div className="p-20 text-center text-gray-500">Inventory is empty. Add items to see them here.</div>
          ) : (
            <div className="divide-y divide-gray-800">
              {items.map(item => (
                <div key={item.id} className="p-5 hover:bg-gray-700/30 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-700">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-xs text-gray-500 font-mono">{item.id.slice(0,8)}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
