import { PromptType } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const useCreateQuestions = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: async (userPrompt: PromptType) => {
      return axios.post('/api/questions', userPrompt)
    },
    onSuccess: ({ data }) => {
      queryClient.setQueryData(['questions'], data)
      router.push('/questions')
    },
  })
}
