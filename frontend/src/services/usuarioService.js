import api from './api';

export const usuarioService = {
  cadastrar: async (dadosUsuario) => {
    try {
      const response = await api.post('/usuarios', dadosUsuario);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Erro ao cadastrar usuário');
    }
  }
};