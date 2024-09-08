'use client'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PromptSchema } from '@/validations/prompSchema'
import { PromptType } from '@/types'
import { useCreateQuestions } from '@/hooks'
import { Loader } from '@/components/Loader'
import CustomizeType from '@/components/CustomizeType'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Home() {
  const { register, handleSubmit } = useForm<PromptType>({
    resolver: zodResolver(PromptSchema),
  })

  const addTodoMutation = useCreateQuestions()

  const onSubmit: SubmitHandler<PromptType> = (data) => {
    addTodoMutation.mutate(data)
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
          <Textarea
            placeholder='Task description'
            className='h-24'
            id='description'
            {...register('description', { required: false })}
          />
          <div className='mt-3 flex'>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select level of difficulty' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Difficulty</SelectLabel>
                  <SelectItem value='easy'>Easy</SelectItem>
                  <SelectItem value='medium'>Medium</SelectItem>
                  <SelectItem value='hard'>Hard</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <CustomizeType />
          </div>
          <Button
            type='submit'
            className='my-5 w-full'
            disabled={addTodoMutation.isPending}
          >
            {addTodoMutation.isPending ? (
              <Loader text='Generating...' />
            ) : (
              'Generate'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
