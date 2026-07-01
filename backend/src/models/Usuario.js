import { supabase } from '../supabaseClient.js'

export const UsuarioModel = {
  create: async ({ id, nome, email, role }) => {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ id, nome, email, role }])
      .select()
      .single()

    if (error) throw error
    return data
  }
}