import { PromptType } from '@/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useCreateQuestions = () => {
  return useMutation({
    mutationFn: async (userPrompt: PromptType) => {
      return axios.post('/api/questions', userPrompt)
    },
    onSuccess: ({ data }) => {
      console.log(data)
    },
  })
}
