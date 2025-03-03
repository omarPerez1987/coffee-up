import { createClient } from '@/utils/supabase/client'

export interface UpdateTrackerRequest {
  id: string
  balance: number
  cup_price: number
  cups: number
}

export const updateTrackerApi = async ({
  id,
  balance,
  cup_price,
  cups,
}: UpdateTrackerRequest) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('coffee_tracker')
    .update({
      balance: balance > 0 ? balance - cup_price : 0,
      cups: cups > 0 ? cups - 1 : 0,
    })
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error insertando datos:', error)
    return null
  }

  return data
}
