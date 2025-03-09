import useCreateCoffee from '@/lib/hooks/use-create-coffee'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CreateFormData, createCoffeeSchema } from './validation'

export function useCreateForm() {
  const createCoffee = useCreateCoffee()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const form = useForm<CreateFormData>({
    resolver: zodResolver(createCoffeeSchema),
    defaultValues: {
      add: undefined,
      cup_price: undefined,
    },
  })

  async function onSubmit(data: CreateFormData) {
    setError(undefined)
    setIsLoading(true)

    try {
      await createCoffee.mutateAsync(data)

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
