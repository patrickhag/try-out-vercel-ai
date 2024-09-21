import { tasks } from '@/db/dbSchema'
import { db } from '@/db/drizzle'
import { ParamType } from '@/types'
import { generateObject } from 'ai'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { markingSchema } from '@/validations/feedbackSchema'
import { z } from 'zod'
import { anthropic } from '@/lib/utils'

export async function GET(req: NextRequest, { params }: { params: ParamType }) {
  const { id } = params
  const data = await db.select().from(tasks).where(eq(tasks.id, id))
  return NextResponse.json({ data, status: 200 })
}

export async function PUT(req: NextRequest, { params }: { params: ParamType }) {
  try {
    const { id } = params
    const { userAnswers } = await req.json()

    const retrievedData = await db.select().from(tasks).where(eq(tasks.id, id))

    let markingPrompt = `You are a ${retrievedData[0].title} expert tasked with evaluating student answers. The student's answers are given below, along with the expected correct answers. For each question, provide a score and constructive feedback. The score should be based on a scale defined by the question type, and the feedback should help the student understand how they performed. Here's the breakdown:

    1. For "text" or "paragraph" questions: Evaluate the relevance, depth, and accuracy of the response.
    2. For "checkbox", "multiple choice", and "dropdown" questions: Indicate whether the answer is correct and provide reasoning if needed.
    3. For "code" questions: Evaluate the accuracy, efficiency, and best practices in the code.
    4. For "linear scale" questions: Compare the student's rating to the expected range and provide feedback.

    Below are the questions, expected answers, and the student's responses.

    `
    if (Array.isArray(retrievedData[0].questions)) {
      retrievedData[0].questions.forEach((question: any) => {
        const userAnswer = userAnswers[question.id]
        markingPrompt += `Question: ${question.title}\n`
        markingPrompt += `Description: ${question.description}\n`
        markingPrompt += `Question Type: ${question.type}\n`
        markingPrompt += `Student's Answer: ${JSON.stringify(userAnswer)}\n`

        switch (question.type) {
          case 'text':
            markingPrompt += `Evaluation: Evaluate the user's answer in compiltion with ${question.expectedAnswer}. Provide a score out of ${question.score}.\n`
            break
          case 'paragraph':
            markingPrompt += `Evaluation: Evaluate the user's answer in compiltion with ${question.expectedAnswer}. Provide a score out of ${question.score}.\n`
            break
          case 'checkbox':
            markingPrompt += `Expected Answer: ${JSON.stringify(
              question.choices
                ?.filter((c: any) => c.isCorrect)
                .map((c: any) => c.choice)
            )}\n`
            markingPrompt += `Evaluation: Score the answer based on how many correct choices were selected. Provide a score out of ${question.score}.\n`
            break
          case 'multiplechoice':
            markingPrompt += `Expected Answer: ${
              question.choices?.find((c: any) => c.isCorrect)?.choice
            }\n`
            markingPrompt += `Evaluation: Determine if the answer is correct and provide a score out of ${question.score}.\n`
            break
          case 'code':
            markingPrompt += `Expected Code: ${question.metadata?.codesInfo?.codeQuestion}\n`
            markingPrompt += `Evaluation: Assess the code for correctness and best practices. Provide a score out of ${question.score}.\n`
            break
          case 'linearscale':
            markingPrompt += `Expected Scale: ${question.expectedAnswer}\n`
            markingPrompt += `Evaluation: Compare the student's rating to the expected scale and provide a score out of ${question.score}.\n`
            break
          case 'range':
            markingPrompt += `Expected Range: ${question.expectedAnswer}\n`
            markingPrompt += `Evaluation: Compare the student's range to the expected range and provide a score out of ${question.score}.\n`
            break
          case 'dropdown':
            markingPrompt += `Expected Answer: ${
              question.choices?.find((c: any) => c.isCorrect)?.choice
            }\n`
            markingPrompt += `Evaluation: Provide a score based on correctness.\n`
            break
          default:
            markingPrompt += `Evaluation: Unrecognized question type.\n`
        }
        markingPrompt += '\n'
      })
    }

    const { object: data } = await generateObject({
      model: anthropic('claude-3-5-sonnet-20240620'),
      schema: z.object({ markingSchema }),
      prompt: markingPrompt,
    })

    return NextResponse.json({
      data,
      status: 200,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    NextResponse.json({ error: 'Error generating questions', status: 500 })
  }
}
