import { supabase } from '../supabaseClient.js'
import { UsuarioModel } from '../models/Usuario.js'

export const cadastrar = async ({ nome, email, senha, role }) => {
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: email,
    password: senha,
    email_confirm: true, 
    user_metadata: { nome, role }
  })

  if (authError) throw authError

  const novoUsuario = await UsuarioModel.create({
    id: authData.user.id,
    nome,
    email,
    role: role || 'comum'
  })

  return novoUsuario
}