'use-client'

import useCreateCoffee from '@/lib/hooks/use-create-coffee'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CoffeeForm, coffeeSchema } from './validation'

interface dashboardFormProps {
  defaultData: CoffeeTracker
}

export const useDashboardForm = ({ defaultData }: dashboardFormProps) => {
  const createCoffee = useCreateCoffee()

  // if (!defaultData) return null
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<CoffeeForm>({
    resolver: zodResolver(coffeeSchema),
    defaultValues: {
      totalAmount: defaultData?.total_amount || 0,
      cupPrice: defaultData?.cup_price || 0,
    },
  })

  const onSubmit = async (data: CoffeeForm) => {
    setIsLoading(true)

    try {
      await createCoffee.mutateAsync(data)
    } catch (error) {
      setError('No se ha podido realizar la operación')
    }

    setIsLoading(false)
  }

  return { form, onSubmit, isLoading, error }
}
