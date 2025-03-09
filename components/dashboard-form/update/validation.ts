import { z } from 'zod'

export const updateSchema = z.object({
  add: z
    .number()
    .min(0)
    .transform(val => Number.parseFloat(val.toString().replace(',', '.')))
    .optional(),

  cup_price: z
    .number()
    .min(0)
    .transform(val => Number.parseFloat(val.toString().replace(',', '.')))
    .optional(),

  cups: z.number().min(0).optional(),
})
export type UpdateData = z.infer<typeof updateSchema>
