import { choices, metadata, questions, tasks } from '@/db/dbSchema'
import { db } from '@/db/drizzle'
import { questionSchema, AddOnInfoSchema } from '@/validations/questionSchema'
import { generateObject } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createOpenAI } from '@ai-sdk/openai'
import { localData } from '@/lib/localData'
import { markingSchema } from '@/validations/feedbackSchema'

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
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const { object: data } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        AddOnInfoSchema,
        questionSchema,
      }),
      prompt: userPrompt,
    })
    console.log(JSON.stringify(data, null, 2))

    await db.transaction(async (tx: any) => {
      const insertedTask = await tx
        .insert(tasks)
        .values({
          title: topic,
          description: description,
          difficulty: difficulty,
        })
        .returning({ id: tasks.id })

      const taskId = insertedTask[0].id

      for (const question of data.questionSchema) {
        const insertedQuestion = await tx
          .insert(questions)
          .values({
            taskId: taskId,
            title: question.title,
            description: question.description,
            version: question.version,
            type: question.type,
            score: question.score,
          })
          .returning({ id: questions.id })

        const questionId = insertedQuestion[0].id

        if ('choices' in question && question.choices) {
          for (const choice of question.choices) {
            await tx.insert(choices).values({
              choice: choice.choice,
              isCorrect: choice.isCorrect,
              questionId: questionId,
            })
          }
        }

        if ('metadata' in question && question.metadata) {
          await tx.insert(metadata).values({
            metadata: question.metadata,
            questionId: questionId,
          })
        }
      }
    })

    return NextResponse.json({ data: data, status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    NextResponse.json({ error: 'Error generating questions', status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const { userAnswers } = await req.json()

  let markingPrompt = `You are a ${localData.AddOnInfoSchema.task} expert tasked with evaluating student answers. The student's answers are given below, along with the expected correct answers. For each question, provide a score and constructive feedback. The score should be based on a scale defined by the question type, and the feedback should help the student understand how they performed. Here's the breakdown:

  1. For "text" or "paragraph" questions: Evaluate the relevance, depth, and accuracy of the response.
  2. For "checkbox", "multiple choice", and "dropdown" questions: Indicate whether the answer is correct and provide reasoning if needed.
  3. For "code" questions: Evaluate the accuracy, efficiency, and best practices in the code.
  4. For "linear scale" questions: Compare the student's rating to the expected range and provide feedback.

  Below are the questions, expected answers, and the student's responses.

  `

  localData.questionSchema.forEach((question) => {
    const userAnswer = userAnswers[question.id]
    markingPrompt += `Question: ${question.title}\n3`
    markingPrompt += `Description: ${question.description}\n`
    markingPrompt += `Question Type: ${question.type}\n`
    markingPrompt += `Student's Answer: ${JSON.stringify(userAnswer)}\n`

    switch (question.type) {
      case 'text':
        markingPrompt += `Evaluation: Evaluate the answer based on relevance and clarity. Provide a score out of ${question.score}.\n`
        break
      case 'paragraph':
        markingPrompt += `Evaluation: Evaluate the answer based on relevance and clarity. Provide a score out of ${question.score}.\n`
        break
      case 'checkbox':
        markingPrompt += `Expected Answer: ${JSON.stringify(
          question.choices?.filter((c) => c.isCorrect).map((c) => c.choice)
        )}\n`
        markingPrompt += `Evaluation: Score the answer based on how many correct choices were selected. Provide a score out of ${question.score}.\n`
        break
      case 'multipleChoice':
        markingPrompt += `Expected Answer: ${
          question.choices?.find((c) => c.isCorrect)?.choice
        }\n`
        markingPrompt += `Evaluation: Determine if the answer is correct and provide a score out of ${question.score}.\n`
        break
      case 'code':
        markingPrompt += `Expected Code: ${question.metadata?.codesInfo?.codeQuestion}\n`
        markingPrompt += `Evaluation: Assess the code for correctness and best practices. Provide a score out of ${question.score}.\n`
        break
      case 'linearScale':
        markingPrompt += `Expected Scale: 1 to ${question.metadata?.linearScale?.toRangeValue}\n`
        markingPrompt += `Evaluation: Compare the student's rating to the expected scale and provide a score out of ${question.score}.\n`
        break
      case 'dropdown':
        markingPrompt += `Expected Answer: ${
          question.choices?.find((c) => c.isCorrect)?.choice
        }\n`
        markingPrompt += `Evaluation: Provide a score based on correctness.\n`
        break
      default:
        markingPrompt += `Evaluation: Unrecognized question type.\n`
    }
    markingPrompt += '\n'
  })

  try {
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const { object: data } = await generateObject({
      model: openai('gpt-4o'),
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
