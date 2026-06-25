import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

export const equipamentoService = {
  listar: () => api.get('/equipamentos'),
  criar: (dados) => api.post('/equipamentos', dados),
  atualizar: (id, dados) => api.put(`/equipamentos/${id}`, dados),
  deletar: (id) => api.delete(`/equipamentos/${id}`),
};

export const cidadeService = {
  listar: () => api.get('/cidades'),
  criar: (dados) => api.post('/cidades', dados),
  atualizar: (id, dados) => api.put(`/cidades/${id}`, dados),
  deletar: (id) => api.delete(`/cidades/${id}`),
};

export const funcionarioService = {
  listar: () => api.get('/funcionarios'),
  criar: (dados) => api.post('/funcionarios', dados),
  atualizar: (id, dados) => api.put(`/funcionarios/${id}`, dados),
  deletar: (id) => api.delete(`/funcionarios/${id}`),
};

export const servicoService = {
  listar: () => api.get('/servicos'),
  criar: (dados) => api.post('/servicos', dados),
  atualizar: (id, dados) => api.put(`/servicos/${id}`, dados),
  deletar: (id) => api.delete(`/servicos/${id}`),
};