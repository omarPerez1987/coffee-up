import DashboardForm from '@/components/dashboard-form/dashboard-form'

export default function Configure({ userId }: { userId: string }) {
  return <DashboardForm userId={userId} />
}
