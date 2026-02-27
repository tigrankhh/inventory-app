export const runtime = 'edge';

export default function Home() {
  return (
    <div style={{ 
      backgroundColor: '#0f172a', 
      color: '#f8fafc', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ padding: '40px', borderRadius: '20px', background: '#1e293b', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#38bdf8' }}>GLOBAAAL NETWORK</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Inventory System Brrrooo 🦾</p>
        
        <div style={{ marginTop: '30px', display: 'grid', gap: '15px' }}>
          <button style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#38bdf8', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}>
            VIEW INVENTORY
          </button>
          <button style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid #38bdf8', background: 'transparent', color: '#38bdf8', fontWeight: 'bold', cursor: 'pointer' }}>
            SCAN QR CODE
          </button>
        </div>
      </div>
      <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.5 }}>Powered by Gemini & Cloudflare Edge</p>
    </div>
  );
}
