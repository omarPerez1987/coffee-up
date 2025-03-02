import { CoffeeFormData } from '@/components/dashboard-form/validation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCoffeeApi } from '../api/create-coffee-api'
import { useAuthenticate } from './use-authenticate'

const useCreateCoffee = () => {
  const queryClient = useQueryClient()

  const createCoffee = useMutation({
    mutationFn: async (data: CoffeeFormData) => {
      return await createCoffeeApi(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coffees'] })
    },
  })

  return createCoffee
}

export default useCreateCoffee
