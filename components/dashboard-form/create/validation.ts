import { z } from 'zod'

export const createCoffeeSchema = z.object({
  add: z.coerce
    .number()
    .min(0)
    .transform(val => Number.parseFloat(val.toString().replace(',', '.'))),

  cup_price: z.coerce
    .number()
    .min(0)
    .transform(val => Number.parseFloat(val.toString().replace(',', '.'))),
})
export type CreateFormData = z.infer<typeof createCoffeeSchema>
