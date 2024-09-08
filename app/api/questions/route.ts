import { questionSchema } from '@/validations/questionSchema'
import { createAnthropic } from '@ai-sdk/anthropic'
import { generateObject } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const { topic, description } = await req.json()

  const userPrompt = `
      Topic: ${topic}.
      Description: ${description}. Ensure each question has a unique UUID for its ID. For the question choices make sure that they have unique UUIDs as well.`

  try {
    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
    const { object: data } = await generateObject({
      model: anthropic('claude-3-5-sonnet-20240620', {
        cacheControl: true,
      }),
      schema: z.object({ questionSchema }),
      prompt: userPrompt,
    })
    return NextResponse.json({ data: data, status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    NextResponse.json({ error: 'Error generating questions', status: 500 })
  }
}
