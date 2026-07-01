import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Corrigido: Apenas um '../' para acessar a pasta services a partir de pages
import { usuarioService } from '../services/usuarioService';

export default function Cadastro() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    role: 'comum'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await usuarioService.cadastrar(formData);
      alert('Usuário cadastrado com sucesso!');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Ocorreu um erro no cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Cadastrar Novo Usuário</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Nome:</label>
          <input 
            type="text" 
            name="nome" 
            value={formData.nome} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>E-mail:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            name="senha" 
            value={formData.senha} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>Permissão (Role):</label>
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="comum">Comum</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button type="submit" disabled={loading} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <Link to="/login">Já tem conta? Faça login</Link>
      </div>
    </div>
  );
}