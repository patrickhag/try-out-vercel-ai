import { z } from 'zod'

export const markingSchema = z.array(
  z.object({
    score: z.number(),
    questionName: z.string(),
    type: z.string(),
    feedback: z.string(),
  })
)
