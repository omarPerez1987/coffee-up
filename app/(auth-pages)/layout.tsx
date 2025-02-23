import { GoogleOAuthProvider } from '@react-oauth/google'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-4xl flex flex-col">
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
        {children}
      </GoogleOAuthProvider>
    </div>
  )
}
