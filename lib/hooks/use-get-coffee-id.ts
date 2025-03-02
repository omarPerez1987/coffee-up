import { useQuery } from '@tanstack/react-query'
import { getUserCoffeeApi } from '../api/get-coffee-user-api'

export const useGetCoffeeId = (userId: string) => {
  return useQuery({
    queryKey: ['coffees', 'get', userId],
    queryFn: async () => {
      const result = await getUserCoffeeApi({ userId })
      if (!result.data) return { data: undefined, error: result.error }

      if (result.data) return { data: result.data }
    },
  })
}
