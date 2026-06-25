import React, { useState, useEffect } from 'react';
import { servicoService, funcionarioService, equipamentoService, cidadeService } from '../services/api';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [funcionarioId, setFuncionarioId] = useState('');
  const [equipamentoId, setEquipamentoId] = useState('');
  const [cidadeId, setCidadeId] = useState('');

  useEffect(() => {
    carregarServicos();
    carregarFuncionarios();
    carregarEquipamentos();
    carregarCidades();
  }, []);

  const carregarServicos = async () => {
    try {
      const response = await servicoService.listar();
      setServicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços', error);
    }
  };

  const carregarFuncionarios = async () => {
    try {
      const response = await funcionarioService.listar();
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar funcionários', error);
    }
  };

  const carregarEquipamentos = async () => {
    try {
      const response = await equipamentoService.listar();
      setEquipamentos(response.data);
    } catch (error) {
      console.error('Erro ao buscar equipamentos', error);
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
    if (!descricao || !funcionarioId || !equipamentoId || !cidadeId)
      return alert('Preencha todos os campos!');
    try {
      await servicoService.criar({
        descricao,
        funcionario_id: funcionarioId,
        equipamento_id: equipamentoId,
        cidade_id: cidadeId,
      });
      setDescricao('');
      setFuncionarioId('');
      setEquipamentoId('');
      setCidadeId('');
      carregarServicos();
    } catch (error) {
      console.error('Erro ao cadastrar', error);
    }
  };

  const resolver = (lista, id, campo = 'nome') =>
    lista.find((item) => item.id === id)?.[campo] || id;

  return (
    <div>
      <h2>Gestão de Serviços</h2>
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Novo Serviço</h3>
        <input
          type="text"
          placeholder="Descrição do Serviço"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <select
          value={funcionarioId}
          onChange={(e) => setFuncionarioId(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          <option value="">Selecione o Funcionário</option>
          {funcionarios.map((f) => (
            <option key={f.id} value={f.id}>{f.nome}</option>
          ))}
        </select>
        <select
          value={equipamentoId}
          onChange={(e) => setEquipamentoId(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          <option value="">Selecione o Equipamento</option>
          {equipamentos.map((eq) => (
            <option key={eq.id} value={eq.id}>{eq.nome}</option>
          ))}
        </select>
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
      <h3>Serviços Cadastrados</h3>
      <ul>
        {servicos.map((s) => (
          <li key={s.id}>
            <strong>{s.descricao}</strong> - Funcionário: {resolver(funcionarios, s.funcionario_id)} - Equipamento: {resolver(equipamentos, s.equipamento_id)} - Cidade: {resolver(cidades, s.cidade_id)}
          </li>
        ))}
      </ul>
    </div>
  );
}
