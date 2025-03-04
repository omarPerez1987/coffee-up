'use client'

import { Button } from '@/components/ui/button'
import { useGetCoffeeId } from '@/lib/hooks/use-get-coffee-id'
import { Loader } from '@/lib/loader'
import { useTrackerForm } from './use-tracker-form'

function TrackerFormData({ defaultData }: { defaultData?: CoffeeTracker }) {
  const { onSubmit, isLoading, error } = useTrackerForm({ defaultData })

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-4">
      <Button
        disabled
        className="rounded-full text-5xl h-32 w-32 bg-primary cursor-default"
      >
        {defaultData?.balance ?? 0}
      </Button>

      <Button
        onClick={() => onSubmit()}
        className="rounded-full text-5xl h-32 w-32"
      >
        {defaultData?.cups ?? 0}
      </Button>
    </section>
  )
}

export default function TrackerForm({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useGetCoffeeId(userId)

  if (isLoading) return <Loader />
  if (isError) throw new Error(`Error inesperado: ${isError}`)

  return <TrackerFormData defaultData={data?.data} />
}
