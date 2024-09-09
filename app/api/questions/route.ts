import { PromptType } from '@/types'
import { questionSchema, DifficultyEnum } from '@/validations/questionSchema'
import { createAnthropic } from '@ai-sdk/anthropic'
import { generateObject } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const { topic, description, difficulty, questionTypes } = await req.json()

  const questionTypesArray: string[] = []

  Object.keys(questionTypes).forEach((key) => {
    if (questionTypes[key]) {
      questionTypesArray.push(`${key}: ${questionTypes[key]}`)
    }
  })

  const userPrompt = `
  You are tasked with generating a set of questions for the following topic:
  
  Topic: "${topic}"
  Description: "${description}"
  
  The level of difficulty for the questions should be "${difficulty}".
  
  For each question, ensure the following:
  1. Each question must have a unique UUID as its identifier.
  2. If the question includes choices (e.g., multiple-choice or checkbox), each choice must also have a unique UUID as well.
  
  The following types of questions are required:
  ${
    questionTypesArray.length
      ? questionTypesArray.join('\n  ')
      : 'No specific question types provided'
  }
  
  Please generate questions accordingly.
`
  console.log(userPrompt)

  try {
    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
    const { object: data } = await generateObject({
      model: anthropic('claude-3-5-sonnet-20240620', {
        cacheControl: true,
      }),
      schema: z.object({ levelOfDifficulty: DifficultyEnum, questionSchema }),
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
