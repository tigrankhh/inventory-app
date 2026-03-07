export const runtime = 'edge';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#fff', color: '#000', minHeight: '100vh', padding: '40px', fontFamily: '"Courier New", Courier, monospace' }}>
      <header style={{ borderBottom: '8px solid #000', paddingBottom: '20px', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '5rem', fontWeight: '900', textTransform: 'uppercase', lineHeight: '0.9', letterSpacing: '-2px' }}>
          Globaaal<br/>Network
        </h1>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ border: '4px solid #000', padding: '20px', boxShadow: '12px 12px 0px #00ff00' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>[ SYSTEM_STATUS ]</h2>
          <p style={{ fontSize: '1.2rem' }}>ONLINE_AND_READY_BRROOO</p>
        </div>

        <div style={{ border: '4px solid #000', padding: '20px', boxShadow: '12px 12px 0px #ff00ff' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>[ INVENTORY ]</h2>
          <p>DATABASE_SYNCED_V3.1.5</p>
        </div>

        <a href="/login" style={{ 
          display: 'block', 
          backgroundColor: '#000', 
          color: '#fff', 
          padding: '20px', 
          fontSize: '2rem', 
          textAlign: 'center', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          boxShadow: '12px 12px 0px #38bdf8'
        }}>
          LOGIN_TO_SYSTEM →
        </a>
      </main>
    </div>
  );
}
