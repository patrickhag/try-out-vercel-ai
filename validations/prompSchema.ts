import { z } from 'zod'

export const PromptSchema = z.object({
  topic: z.string(),
  description: z.string(),
  difficulty: z.string(),
})
