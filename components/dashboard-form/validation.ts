import { z } from 'zod'

export const coffeeSchema = z.object({
  add: z
    .number()
    .min(0)
    .transform(val => Number.parseFloat(val.toString().replace(',', '.')))
    .optional(),

  cup_price: z
    .number()
    .min(0)
    .transform(val => Number.parseFloat(val.toString().replace(',', '.'))),
})
export type CoffeeFormData = z.infer<typeof coffeeSchema>
