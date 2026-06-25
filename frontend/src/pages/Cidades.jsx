import React, { useState, useEffect } from 'react';
import { cidadeService } from '../services/api';

export default function Cidades() {
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => { carregarCidades(); }, []);

  const carregarCidades = async () => {
    try {
      const response = await cidadeService.listar();
      setCidades(response.data);
    } catch (error) {
      console.error('Erro ao buscar cidades', error);
    }
  };

  const cadastrar = async () => {
    if (!nome || !estado) return alert('Preencha todos os campos!');
    try {
      await cidadeService.criar({ nome, estado });
      setNome('');
      setEstado('');
      carregarCidades();
    } catch (error) {
      console.error('Erro ao cadastrar', error);
    }
  };

  return (
    <div>
      <h2>Gestão de Cidades</h2>
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Nova Cidade</h3>
        <input
          type="text"
          placeholder="Nome da Cidade"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Estado (Ex: SP)"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={cadastrar}>Cadastrar</button>
      </div>
      <h3>Cidades Cadastradas</h3>
      <ul>
        {cidades.map((cidade) => (
          <li key={cidade.id}>
            <strong>{cidade.nome}</strong> - {cidade.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}
