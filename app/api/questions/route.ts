import { db } from '@/db/drizzle'
import { questionSchema, AddOnInfoSchema } from '@/validations/questionSchema'
import { generateObject } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { tasks } from '@/db/dbSchema'
import { anthropic } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const data = await db.select().from(tasks)
  return NextResponse.json({ data, status: 200 })
}

export const maxDuration = 30

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
  
  Task: "${topic}"
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
  try {
    const { object: data } = await generateObject({
      model: anthropic('claude-3-5-sonnet-20240620'),
      schema: z.object({
        AddOnInfoSchema,
        questionSchema,
      }),
      prompt: userPrompt,
    })

    const insertedTask = await db
      .insert(tasks)
      .values({
        title: topic,
        description: description,
        difficulty: difficulty,
        questions: data.questionSchema,
      })
      .returning({ id: tasks.id })
    const id = insertedTask[0].id
    if (insertedTask.length !== 0) {
      return NextResponse.json({ taskId: id, status: 200 })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    NextResponse.json({ error: 'Error generating questions', status: 500 })
  }
}
