import { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useNavigate, Link } from 'react-router-dom' // Importamos o Link aqui

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // @ts-ignore
  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert('Erro no login: ' + error.message)
      setLoading(false)
      return
    }

    navigate('/dashboard') // ou '/inicio', dependendo da sua rota principal
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2>Login</h2>
        
        <div>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Seu e-mail"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Sua senha"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        {/* --- O LINK PARA A TELA DE CADASTRO FOI ADICIONADO AQUI --- */}
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <Link to="/cadastro" style={{ textDecoration: 'none', color: '#007bff' }}>
            Não tem uma conta? Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  )
}