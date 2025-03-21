import { signInAction } from '@/app/actions'
import { FormMessage, Message } from '@/components/form-message'
import { SubmitButton } from '@/components/submit-button'
import { ButtonGoogle } from '@/components/submit-google'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams

  return (
    <form className="flex-1 flex flex-col max-w-md">
      <h1 className="text-2xl font-medium">Iniciar sesión</h1>
      <p className="text-sm text-foreground flex gap-2">
        ¿No tienes una cuenta?
        <Link
          className="text-foreground font-medium underline"
          href="/auth/sign-up"
        >
          Regístrate
        </Link>
      </p>

      <div className="flex flex-col gap-2 mt-8">
        <ButtonGoogle />
        <div className="flex gap-3 w-full justify-center items-center">
          <span className="border-b border-foreground/10 w-full" />
          <span>o</span>
          <span className="border-b border-foreground/10 w-full" />
        </div>
      </div>

      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          placeholder="Dirección de correo electrónico"
          required
        />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Contraseña</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/auth/forgot-password"
          >
            He olvidado mi contraseña
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Tu contraseña"
          required
        />
        <SubmitButton
          pendingText="Iniciando sesión..."
          formAction={signInAction}
        >
          Iniciar sesión
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>

      <div className="flex flex-col gap-2 mt-8 text-xs">
        <span>
          Al registrarse para crear una cuenta, usted acepta nuestros términos
          de servicio y política de privacidad.
        </span>
      </div>
    </form>
  )
}
