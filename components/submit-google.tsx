'use client'

import { createClient } from '@/utils/supabase/client'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { redirect } from 'next/navigation'

export function ButtonGoogle() {
  const supabase = createClient()

  async function handleSignInWithGoogle(response: CredentialResponse) {
    if (!response.credential) {
      console.error('Error: No se recibió un token de Google')
      return
    }

    const { error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    })

    if (error) {
      console.error('Error de autenticación con Google:', error)
      return
    }

    return redirect('/dashboard')
  }

  return <GoogleLogin onSuccess={handleSignInWithGoogle} />
}
