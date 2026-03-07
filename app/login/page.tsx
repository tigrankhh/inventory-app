export const runtime = 'edge';

export default function LoginPage() {
  return (
    <div style={{ backgroundColor: '#38bdf8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Courier New", Courier, monospace' }}>
      <div style={{ 
        backgroundColor: '#fff', 
        border: '6px solid #000', 
        padding: '50px', 
        boxShadow: '20px 20px 0px #000',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '30px', textTransform: 'uppercase' }}>Ident_Verify</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>USER_ACCESS_KEY:</label>
          <input type="text" style={{ width: '100%', border: '4px solid #000', padding: '15px', fontSize: '1.1rem', outline: 'none' }} placeholder="enter_id..." />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>SECURITY_TOKEN:</label>
          <input type="password" style={{ width: '100%', border: '4px solid #000', padding: '15px', fontSize: '1.1rem', outline: 'none' }} placeholder="********" />
        </div>

        <button style={{ 
          width: '100%', 
          backgroundColor: '#00ff00', 
          border: '4px solid #000', 
          padding: '20px', 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          boxShadow: '8px 8px 0px #000'
        }}>
          AUTHORIZE_BRROOO
        </button>
        
        <p style={{ marginTop: '20px', fontSize: '0.8rem' }}>* Only for verified members of Globaaal Network</p>
      </div>
    </div>
  );
}