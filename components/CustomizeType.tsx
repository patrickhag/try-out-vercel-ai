import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function Customize() {
  return (
    <Popover>
      <PopoverTrigger asChild className='w-full ml-3'>
        <Button variant='outline'>Question types</Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Customize</h4>
            <p className='text-sm text-muted-foreground'>
              Set the type of you questions and their value
            </p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='text'>Text</Label>
              <Input id='text' type='number' className='col-span-2 h-8' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='paragraph'>Paragraph</Label>
              <Input id='paragraph' type='number' className='col-span-2 h-8' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='checkbox'>Checkboxes</Label>
              <Input id='checkbox' type='number' className='col-span-2 h-8' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='multipleChoice'>Multiple choice</Label>
              <Input
                id='multipleChoice'
                type='number'
                className='col-span-2 h-8'
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='code'>Code</Label>
              <Input id='code' type='number' className='col-span-2 h-8' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='linearScale'>Linear scale</Label>
              <Input
                id='linearScale'
                type='number'
                className='col-span-2 h-8'
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='range'>Range</Label>
              <Input id='range' type='number' className='col-span-2 h-8' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='dropdown'>Dropdown</Label>
              <Input id='dropdown' type='number' className='col-span-2 h-8' />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
