import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { createAnthropic } from '@ai-sdk/anthropic'
import { generateObject } from 'ai'
import { z } from 'zod'

export default async function Home() {
  const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const { object: data } = await generateObject({
    model: anthropic('claude-3-5-sonnet-20240620', {
      cacheControl: true,
    }),

    schema: z.object({
      questions: z.array(
        z.object({
          question: z.string(),
          options: z.array(z.string()),
        })
      ),
    }),
    prompt:
      'Create 9 multiple questions on React state intended for beginners. Ensure the output is a JSON object with an array of questions, each containing a question string, an array of four options, and the correct answer.',
  })

  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100'>
      <div className='flex flex-col items-center justify-center py-10'>
        <h1 className='my-5 text-center text-2xl font-bold'>
          Generated Questions
        </h1>
        <div className='grid grid-cols-3 gap-3'>
          {data.questions.map((questionData, index) => (
            <Card key={index} className='w-[400px] mb-4'>
              <CardHeader>
                <CardTitle>{questionData.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup>
                  {questionData.options.map((option, optIndex) => (
                    <div className='flex items-center space-x-2' key={optIndex}>
                      <RadioGroupItem
                        value={option}
                        id={`r${index}-${optIndex}`}
                      />
                      <Label htmlFor={`r${index}-${optIndex}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
