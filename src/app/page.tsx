"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isRegistering) {
      // ФУНКЦИЯ РЕГИСТРАЦИИ
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        alert("Ошибка регистрации: " + error.message);
      } else {
        alert("Аккаунт создан успешно! Теперь вы можете войти.");
        setIsRegistering(false);
      }
    } else {
      // ФУНКЦИЯ ВХОДА
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert("Ошибка входа: " + error.message);
      } else {
        router.push('/');
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6 font-sans">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full border border-white">
        
        {/* ЗАГОЛОВОК */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-blue-600 italic tracking-tighter">INV.SYSTEM</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            {isRegistering ? 'Создайте свой профиль' : 'Войдите в панель управления'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {/* ПОЛЕ EMAIL */}
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Электронная почта
            </label>
            <input 
              type="email" 
              placeholder="name@company.com"
              required
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-black placeholder-slate-300 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          {/* ПОЛЕ ПАРОЛЬ */}
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Пароль
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              required
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-black placeholder-slate-300 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          
          {/* КНОПКА ДЕЙСТВИЯ */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 mt-4"
          >
            {loading ? 'ЗАГРУЗКА...' : (isRegistering ? 'СОЗДАТЬ АККАУНТ' : 'ВОЙТИ В СИСТЕМУ')}
          </button>
        </form>

        {/* ПЕРЕКЛЮЧАТЕЛЬ РЕЖИМА */}
        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full mt-8 text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] hover:text-blue-600 transition-colors"
        >
          {isRegistering ? '← Назад к авторизации' : 'Нет аккаунта? Зарегистрироваться'}
        </button>

      </div>
    </div>
  );
}
