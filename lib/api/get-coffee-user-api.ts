import { createClient } from '@/utils/supabase/client'

export interface GetCoffeeUserRequest {
  userId: string
}

interface GetCoffeeUserResponse {
  data: CoffeeTracker | null
}

export const getUserCoffeeApi = async ({
  userId,
}: GetCoffeeUserRequest): Promise<GetCoffeeUserResponse> => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('coffee_tracker')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error obteniendo datos:', error)
  }

  return { data }
}
