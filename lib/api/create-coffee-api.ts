import { createClient } from '@/utils/supabase/client'

export interface CreateCoffeeRequest {
  balance: number
  cup_price: number
}

export const createCoffeeApi = async ({
  balance,
  cup_price,
}: CreateCoffeeRequest) => {
  const supabase = createClient()

  const { data, error } = await supabase.from('coffee_tracker').insert([
    {
      balance,
      cup_price,
      cups: Math.floor(balance / cup_price),
    },
  ])

  if (error) {
    console.error('Error insertando datos:', error)
    return null
  }

  return data
}
