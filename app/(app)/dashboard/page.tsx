import DashboardForm from '@/components/dashboard-form/dashboard-form'
import { getUserCoffeeApi } from '@/lib/api/get-coffee-user-api'
import { Auth } from '@/utils/auth'
import Configure from '../configure'
import Tracker from '../tracker'

export default async function Dashboard() {
  const user = await Auth()
  const { data } = await getUserCoffeeApi({ userId: user.id })

  return !data?.id ? <Configure userId={user.id} /> : <Tracker />
}
