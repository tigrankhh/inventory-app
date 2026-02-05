'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  
  const router = useRouter()
  // Используем клиентский компонент для браузера
  const supabase = createClientComponentClient()

  // Проверка: если юзер уже залогинен — кидаем на главную
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) router.push('/')
    }
    checkUser()
  }, [router, supabase])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (isRegistering) {
        // РЕГИСТРАЦИЯ
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Важно для корректного редиректа после подтверждения (если оно включено)
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (signUpError) throw signUpError

        if (data.user && data.session) {
          router.push('/')
        } else {
          setMessage('Check your email to confirm registration!')
        }
      } else {
        // ВХОД
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) throw signInError
        
        router.refresh()
        router.push('/')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
        {/* Декор */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-bl-full opacity-10" />
        
        <div className="mb-10 text-center relative">
          <h1 className="text-5xl font-black italic tracking-tighter text-slate-900 uppercase">
            {isRegistering ? 'Join' : 'Login'}
          </h1>
          <div className="h-2 w-20 bg-blue-600 mx-auto mt-2 rounded-full" />
        </div>

        <form onSubmit={handleAuth} className="space-y-5 relative">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-4">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-100 border-2 border-transparent rounded-2xl py-4 px-6 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-900"
              placeholder="boss@inventory.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-4">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-100 border-2 border-transparent rounded-2xl py-4 px-6 outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-900"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 animate-pulse">
              ⚠️ {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 text-green-600 p-4 rounded-2xl text-xs font-bold border border-green-100">
              ✅ {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50 active:scale-95"
          >
            {loading ? 'Wait...' : isRegistering ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button 
            onClick={() => {
              setIsRegistering(!isRegistering)
              setError(null)
              setMessage(null)
            }}
            className="text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-blue-600 transition-all"
          >
            {isRegistering ? 'Already have an account? Login' : 'New here? Register'}
          </button>
        </div>
      </div>
    </div>
  )
}
