import { createClient } from '@/utils/supabase/client'

export interface CreateCoffeeRequest {
  totalAmount: number
  cupPrice: number
}

export const createCoffeeApi = async ({
  totalAmount,
  cupPrice,
}: CreateCoffeeRequest) => {
  const supabase = createClient()

  const { data, error } = await supabase.from('coffee_tracker').insert([
    {
      total_amount: totalAmount,
      cup_price: cupPrice,
      cups: 0,
      balance: totalAmount,
    },
  ])

  if (error) {
    console.error('Error insertando datos:', error)
    return null
  }

  return data
}
