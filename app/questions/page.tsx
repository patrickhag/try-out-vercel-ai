import { useState } from 'react'
import { FaCheckSquare, FaSquare } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

export default function Questionnaire() {
  const [checkedItems, setCheckedItems] = useState([true, true, false, false])

  const toggleCheckbox = (index: number) => {
    const updatedChecks = [...checkedItems]
    updatedChecks[index] = !updatedChecks[index]
    setCheckedItems(updatedChecks)
  }

  return (
    <div className='p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg'>
      <h1 className='text-xl font-bold mb-4'>Questionnaire</h1>

      {/* Checkbox Question */}
      <div className='border rounded-lg p-4 mb-6'>
        <div className='flex justify-between items-center mb-3'>
          <div>
            <h2 className='text-lg font-semibold'>
              This is title of the checkbox question
            </h2>
            <p className='text-sm text-gray-500'>
              This is description of the checkbox question
            </p>
          </div>
          <Button variant='link'>EDIT</Button>
        </div>

        <div className='space-y-2 mb-3'>
          {['asdfasdf', 'asdfasdf', 'sasdfasdf', 'asdff'].map((item, index) => (
            <div key={index} className='flex items-center space-x-2'>
              <span
                className='cursor-pointer'
                onClick={() => toggleCheckbox(index)}
              >
                {checkedItems[index] ? (
                  <FaCheckSquare className='text-green-500' />
                ) : (
                  <FaSquare className='text-gray-400' />
                )}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <p className='text-red-500 text-sm'>
          Sub-Skill must be assigned to a question
        </p>
      </div>

      {/* Text Question */}
      <div className='border rounded-lg p-4 mb-6'>
        <div className='flex justify-between items-center mb-3'>
          <div>
            <h2 className='text-lg font-semibold'>
              This is title of the text question
            </h2>
            <p className='text-sm text-gray-500'>
              This is description of the text question
            </p>
          </div>
          <Button variant='link'>EDIT</Button>
        </div>

        <Input
          type='text'
          placeholder='The answer will go here...'
          className='w-full'
        />

        <p className='text-red-500 text-sm mt-2'>
          Sub-Skill must be assigned to a question
        </p>
      </div>

      {/* Paragraph Question */}
      <div className='border rounded-lg p-4 mb-6'>
        <div className='flex justify-between items-center mb-3'>
          <div>
            <h2 className='text-lg font-semibold'>
              This is title of the paragraph question
            </h2>
            <p className='text-sm text-gray-500'>
              This is description of the paragraph question
            </p>
          </div>
          <Button variant='link'>EDIT</Button>
        </div>

        <div className='w-full'>
          <Label>Paragraph</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Paragraph' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='paragraph'>Paragraph</SelectItem>
              {/* Add other options if needed */}
            </SelectContent>
          </Select>

          <Textarea
            placeholder='The answer will go here...'
            className='mt-2 w-full h-24'
          />
        </div>

        <p className='text-red-500 text-sm mt-2'>
          Sub-Skill must be assigned to a question
        </p>
      </div>

      {/* Footer with Draft and Publish buttons */}
      <div className='flex justify-between items-center'>
        <Button variant='link'>DRAFT</Button>
        <Button className='bg-green-500 text-white'>PUBLISH</Button>
      </div>
    </div>
  )
}
