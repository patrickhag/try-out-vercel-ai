import { questions } from '@/db/dbSchema'
import { db } from '@/db/drizzle'
import { questionSchema, AddOnInfoSchema } from '@/validations/questionSchema'
import { generateObject } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createOpenAI } from '@ai-sdk/openai'
import { localData } from '@/lib/localData'

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
    return NextResponse.json({ data: data, status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
    NextResponse.json({ error: 'Error generating questions', status: 500 })
  }
}

// route.ts
export async function PUT(req: NextRequest) {
  const { userAnswers } = await req.json()

  // This is the imposed data from the backend (example provided earlier)

  // Step 1: Generate AI prompt by comparing user answers with expected answers
  let prompt = `Suppose you're a renowed teacher in ${localData.AddOnInfoSchema.task}. And you are tasked with evaluating a set of answers provided by a user in response to a questionnaire. Below are the questions, the user's answers, and the expected answers. Please provide feedback for each answer, so for checkbox and multiple-choice questions look at the user's answers and give him/her straight feedback according to what's correct, but for text and paragraphs type questions make a good judgement like a teacher.\n\n`

  localData.questionSchema.forEach((question) => {
    const userAnswer = userAnswers[question.id]
    const expectedAnswer = question.expectedAnswer

    // Step 2: Handle different question types when comparing answers
    let comparisonResult = ''

    switch (question.type) {
      case 'text':
      case 'paragraph':
        comparisonResult =
          "Compare the user's answer to the expected answer. like if you were the teacher who reasonates."
        break

      case 'checkbox':
        // Compare arrays for checkbox type questions
        const correctChoices = question.choices?.filter(
          (choice) => choice.isCorrect
        )
        // const isCorrectCheckbox =
        //   JSON.stringify(userAnswer.sort()) ===
        //   JSON.stringify(correctChoices.sort())
        comparisonResult = 'Be specific with what the correct answer is'
        break

      case 'multipleChoice':
        // Compare single-choice answers
        const correctChoice = question.choices?.find((choice) => choice.choice)
        comparisonResult = 'Be specific with the correct answer is'
        //   userAnswer === correctChoice
        //     ? 'Correct'
        //     : `Incorrect. The correct answer is: "${correctChoice}".`
        break

      case 'linearScale':
        // Linear scale comparison (exact or close match)
        comparisonResult =
          "On linear scale judge the user's answers based on text and description type answers"
        // userAnswer === expectedAnswer
        //   ? 'Correct'
        //   : `Incorrect. The correct answer is: "${expectedAnswer}".`
        break

      case 'range':
        // Range type: Check if the answer is within an acceptable range or exactly correct
        comparisonResult =
          'Check if the answer is within an acceptable range or exactly correct'
        // userAnswer === expectedAnswer
        //   ? 'Correct'
        //   : `Incorrect. The expected range is: "${question.metadata?.range.min}-${question.metadata.range.max}" and the correct answer is "${expectedAnswer}".`
        break
      case 'code':
        comparisonResult = "Judge the user's code based on what might work"

      case 'dropdown':
        comparisonResult =
          'Be specific with what the correct answer is or might work'
        // userAnswer === expectedAnswer
        //   ? 'Correct'
        //   : `Incorrect. The correct answer is: "${expectedAnswer}".`
        break

      default:
        comparisonResult = 'Unknown question type'
    }

    // Step 3: Append to the prompt
    prompt += `title: ${question.title}\n`
    prompt += `description: ${question.description}\n`
    prompt += `type: ${question.type}\n`
    prompt += `User's Answer: ${JSON.stringify(userAnswer)}\n`
    prompt += `Expected Answer: ${expectedAnswer}\n`
    prompt += `Evaluation: ${comparisonResult}\n\n`
  })

  console.log(prompt)

  // Step 4: Return the AI prompt in the response
  return NextResponse.json({ prompt, status: 200 })
}
