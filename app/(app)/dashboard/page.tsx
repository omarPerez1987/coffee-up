import DashboardForm from '@/components/dashboard-form/dashboard-form'
import { Auth } from '@/utils/auth'

export default async function Dashboard() {
  const user = await Auth()

  return <DashboardForm userId={user.id} />
}
