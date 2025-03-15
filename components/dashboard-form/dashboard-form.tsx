'use client'

import { useGetCoffeeId } from '@/lib/hooks/use-get-coffee-id'
import { Loader } from '@/lib/loader'
import CreateDashboardFormData from './create/create-form'
import UpdateFormData from './update/update-form'

export default function DashboardForm({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useGetCoffeeId(userId)

  if (isLoading) return <Loader />
  if (isError) throw new Error(`Error inesperado: ${isError}`)

  return !data?.data ? (
    <CreateDashboardFormData />
  ) : (
    <UpdateFormData defaultData={data?.data} />
  )
}
