import { createClient } from '@/utils/supabase/client'

export interface CreateCoffeeRequest {
  add?: number
  cup_price: number
}

export const createCoffeeApi = async ({
  add,
  cup_price,
}: CreateCoffeeRequest) => {
  const supabase = createClient()

  const { data, error } = await supabase.from('coffee_tracker').insert([
    {
      add,
      cup_price,
      cups: add ? Math.floor(add / cup_price) : 0,
    },
  ])

  if (error) {
    console.error('Error insertando datos:', error)
    return null
  }

  return data
}
