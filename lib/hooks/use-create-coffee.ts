import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateCoffeeRequest, createCoffeeApi } from '../api/create-coffee-api'

const useCreateCoffee = () => {
  const queryClient = useQueryClient()

  const createCoffee = useMutation({
    mutationFn: async (data: CreateCoffeeRequest) => {
      return await createCoffeeApi(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coffees'] })
    },
  })

  return createCoffee
}

export default useCreateCoffee
