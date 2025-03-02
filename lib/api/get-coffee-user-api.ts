import { createClient } from '@/utils/supabase/client'

export interface GetCoffeeUserRequest {
  userId: string
}

interface GetCoffeeUserResponse {
  data?: CoffeeTracker
  error: Error | null
}

export const getUserCoffeeApi = async ({
  userId,
}: GetCoffeeUserRequest): Promise<GetCoffeeUserResponse> => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('coffee_tracker')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (!data) return { data: undefined, error }

  const memoData = {
    id: data.id,
    user_id: data.user_id,
    total_amount: data.total_amount,
    cup_price: data.cup_price,
    cups: Math.floor(data.total_amount / data.cup_price),
    balance: data.total_amount,
  }

  return { data: memoData, error }
}
