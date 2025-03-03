import useUpdateTracker from '@/lib/hooks/use-update-tracker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { TrackerFormData, trackerSchema } from './validation'

type UseTrackerFormProps = {
  defaultData?: CoffeeTracker
}

export function useTrackerForm({ defaultData }: UseTrackerFormProps) {
  const updateCoffee = useUpdateTracker()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const form = useForm<TrackerFormData>({
    resolver: zodResolver(trackerSchema),
    defaultValues: {
      balance: defaultData?.balance ?? 0,
      cups: defaultData?.cups ?? 0,
    },
  })

  async function onSubmit(data: TrackerFormData) {
    setError(undefined)
    setIsLoading(true)

    try {
      if (defaultData?.id) {
        await updateCoffee.mutateAsync({
          id: defaultData.id,
          cup_price: defaultData.cup_price,
          ...data,
        })
      }
      setIsLoading(false)
      toast.success('Datos guardados correctamente')
    } catch (error) {
      if (error instanceof Error) setError(error.message)
      setIsLoading(false)
    }
  }

  return {
    form,
    onSubmit,
    isLoading,
    error,
  }
}
