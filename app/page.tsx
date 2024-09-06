'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PromptSchema } from '@/validations/prompSchema'
import { PromptType } from '@/types'
import { useCreateQuestions } from '@/hooks'
import { Loader } from '@/components/Loader'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Include the Quill styling

export default function Home() {
  const { register, handleSubmit } = useForm<PromptType>({
    resolver: zodResolver(PromptSchema),
  })

  const addTodoMutation = useCreateQuestions()
  const [value, setValue] = useState('')

  const onSubmit: SubmitHandler<PromptType> = (userPrompt) => {
    addTodoMutation.mutate(userPrompt)
    // console.log(userPrompt)
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-rose-100 to-teal-100'>
      <div className='flex flex-col items-center justify-center py-100 max-w-4xl mx-auto'>
        <h1 className='sm:my-5 text-center text-2xl font-bold'>
          Generate pathways
        </h1>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='text'
            placeholder='Task title'
            className='mb-5'
            id='topic'
            {...register('topic')}
          />
          {/* <Textarea
            placeholder='Task description'
            className='h-24'
            id='description'
            {...register('description', { required: false })}
            > */}
          <ReactQuill
            value={value}
            onChange={setValue}
            className='rounded-md overflow-hidden border border-gray-300 border-input bg-transparent '
          />

          <Button
            type='submit'
            className='my-5 w-full'
            disabled={addTodoMutation.isPending}
          >
            {addTodoMutation.isPending ? (
              <Loader text='generating...' />
            ) : (
              'Generate'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
