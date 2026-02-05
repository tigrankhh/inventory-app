'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isRegistering) {
        // Регистрация
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (signUpError) throw signUpError
        alert('Успешно! Если подтверждение почты включено — проверьте email. Если нет — можно входить.')
        setIsRegistering(false)
      } else {
        // Вход
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (signInError) throw signInError
        
        router.refresh()
        router.push('/')
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка авторизации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 text-slate-900">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl border-4 border-blue-500">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Inventory <span className="text-blue-600">Pure</span>
          </h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase mt-2 tracking-[0.2em]">
            {isRegistering ? 'Создать аккаунт' : 'Авторизация'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold"
              placeholder="boss@inventory.com"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-4">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 italic">
              ✕ {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Секунду...' : isRegistering ? 'Зарегистрироваться' : 'Войти в систему'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-50 pt-6">
          <button 
            onClick={() => {
              setIsRegistering(!isRegistering)
              setError(null)
            }}
            className="text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-blue-600 transition-all"
          >
            {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Регистрация'}
          </button>
        </div>

        {/* Маркер обновления — удали его потом */}
        <div className="mt-4 text-center">
          <span className="text-[8px] text-slate-200 font-mono uppercase">Version: No-Google-Hotfix</span>
        </div>
      </div>
    </div>
  )
}
