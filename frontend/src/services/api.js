import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

export const cidadeService = {
  listar: () => api.get('/cidades'),
  buscarPorId: (id) => api.get(`/cidades/${id}`),
  criar: (dados) => api.post('/cidades', dados),
  atualizar: (id, dados) => api.put(`/cidades/${id}`, dados),
  deletar: (id) => api.delete(`/cidades/${id}`)
}

export const equipamentoService = {
  listar: () => api.get('/equipamentos'),
  buscarPorId: (id) => api.get(`/equipamentos/${id}`),
  listarServicos: (id) => api.get(`/equipamentos/${id}/servicos`),
  criar: (dados) => api.post('/equipamentos', dados),
  atualizar: (id, dados) => api.put(`/equipamentos/${id}`, dados),
  deletar: (id) => api.delete(`/equipamentos/${id}`)
}

export const funcionarioService = {
  listar: () => api.get('/funcionarios'),
  buscarPorId: (id) => api.get(`/funcionarios/${id}`),
  criar: (dados) => api.post('/funcionarios', dados),
  atualizar: (id, dados) => api.put(`/funcionarios/${id}`, dados),
  deletar: (id) => api.delete(`/funcionarios/${id}`)
}

export const servicoService = {
  listar: (status) => api.get('/servicos', { params: status ? { status } : {} }),
  buscarPorId: (id) => api.get(`/servicos/${id}`),
  criar: (dados) => api.post('/servicos', dados),
  atualizar: (id, dados) => api.put(`/servicos/${id}`, dados),
  atualizarStatus: (id, status) => api.patch(`/servicos/${id}/status`, { status }),
  deletar: (id) => api.delete(`/servicos/${id}`)
}
