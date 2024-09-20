'use client'

import { Loader } from '@/components/Loader'
import { Card } from '@/components/ui/card'
import { useGetTasks } from '@/hooks'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function CareerPathways() {
  const { data, isLoading } = useGetTasks()
  const router = useRouter()

  const handleOpenTask = (taskId: string) => {
    router.push(`/questions?taskId=${taskId}`)
  }

  return (
    <>
      <div className='min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 px-5'>
        {isLoading ? (
          <div className='grid place-items-center h-screen'>
            <Loader text='Loading...' typeOfLoader='index' />
          </div>
        ) : (
          <div className='w-10/12 mx-auto'>
            <h1 className='text-2xl font-bold p-6 text-center'>
              All generated pathways
            </h1>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center'>
              {data.map((task: any, index: number) => (
                <Card
                  key={index}
                  className='p-4 hover:shadow-lg cursor-pointer'
                  onClick={() => handleOpenTask(task.id)}
                >
                  <Image
                    src='/pathway-placeholder.jpg'
                    alt={task.title}
                    width={300}
                    height={100}
                    className='rounded-md'
                    priority={true}
                  />
                  <h2 className='text-lg font-semibold mt-4'>{task.title}</h2>
                  <p className='font-medium text-xs line-clamp-2 text-gray-400'>
                    {task.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
