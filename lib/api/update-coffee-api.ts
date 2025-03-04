import { createClient } from '@/utils/supabase/client'

export interface UpdateCoffeeRequest {
  id: string
  add?: number
  cup_price: number
}

export const updateCoffeeApi = async ({
  id,
  add = 0,
  cup_price,
}: UpdateCoffeeRequest) => {
  const supabase = createClient()

  const { data: initialData, error: initialError } = await supabase
    .from('coffee_tracker')
    .select('balance')
    .eq('id', id)
    .maybeSingle()

  if (initialError || !initialData) {
    console.error(
      'Error obteniendo datos iniciales:',
      initialError || 'Datos no encontrados'
    )
    return null
  }

  const newBalance = initialData.balance + (add ?? 0)
  const newCups = newBalance > 0 ? Math.floor(newBalance / cup_price) : 0

  const { data, error } = await supabase
    .from('coffee_tracker')
    .update({ balance: newBalance, cup_price, cups: newCups })
    .eq('id', id)
    .select('id, balance, cup_price, cups')
    .single()

  if (error) {
    console.error('Error actualizando datos:', error)
    return null
  }

  return data
}
