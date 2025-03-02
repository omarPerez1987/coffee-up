import useCreateCoffee from '@/lib/hooks/use-create-coffee'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CoffeeFormData, coffeeSchema } from './validation'

type UseDashboardFormProps = {
  defaultData?: CoffeeTracker
}

export function useDashboardForm({ defaultData }: UseDashboardFormProps) {
  const createCoffee = useCreateCoffee()
  // const updateCoffee = useUpdateCoffee()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const form = useForm<CoffeeFormData>({
    resolver: zodResolver(coffeeSchema),
    defaultValues: {
      totalAmount: defaultData?.total_amount ?? 0,
      cupPrice: defaultData?.cup_price ?? 0,
    },
  })

  async function onSubmit(data: CoffeeFormData) {
    setError(undefined)
    setIsLoading(true)
    console.log(data)

    try {
      if (defaultData?.id) {
        // await updateAddress.mutateAsync({
        //   id: defaultData.id,
        //   data,
        // })
      } else {
        // await createCoffee.mutateAsync({
        //   data,
        // })
      }
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
