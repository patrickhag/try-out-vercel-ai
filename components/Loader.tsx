import React from 'react'
import '@/app/globals.css'
import { LuLoader2 } from 'react-icons/lu'

type Prop = {
  text?: string
  typeOfLoader?: boolean
}

export const Loader = ({ text, typeOfLoader }: Prop) => {
  return (
    <div className='flex items-center'>
      <LuLoader2
        className={`${
          typeOfLoader ? 'w-8 h-8 text-blue-500' : 'text-gray-200 w-5 h-5'
        } animate-spin`}
      />
      <span className='ml-2'>{text}</span>
    </div>
  )
}
