import { createClient } from '@/lib/supabaseServer'

export const runtime = 'edge';

export default async function Home() {
  const supabase = await createClient()
  const { data: items } = await supabase.from('inventory').select('*')

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '40px' }}>
      <h1>Globaaal Network Brrrooo</h1>
      <div style={{ marginTop: '20px', color: '#0f0' }}>
        ● Database Connected: {items ? 'YES' : 'NO'}
      </div>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </main>
  )
}
