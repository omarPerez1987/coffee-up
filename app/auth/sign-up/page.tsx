import { signUpAction } from '@/app/actions'
import { FormMessage, Message } from '@/components/form-message'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default async function Signup(props: {
  searchParams: Promise<Message>
}) {
  const searchParams = await props.searchParams
  if ('message' in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    )
  }

  return (
    <>
      <form className="flex flex-col">
        <h1 className="text-2xl font-medium">Registrarse</h1>
        <p className="text-sm text text-foreground flex gap-2">
          Ya tienes una cuenta?
          <Link
            className="text-primary font-medium underline"
            href="/auth/sign-in"
          >
            Iniciar sesión
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="Dirección de correo electrónico"
            required
          />
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            minLength={6}
            required
          />
          <SubmitButton
            formAction={signUpAction}
            pendingText="Registrándose..."
          >
            Iniciar sesión
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  )
}
