import { Link } from 'react-router-dom'
import useFetch from '../../hooks/UseFetch'
import { cidadeService } from '../../services/cidadeService'

export default function ListarCidades() {
  const { data: cidades, loading, error, refetch } = useFetch(() => cidadeService.listar())

  const handleDeletar = async (id) => {
    if (!confirm('Remover esta cidade?')) return
    try {
      await cidadeService.deletar(id)
      refetch()
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao remover cidade')
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Cidades</h1>
        <Link to="/cidades/cadastrar" className="btn btn-primary">Nova Cidade</Link>
      </div>

      {loading && <p className="estado-feedback">Carregando...</p>}
      {error && <p className="estado-feedback estado-erro">{error}</p>}

      {!loading && !error && (
        <table className="tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Estado</th>
              <th>CEP</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cidades?.length === 0 && (
              <tr>
                {/* colSpan atualizado para 5 devido à nova coluna CEP */}
                <td colSpan={5} className="tabela-vazia">Nenhuma cidade cadastrada.</td>
              </tr>
            )}
            {cidades?.map((cidade) => (
              <tr key={cidade.id}>
                <td>{cidade.id}</td>
                <td>{cidade.nome}</td>
                <td>{cidade.estado}</td>
                <td>{cidade.cep}</td>
                <td className="acoes">
                  <Link to={`/cidades/editar/${cidade.id}`} className="btn btn-secondary">Editar</Link>
                  <button onClick={() => handleDeletar(cidade.id)} className="btn btn-perigo">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}