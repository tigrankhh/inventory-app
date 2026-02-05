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
        // РЕГИСТРАЦИЯ НОВОГО ЮЗЕРА
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Если в Supabase выключен "Confirm Email", юзер сразу залогинится
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (signUpError) throw signUpError
        alert('Registration successful! You can now log in.')
        setIsRegistering(false)
      } else {
        // ВХОД В АККАУНТ
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (signInError) throw signInError
        
        // Успех! Освежаем страницу и идем в Dashboard
        router.refresh()
        router.push('/')
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[2rem] p-10 shadow-2xl">
        
        {/* Заголовок */}
        <div className="text-center mb-10">
          <div className="inline-block bg-blue-600 text-white p-3 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
            Inventory <span className="text-blue-600">Pro</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase mt-2 tracking-widest">
            {isRegistering ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        {/* Форма */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-4">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-900"
              placeholder="name@company.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-4">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-900"
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
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50 active:scale-95 mt-4"
          >
            {loading ? 'Processing...' : isRegistering ? 'Get Started' : 'Sign In'}
          </button>
        </form>

        {/* Переключатель Режим входа / Регистрация */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              setIsRegistering(!isRegistering)
              setError(null)
            }}
            className="text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-blue-600 transition-all"
          >
            {isRegistering ? 'Already have an account? Log in' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  )
}
