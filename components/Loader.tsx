import React from 'react'
import '@/app/globals.css'
import { LuLoader2 } from 'react-icons/lu'

type LoaderProps = {
  text?: string
  typeOfLoader?: string
}

export const Loader = ({ text, typeOfLoader }: LoaderProps) => {
  return (
    <div className='flex items-center'>
      <LuLoader2
        className={`${
          typeOfLoader === 'index'
            ? 'w-5 h-5 text-black-500'
            : 'text-gray-200 w-5 h-5'
        } animate-spin`}
      />
      <span className='ml-2'>{text}</span>
    </div>
  )
}
