import DashboardForm from '@/components/dashboard-form/dashboard-form'
import TrackerForm from '@/components/dashboard-form/update/update-form'
import { Auth } from '@/utils/auth'

export default async function Tracker() {
  const user = await Auth()

  return <TrackerForm userId={user?.id} />
}
