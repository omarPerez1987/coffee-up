import { z } from 'zod'

export const coffeeSchema = z.object({
  balance: z
    .string()
    .min(1)
    .max(5)
    .transform(val => Number.parseFloat(val.replace(',', '.'))),

  cup_price: z
    .string()
    .min(1)
    .max(5)
    .transform(val => Number.parseFloat(val.replace(',', '.'))),
})
export type CoffeeFormData = z.infer<typeof coffeeSchema>
