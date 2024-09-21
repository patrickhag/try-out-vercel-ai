import { PromptSchema } from '@/validations/prompSchema'
import { z } from 'zod'

export type PromptType = z.infer<typeof PromptSchema>

export type ParamType = { id: string }
