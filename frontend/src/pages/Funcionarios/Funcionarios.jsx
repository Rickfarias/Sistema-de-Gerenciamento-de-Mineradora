import { useCallback, useEffect, useState } from 'react'
import { cidadeService, funcionarioService } from '../../services/api'

const estadoInicial = {
  nome: '',
  cpf: '',
  telefone: '',
  email: '',
  cargo: '',
  cidade_id: ''
}

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [cidades, setCidades] = useState([])
  const [form, setForm] = useState(estadoInicial)
  const [erro, setErro] = useState('')

  const carregarDados = useCallback(async () => {
    try {
      const [funcionariosResponse, cidadesResponse] = await Promise.all([
        funcionarioService.listar(),
        cidadeService.listar()
      ])
      setFuncionarios(funcionariosResponse.data)
      setCidades(cidadesResponse.data)
      setErro('')
    } catch (error) {
      setErro(error.response?.data?.error || 'Erro ao carregar funcionarios')
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
    if (!form.nome || !form.cpf || !form.cargo || !form.cidade_id) {
      setErro('Preencha nome, CPF, cargo e cidade.')
      return
    }

    try {
      await funcionarioService.criar(form)
      setForm(estadoInicial)
      await carregarDados()
    } catch (error) {
      setErro(error.response?.data?.error || 'Erro ao cadastrar funcionario')
    }
  }

  const nomeCidade = (id) => cidades.find((cidade) => String(cidade.id) === String(id))?.nome || id

  return (
    <div>
      <h2>Gestao de Funcionarios</h2>

      {erro && <p style={{ color: 'crimson' }}>{erro}</p>}

      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Novo Funcionario</h3>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          name="cargo"
          placeholder="Cargo"
          value={form.cargo}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        <select name="cidade_id" value={form.cidade_id} onChange={handleChange} style={{ marginRight: '10px' }}>
          <option value="">Selecione a cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
          ))}
        </select>
        <button onClick={cadastrar}>Cadastrar</button>
      </div>

      <h3>Funcionarios Cadastrados</h3>
      <ul>
        {funcionarios.map((funcionario) => (
          <li key={funcionario.id}>
            <strong>{funcionario.nome}</strong> - {funcionario.cargo} - CPF: {funcionario.cpf} - Cidade: {nomeCidade(funcionario.cidade_id)}
          </li>
        ))}
      </ul>
    </div>
  )
}
