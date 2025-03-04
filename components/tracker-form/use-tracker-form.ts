import useUpdateTracker from '@/lib/hooks/use-update-tracker'
import { useState } from 'react'
import { toast } from 'sonner'

type UseTrackerFormProps = {
  defaultData?: CoffeeTracker
}

export function useTrackerForm({ defaultData }: UseTrackerFormProps) {
  const updateCoffee = useUpdateTracker()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  async function onSubmit() {
    setError(undefined)
    setIsLoading(true)

    try {
      if (defaultData?.id) {
        await updateCoffee.mutateAsync(defaultData)
      }
      setIsLoading(false)
      toast.success('Datos guardados correctamente')
    } catch (error) {
      if (error instanceof Error) setError(error.message)
      setIsLoading(false)
    }
  }

  return {
    onSubmit,
    isLoading,
    error,
  }
}
