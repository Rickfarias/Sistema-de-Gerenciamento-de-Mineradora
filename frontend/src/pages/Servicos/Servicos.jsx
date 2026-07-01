import { useCallback, useEffect, useState } from 'react'
import { equipamentoService, funcionarioService, servicoService, cidadeService } from '../../services/api' 

const hoje = () => new Date().toISOString().slice(0, 10)

const estadoInicial = {
  descricao: '',
  status: 'aberto',
  data_abertura: hoje(),
  equipamento_id: '',
  funcionario_id: '',
  cidade_id: ''
}

export default function Servicos() {
  const [servicos, setServicos] = useState([])
  const [funcionarios, setFuncionarios] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [cidades, setCidades] = useState([])
  const [form, setForm] = useState(estadoInicial)
  const [erro, setErro] = useState('')

  const carregarDados = useCallback(async () => {
    try {
      const [servicosResponse, funcionariosResponse, equipamentosResponse, cidadesResponse] = await Promise.all([
        servicoService.listar(),
        funcionarioService.listar(),
        equipamentoService.listar(),
        cidadeService.listar() 
      ])
      
      setServicos(servicosResponse.data)
      setFuncionarios(funcionariosResponse.data)
      setEquipamentos(equipamentosResponse.data)
      setCidades(cidadesResponse.data)
      setErro('')
    } catch (error) {
      setErro(error.response?.data?.error || 'Erro ao carregar servicos')
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarDados()
  }, [carregarDados])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const cadastrar = async () => {
    if (!form.descricao || !form.funcionario_id || !form.equipamento_id || !form.cidade_id) {
      setErro('Preencha descrição, funcionário, equipamento e cidade.')
      return
    }

    try {
      await servicoService.criar(form)
      setForm({ ...estadoInicial, data_abertura: hoje() })
      await carregarDados()
    } catch (error) {
      setErro(error.response?.data?.error || 'Erro ao cadastrar servico')
    }
  }

  const atualizarStatus = async (id, status) => {
    try {
      await servicoService.atualizarStatus(id, status)
      await carregarDados()
    } catch (error) {
      setErro(error.response?.data?.error || 'Erro ao atualizar status')
    }
  }

  const resolver = (lista, id) => lista.find((item) => String(item.id) === String(id))?.nome || id

  return (
    <div>
      <h2>Gestão de Serviços</h2>

      {erro && <p style={{ color: 'crimson' }}>{erro}</p>}

      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Novo Serviço</h3>
        
        <input
          type="text"
          name="descricao"
          placeholder="Descrição do serviço"
          value={form.descricao}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        
        <select name="funcionario_id" value={form.funcionario_id} onChange={handleChange} style={{ marginRight: '10px' }}>
          <option value="">Selecione o funcionário</option>
          {funcionarios.map((funcionario) => (
            <option key={funcionario.id} value={funcionario.id}>{funcionario.nome}</option>
          ))}
        </select>
        
        <select name="equipamento_id" value={form.equipamento_id} onChange={handleChange} style={{ marginRight: '10px' }}>
          <option value="">Selecione o equipamento</option>
          {equipamentos.map((equipamento) => (
            <option key={equipamento.id} value={equipamento.id}>{equipamento.nome}</option>
          ))}
        </select>
        
        {/* Adicionado: Select de Cidade */}
        <select name="cidade_id" value={form.cidade_id} onChange={handleChange} style={{ marginRight: '10px' }}>
          <option value="">Selecione a cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
          ))}
        </select>
        
        <select name="status" value={form.status} onChange={handleChange} style={{ marginRight: '10px' }}>
          <option value="aberto">Aberto</option>
          <option value="em_andamento">Em andamento</option>
          <option value="concluido">Concluído</option>
        </select>
        
        <input
          type="date"
          name="data_abertura"
          value={form.data_abertura}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        
        <button onClick={cadastrar}>Cadastrar</button>
      </div>

      <h3>Serviços Cadastrados</h3>
      <ul>
        {servicos.map((servico) => (
          <li key={servico.id} style={{ marginBottom: '8px' }}>
            <strong>{servico.descricao}</strong> 
            {' - '} Func: {resolver(funcionarios, servico.funcionario_id)} 
            {' - '} Equip: {resolver(equipamentos, servico.equipamento_id)} 
            {' - '} Cidade: {resolver(cidades, servico.cidade_id)} 
            {' - '} Status: {servico.status || 'aberto'}
            
            <select
              value={servico.status || 'aberto'}
              onChange={(event) => atualizarStatus(servico.id, event.target.value)}
              style={{ marginLeft: '10px' }}
            >
              <option value="aberto">Aberto</option>
              <option value="em_andamento">Em andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  )
}