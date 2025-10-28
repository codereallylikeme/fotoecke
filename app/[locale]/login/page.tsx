import LoginForm from './LoginForm'

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const resolved = await params
  return <LoginForm locale={resolved.locale} />
}