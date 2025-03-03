import { z } from 'zod'

export const trackerSchema = z.object({
  balance: z.number().min(1).max(1000),
  cups: z.number().min(1).max(1000),
})
export type TrackerFormData = z.infer<typeof trackerSchema>
