export const runtime = 'edge';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#111', color: '#00ff00', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <div style={{ border: '2px solid #00ff00', padding: '20px' }}>
        <h1>GLOBAAAL NETWORK BRRROOO</h1>
        <p>{"SYSTEM STATUS: ONLINE"}</p>
        <p>{"INVENTORY: READY"}</p>
        <button style={{ background: '#00ff00', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
          ENTER SYSTEM
        </button>
      </div>
    </div>
  );
}
