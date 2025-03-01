import { useQuery } from '@tanstack/react-query'
import { getUserCoffeeApi } from '../api/get-coffee-user-api'

export const useGetCoffeeId = (userId: string) => {
  return useQuery({
    queryKey: ['coffees'],
    queryFn: async () => {
      const { data } = await getUserCoffeeApi({ userId })

      if (!data) {
        return null
      }

      return data
    },
  })
}
