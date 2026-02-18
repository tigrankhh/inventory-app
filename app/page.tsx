export const runtime = 'edge';

export default function Home() {
  return (
    <div style={{ 
      backgroundColor: '#000', 
      color: '#fff', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1>BRO, THE NETWORK IS LIVE! 🚀</h1>
      <p>If you see this, the 404 is dead.</p>
      <a href="/login" style={{ color: '#00ff00', marginTop: '20px' }}>Go to Login</a>
    </div>
  );
}
