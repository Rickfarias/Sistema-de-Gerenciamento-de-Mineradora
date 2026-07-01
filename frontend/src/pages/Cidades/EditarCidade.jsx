import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import useFetch from '../../hooks/UseFetch'
import { cidadeService } from '../../services/cidadeService'

const UFS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

export default function EditarCidade() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: cidade, loading, error } = useFetch(() => cidadeService.buscarPorId(id), [id])

  const [form, setForm] = useState({ nome: '', estado: '', cep: '' })
  const [erro, setErro] = useState(null)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cidade) setForm({ nome: cidade.nome, estado: cidade.estado, cep: cidade.cep || '' })
  }, [cidade])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSalvando(true)
    setErro(null)
    try {
      await cidadeService.atualizar(id, form)
      navigate('/cidades')
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao atualizar cidade')
    } finally {
      setSalvando(false)
    }
  }

  if (loading) return <p className="estado-feedback">Carregando...</p>
  if (error) return <p className="estado-feedback estado-erro">{error}</p>

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Editar Cidade</h1>
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
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </div>
      </form>
    </div>
  )
}