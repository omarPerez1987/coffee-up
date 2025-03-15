import useUpdateCoffee from '@/lib/hooks/use-update-coffee'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { UpdateData, updateSchema } from './validation'

type UseDashboardFormProps = {
  defaultData: CoffeeTracker
}

export function useUpdateForm({ defaultData }: UseDashboardFormProps) {
  const updateCoffee = useUpdateCoffee()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const form = useForm<UpdateData>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      add: undefined,
      cup_price: defaultData?.cup_price ?? 0,
      cups: defaultData?.cups ?? 0,
    },
  })

  async function onSubmit(data: UpdateData) {
    setError(undefined)
    setIsLoading(true)

    const { add, cup_price, cups } = data
    let balance = defaultData.balance

    if (add) {
      balance = Number(defaultData.balance) + Number(add)
    } else if (cups) {
      balance = Number(defaultData.balance) - Number(defaultData.cup_price)
    }

    try {
      await updateCoffee.mutateAsync({
        id: defaultData.id,
        balance: balance > 0 ? balance : 0,
        cup_price: cup_price ? cup_price : defaultData.cup_price,
      })

      setIsLoading(false)
      toast.success('Datos guardados correctamente')
      form.reset()
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
