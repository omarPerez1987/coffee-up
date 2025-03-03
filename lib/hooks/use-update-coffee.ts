import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UpdateCoffeeRequest, updateCoffeeApi } from '../api/update-coffee-api'

const useUpdateCoffee = () => {
  const queryClient = useQueryClient()

  const updateCoffee = useMutation({
    mutationFn: async (data: UpdateCoffeeRequest) => {
      const result = await updateCoffeeApi(data)
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coffees'] })
    },
  })

  return updateCoffee
}

export default useUpdateCoffee
