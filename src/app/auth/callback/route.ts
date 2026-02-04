import { createClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  // origin автоматически подхватит твой .netlify.app домен
  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}/inventory`)
    }
  }

  // Если ошибка, кидаем обратно на логин
  return NextResponse.redirect(`${origin}/login?error=auth-code-error`)
}
