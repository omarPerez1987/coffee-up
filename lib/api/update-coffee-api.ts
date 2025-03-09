import { createClient } from '@/utils/supabase/client'

export interface UpdateCoffeeRequest {
  id: string
  balance: number
  cup_price: number
}

export const updateCoffeeApi = async ({
  id,
  balance,
  cup_price,
}: UpdateCoffeeRequest) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('coffee_tracker')
    .update({
      balance,
      cup_price,
      cups: balance > 0 ? Math.floor(balance / cup_price) : 0,
    })
    .eq('id', id)
    .select('id, balance, cup_price, cups')
    .single()

  if (error) {
    console.error('Error actualizando datos:', error)
    return null
  }

  return data
}
