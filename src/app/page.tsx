export const runtime = 'edge';

export default function Home() {
  return (
    <main style={{ backgroundColor: 'black', color: 'white', minHeight: 'screen', padding: '2rem' }}>
      <h1 style={{ fontStyle: 'italic', fontWeight: '900' }}>
        GLOBAAAL NETWORK <span style={{ color: '#22c55e' }}>BRRROOO</span>
      </h1>
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #22c55e', borderRadius: '0.5rem' }}>
        <p>🚀 System is LIVE.</p>
        <p>Если ты видишь это, 404 ПОБЕЖДЕНА!</p>
      </div>
      <div style={{ marginTop: '1rem', color: '#666' }}>
        Проверяем подключение к базе...
      </div>
    </main>
  );
}
