'use client'

import { useState, useEffect } from 'react'
import { FaCheckSquare, FaSquare } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetQuestions, useSendQuestions } from '@/hooks'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader } from '@/components/Loader'

export default function Questionnaire() {
  const [openDialog, setOpenDialog] = useState(false)
  const [average, setAverage] = useState(null)

  const [answers, setAnswers] = useState<any>({})
  const router = useRouter()

  const searchParams = useSearchParams()

  const taskId = searchParams.get('taskId') as string

  const { data, isLoading } = useGetQuestions(taskId)

  useEffect(() => {
    if (data && data.questions) {
      const initialAnswers = data.questions.reduce(
        (acc: Record<string, any>, question: any) => {
          acc[question.id] = ''
          return acc
        },
        {}
      )
      setAnswers(initialAnswers)
    }
  }, [data])

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev: any) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const markUserMutation = useSendQuestions(setOpenDialog, setAverage)

  const handleCorrectness = () => {
    markUserMutation.mutate({ answers, taskId })
  }

  const renderQuestion = (question: any) => {
    switch (question.type) {
      case 'text':
        return (
          <>
            <p className='my-3 ml-1 text-sm text-gray-500'>
              {question.description}
            </p>
            <Input
              type='text'
              placeholder='Your answer here...'
              className='w-full'
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          </>
        )
      case 'paragraph':
        return (
          <>
            <p className='my-3 ml-1 text-sm text-gray-500'>
              {question.description}
            </p>
            <Textarea
              placeholder='Your answer here...'
              className='mt-2 w-full h-24'
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          </>
        )
      case 'checkbox':
        return (
          <div className='space-y-2 mb-3'>
            <p className='my-3 ml-1 text-sm text-gray-500'>
              {question.description}
            </p>
            {question.choices?.map((choice: any) => (
              <div key={choice.choice} className='flex items-center space-x-2'>
                <span
                  className='cursor-pointer'
                  onClick={() => {
                    const currentAnswers = answers[question.id] || []
                    const newAnswers = currentAnswers.includes(choice.choice)
                      ? currentAnswers.filter(
                          (name: string) => name !== choice.choice
                        )
                      : [...currentAnswers, choice.choice]
                    handleAnswerChange(question.id, newAnswers)
                  }}
                >
                  {(answers[question.id] || []).includes(choice.choice) ? (
                    <FaCheckSquare className='text-green-500' />
                  ) : (
                    <FaSquare className='text-gray-400' />
                  )}
                </span>
                <span>{choice.choice}</span>
              </div>
            ))}
          </div>
        )
      case 'multiplechoice':
        return (
          <div className='space-y-2 mb-3'>
            <p className='my-3 ml-1 text-sm text-gray-500'>
              {question.description}
            </p>
            {question.choices?.map((choice: any) => (
              <div key={choice.id} className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name={`question-${question.id}`}
                  onChange={() =>
                    handleAnswerChange(question.id, choice.choice)
                  }
                  checked={answers[question.id] === choice.choice}
                />
                <span>{choice.choice}</span>
              </div>
            ))}
          </div>
        )
      case 'code':
        return (
          <>
            <p className='my-3 ml-1 text-sm text-gray-500'>
              {question.description}
            </p>
            <Textarea
              placeholder='// Type your code here'
              className='mt-2 w-full h-24'
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          </>
        )
      case 'linearscale':
        const { toRangeValue, fromRangeLabel, toRangeLabel } =
          question.metadata.linearScale
        return (
          <>
            <p className='my-3 ml-1 text-sm text-gray-500'>
              {question.description}
            </p>
            <div className='flex items-center space-x-4'>
              <span className='text-gray-700 font-medium'>
                {fromRangeLabel}
              </span>
              <div className='flex space-x-2'>
                {Array.from({ length: toRangeValue }, (_, i) => i + 1).map(
                  (value) => (
                    <span
                      key={value}
                      onClick={() => handleAnswerChange(question.id, value)}
                      className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center border ${
                        answers[question.id] === value
                          ? 'bg-blue-500 text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {value}
                    </span>
                  )
                )}
              </div>
              <span className='text-gray-700 font-medium'>{toRangeLabel}</span>
            </div>
          </>
        )
      case 'range':
        const { min, max } = question.metadata.range
        return (
          <>
            <p className='my-3 ml-1 text-sm text-gray-500'>
              {question.description}
            </p>
            <div className='flex space-x-2 items-center'>
              <span>{min}</span>
              <Slider
                value={[answers[question.id] || parseInt(min)]}
                onValueChange={(value) =>
                  handleAnswerChange(question.id, value[0])
                }
                min={parseInt(min)}
                max={parseInt(max)}
                step={1}
                className='w-full'
              />
              <span>{max}</span>
            </div>
          </>
        )
      case 'dropdown':
        return (
          <>
            <p className='my-3 ml-1 text-sm text-gray-500'>
              {question.description}
            </p>
            <Select
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select an option' />
              </SelectTrigger>
              <SelectContent>
                {question.metadata.dropDown.datasetData.map((item: string) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 px-5'>
      {isLoading ? (
        <div className='grid place-items-center h-screen'>
          <Loader text='Loading...' typeOfLoader='index' />
        </div>
      ) : (
        <div className='p-6 max-w-2xl mx-auto shadow-md rounded-lg'>
          <h1 className='text-xl font-bold mb-4 text-center'>Questionnaire</h1>
          {data.questions?.map((question: any, index: number) => (
            <div key={question.id} className='border rounded-lg p-4 mb-6'>
              <div className='flex justify-between items-center mb-3'>
                <div>
                  <h2 className='text-lg font-semibold'>
                    {index + 1}. {question.title}
                  </h2>
                </div>
              </div>

              {renderQuestion(question)}
            </div>
          ))}
          <div className='flex justify-between items-center'>
            <Button variant='link' onClick={() => router.back()}>
              GO BACK
            </Button>
            <Button
              className='bg-green-500 text-white'
              onClick={handleCorrectness}
              disabled={markUserMutation.isPending}
            >
              {markUserMutation.isPending ? (
                <Loader text='Marking...' />
              ) : (
                'SUBMIT'
              )}
            </Button>
          </div>
          <AlertDialog open={openDialog}>
            <AlertDialogContent className='w-[380px] shadow'>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-center text-2xl'>
                  Marks
                </AlertDialogTitle>
                <AlertDialogDescription className='text-center'>
                  You&apos;ve got{' '}
                  <span className='text-gray-600 text-2xl'>{average}/100</span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                  Close
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  )
}
