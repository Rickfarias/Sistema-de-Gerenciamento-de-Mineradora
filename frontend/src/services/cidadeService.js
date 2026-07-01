import api from './api.js'

export const cidadeService = {
  listar: () => api.get('/cidades'),
  buscarPorId: (id) => api.get(`/cidades/${id}`),
  criar: (dados) => api.post('/cidades', dados),
  atualizar: (id, dados) => api.put(`/cidades/${id}`, dados),
  deletar: (id) => api.delete(`/cidades/${id}`)
}