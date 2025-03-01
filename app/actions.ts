'use server'

import { createClient } from '@/utils/supabase/server'
import { encodedRedirect } from '@/utils/utils'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  if (!email || !password) {
    return encodedRedirect(
      'error',
      '/auth/sign-up',
      'Email y contraseña son requeridos'
    )
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(`${error.code} ${error.message}`)
    return encodedRedirect('error', '/auth/sign-up', error.message)
  }
  return encodedRedirect(
    'success',
    '/auth/sign-up',
    '¡Gracias por registrarte! Por favor, revisa tu correo electrónico para un enlace de verificación.'
  )
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return encodedRedirect('error', '/auth/sign-in', error.message)
  }

  return redirect('/dashboard')
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString()
  const supabase = await createClient()
  const origin = (await headers()).get('origin')
  const callbackUrl = formData.get('callbackUrl')?.toString()

  if (!email) {
    return encodedRedirect(
      'error',
      '/auth/forgot-password',
      'Email is required'
    )
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/auth/reset-password`,
  })

  if (error) {
    console.error(error.message)
    return encodedRedirect(
      'error',
      '/auth/forgot-password',
      'No se pudo restablecer la contraseña'
    )
  }

  if (callbackUrl) {
    return redirect(callbackUrl)
  }

  return encodedRedirect(
    'success',
    '/auth/forgot-password',
    'Revisa tu correo electrónico para un enlace para restablecer tu contraseña.'
  )
}

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/auth/reset-password',
      'Contraseña y confirmar contraseña son requeridos'
    )
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      '/auth/reset-password',
      'Las contraseñas no coinciden'
    )
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    encodedRedirect(
      'error',
      '/auth/reset-password',
      'La contraseña no se actualizó'
    )
  }

  encodedRedirect('success', '/auth/reset-password', 'Password updated')
}

export const signOutAction = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/auth/sign-in')
}
