import useCreateCoffee from '@/lib/hooks/use-create-coffee'
import useUpdateCoffee from '@/lib/hooks/use-update-coffee'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CoffeeFormData, coffeeSchema } from './validation'

type UseDashboardFormProps = {
  defaultData?: CoffeeTracker
}

export function useDashboardForm({ defaultData }: UseDashboardFormProps) {
  const router = useRouter()
  const createCoffee = useCreateCoffee()
  const updateCoffee = useUpdateCoffee()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const form = useForm<CoffeeFormData>({
    resolver: zodResolver(coffeeSchema),
    defaultValues: {
      add: undefined,
      cup_price: defaultData?.cup_price ?? 0,
    },
  })

  async function onSubmit(data: CoffeeFormData) {
    setError(undefined)
    setIsLoading(true)

    try {
      if (defaultData?.id) {
        await updateCoffee.mutateAsync({
          id: defaultData.id,
          add: data.add,
          cup_price: data.cup_price,
        })
      } else {
        await createCoffee.mutateAsync(data)
      }
      setIsLoading(false)
      toast.success('Datos guardados correctamente')
      router.push('/tracker')
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
