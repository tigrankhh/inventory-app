'use client';

import { useState } from 'react';
import { supabase } from '../../libsupabase'; // Проверь путь до файла libsupabase!

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuth = async (type: 'login' | 'signup') => {
    setLoading(true);
    setErrorMessage('');
    const cleanEmail = email.trim();

    const { data, error } = type === 'login' 
      ? await supabase.auth.signInWithPassword({ email: cleanEmail, password })
      : await supabase.auth.signUp({ 
          email: cleanEmail, 
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
        });

    if (error) {
      setErrorMessage(error.message);
    } else {
      if (type === 'signup' && !data.session) {
        setErrorMessage('Success! Check your email for confirmation.');
      } else {
        window.location.href = '/'; 
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white border border-gray-100 p-12 rounded-[50px] shadow-2xl shadow-gray-200/50">
        <div className="text-center mb-10">
          <div className="inline-block w-14 h-14 bg-black rounded-[20px] mb-6 flex items-center justify-center text-white font-black italic shadow-xl">A</div>
          <h1 className="text-2xl font-black tracking-tighter text-black">AssetOS Login</h1>
        </div>

        <div className="space-y-6">
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 border-none p-5 rounded-[25px] outline-none focus:bg-white focus:ring-2 focus:ring-gray-100 transition-all text-sm"
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 border-none p-5 rounded-[25px] outline-none focus:bg-white focus:ring-2 focus:ring-gray-100 transition-all text-sm"
          />

          {errorMessage && <p className="text-red-500 text-xs text-center font-bold uppercase tracking-widest">{errorMessage}</p>}

          <div className="flex flex-col gap-3 pt-4">
            <button onClick={() => handleAuth('login')} disabled={loading} className="w-full bg-black text-white py-5 rounded-[25px] font-bold text-sm hover:scale-[0.98] transition-all disabled:opacity-50">
              {loading ? 'Processing...' : 'Sign In'}
            </button>
            <button onClick={() => handleAuth('signup')} disabled={loading} className="w-full bg-white text-gray-400 border border-gray-100 py-5 rounded-[25px] font-bold text-[10px] uppercase tracking-widest">
              Register Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
