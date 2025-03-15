import { GoogleOAuthProvider } from '@react-oauth/google'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="w-full flex flex-col justify-center items-center p-48">
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
        <section>{children}</section>
      </GoogleOAuthProvider>
    </main>
  )
}
