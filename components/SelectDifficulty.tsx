import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SelectDifficulty() {
  return (
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
  )
}
