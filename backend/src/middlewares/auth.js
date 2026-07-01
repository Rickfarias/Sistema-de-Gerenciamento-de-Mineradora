import { supabase } from '../supabaseClient.js'

export const auth = async (req, res, next) => {
  const header = req.headers.authorization
  
  if (!header?.startsWith('Bearer ')) {
    const err = new Error('Token não enviado')
    err.status = 401
    return next(err) 
  }

  try {
    const token = header.split(' ')[1]
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      const err = new Error('Token inválido ou expirado')
      err.status = 401
      return next(err)
    }

    req.usuario = user
    next()
  } catch (err) {
    next(err) 
  }
}