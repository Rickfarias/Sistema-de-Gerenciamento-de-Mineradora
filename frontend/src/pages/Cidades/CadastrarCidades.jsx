import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { cidadeService } from '../../services/cidadeService'

const UFS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

const estadoInicial = { nome: '', estado: '', cep: '' }

export default function CadastrarCidades() {
  const navigate = useNavigate()
  const [form, setForm] = useState(estadoInicial)
  const [erro, setErro] = useState(null)
  const [salvando, setSalvando] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSalvando(true)
    setErro(null)
    try {
      await cidadeService.criar(form)
      navigate('/cidades')
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao cadastrar cidade')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Nova Cidade</h1>
        <Link to="/cidades" className="btn btn-secondary">Voltar</Link>
      </div>

      {erro && <p className="estado-feedback estado-erro">{erro}</p>}

      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="estado">Estado (UF)</label>
          <select
            id="estado"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {UFS.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="cep">CEP</label>
          <input
            id="cep"
            name="cep"
            type="text"
            value={form.cep}
            onChange={handleChange}
            placeholder="00000-000"
            required
          />
        </div>

        <div className="formulario-acoes">
          <button type="submit" className="btn btn-primary" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  )
}