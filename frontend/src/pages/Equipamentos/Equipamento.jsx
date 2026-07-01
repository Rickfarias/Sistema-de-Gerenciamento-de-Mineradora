import { useCallback, useEffect, useState } from 'react'
import { cidadeService, equipamentoService } from '../../services/api'

const estadoInicial = {
  nome: '',
  tipo: '',
  numero_serie: '',
  status: 'disponivel',
  cidade_id: ''
}

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([])
  const [cidades, setCidades] = useState([])
  const [form, setForm] = useState(estadoInicial)
  const [erro, setErro] = useState('')

  const carregarDados = useCallback(async () => {
    try {
      // Busca equipamentos e cidades ao mesmo tempo
      const [equipamentosResponse, cidadesResponse] = await Promise.all([
        equipamentoService.listar(),
        cidadeService.listar()
      ])
      setEquipamentos(equipamentosResponse.data)
      setCidades(cidadesResponse.data)
      setErro('')
    } catch (error) {
      setErro(error.response?.data?.error || 'Erro ao carregar dados')
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
    // Validação agora exige a cidade novamente
    if (!form.nome || !form.numero_serie || !form.tipo || !form.cidade_id) {
      setErro('Preencha nome, tipo, número de série e selecione uma cidade.')
      return
    }

    try {
      await equipamentoService.criar(form)
      setForm(estadoInicial)
      await carregarDados()
    } catch (error) {
      setErro(error.response?.data?.error || 'Erro ao cadastrar equipamento')
    }
  }

  const nomeCidade = (id) => cidades.find((cidade) => String(cidade.id) === String(id))?.nome || 'Não informada'

  return (
    <div>
      <h2>Gestão de Equipamentos</h2>

      {erro && <p style={{ color: 'crimson' }}>{erro}</p>}

      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Novo Equipamento</h3>
        
        <input
          type="text"
          name="nome"
          placeholder="Nome do equipamento"
          value={form.nome}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        
        <input
          type="text"
          name="tipo"
          placeholder="Tipo (ex: Ferramenta)"
          value={form.tipo}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        
        <input
          type="text"
          name="numero_serie"
          placeholder="Número de série"
          value={form.numero_serie}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        
        <select name="status" value={form.status} onChange={handleChange} style={{ marginRight: '10px' }}>
          <option value="disponivel">Disponível</option>
          <option value="em_uso">Em Uso</option>
          <option value="manutencao">Em Manutenção</option>
          <option value="inativo">Inativo</option>
        </select>
        
        {/* O select de Cidades voltou! */}
        <select name="cidade_id" value={form.cidade_id} onChange={handleChange} style={{ marginRight: '10px' }}>
          <option value="">Selecione a cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
          ))}
        </select>

        <button onClick={cadastrar}>Cadastrar</button>
      </div>

      <h3>Equipamentos Cadastrados</h3>
      <ul>
        {equipamentos.map((equipamento) => (
          <li key={equipamento.id}>
            <strong>{equipamento.nome}</strong> 
            {' - '} Tipo: {equipamento.tipo} 
            {' - '} Série: {equipamento.numero_serie} 
            {' - '} Status: {equipamento.status}
            {' - '} Cidade: {nomeCidade(equipamento.cidade_id)}
          </li>
        ))}
      </ul>
    </div>
  )
}