import { z } from 'zod'

export const coffeeSchema = z.object({
  totalAmount: z
    .string()
    .min(1)
    .max(5)
    .transform(val => Number.parseFloat(val.replace(',', '.'))),

  cupPrice: z
    .string()
    .min(1)
    .max(5)
    .transform(val => Number.parseFloat(val.replace(',', '.'))),
})
export type CoffeeForm = z.infer<typeof coffeeSchema>
