import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  UpdateTrackerRequest,
  updateTrackerApi,
} from '../api/update-tracker-api'

const useUpdateTracker = () => {
  const queryClient = useQueryClient()

  const updateCoffee = useMutation({
    mutationFn: async (data: UpdateTrackerRequest) => {
      const result = await updateTrackerApi(data)
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coffees'] })
    },
  })

  return updateCoffee
}

export default useUpdateTracker
