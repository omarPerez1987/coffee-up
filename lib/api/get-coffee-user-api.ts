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

  const { id, user_id, balance, cup_price } = data

  const memoData = {
    id: id,
    user_id: user_id,
    balance: balance,
    cup_price: cup_price,
    cups: balance > 0 && cup_price > 0 ? Math.floor(balance / cup_price) : 0,
  }

  return { data: memoData, error }
}
