import React, { useState, useEffect } from 'react';
import { funcionarioService, cidadeService } from '../services/api';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [cidadeId, setCidadeId] = useState('');

  useEffect(() => {
    carregarFuncionarios();
    carregarCidades();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      const response = await funcionarioService.listar();
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar funcionários', error);
    }
  };

  const carregarCidades = async () => {
    try {
      const response = await cidadeService.listar();
      setCidades(response.data);
    } catch (error) {
      console.error('Erro ao buscar cidades', error);
    }
  };

  const cadastrar = async () => {
    if (!nome || !cargo || !cidadeId) return alert('Preencha todos os campos!');
    try {
      await funcionarioService.criar({ nome, cargo, cidade_id: cidadeId });
      setNome('');
      setCargo('');
      setCidadeId('');
      carregarFuncionarios();
    } catch (error) {
      console.error('Erro ao cadastrar', error);
    }
  };

  const nomeCidade = (id) => cidades.find((c) => c.id === id)?.nome || id;

  return (
    <div>
      <h2>Gestão de Funcionários</h2>
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Novo Funcionário</h3>
        <input
          type="text"
          placeholder="Nome do Funcionário"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <select
          value={cidadeId}
          onChange={(e) => setCidadeId(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          <option value="">Selecione a Cidade</option>
          {cidades.map((c) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>
        <button onClick={cadastrar}>Cadastrar</button>
      </div>
      <h3>Funcionários Cadastrados</h3>
      <ul>
        {funcionarios.map((f) => (
          <li key={f.id}>
            <strong>{f.nome}</strong> - {f.cargo} - Cidade: {nomeCidade(f.cidade_id)}
          </li>
        ))}
      </ul>
    </div>
  );
}
