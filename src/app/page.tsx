export const runtime = 'edge';

export default function Home() {
  return (
    <main style={{ 
      backgroundColor: '#000', 
      color: '#fff', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        INVENTORY SYSTEM
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#888' }}>
        globaaal network brrrooo is online
      </p>
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #333', borderRadius: '8px' }}>
        Status: <span style={{ color: '#0f0' }}>READY</span>
      </div>
    </main>
  );
}
