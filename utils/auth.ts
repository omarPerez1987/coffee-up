import { createClient } from './supabase/server'

export async function Auth() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('No se ha podido autenticar')
  }

  return user
}
