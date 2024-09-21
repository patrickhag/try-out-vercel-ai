import { createAnthropic } from '@ai-sdk/anthropic'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateAverage(data: any) {
  const markingSchema = data.data.markingSchema
  const maxScorePerQuestion = 5
  const totalPossibleScore = markingSchema.length * maxScorePerQuestion

  const totalScore = markingSchema.reduce(
    (sum: any, question: any) => sum + question.score,
    0
  )

  const percentage = (totalScore / totalPossibleScore) * 100

  return percentage.toFixed(2)
}

export const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})
