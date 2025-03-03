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

  const { data: initialData, error: initialError } = await supabase
    .from('coffee_tracker')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (initialError) {
    console.error('Error obteniendo datos iniciales:', initialError)
    return null
  }
  if (!initialData) throw new Error('Datos iniciales no encontrados')

  const calculateBalance = (initialData.balance || 0) + balance
  const calculateCups = Math.floor(calculateBalance / cup_price)

  const { data, error } = await supabase
    .from('coffee_tracker')
    .update({
      balance: calculateBalance,
      cup_price,
      cups: calculateCups,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error actualizando datos:', error)
    return null
  }

  return data
}
