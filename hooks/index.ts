import { calculateAverage } from '@/lib/utils'
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

export const useSendQuestions = (
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setAverage: any
) => {
  return useMutation({
    mutationFn: async (userAnswers) => {
      return axios.put('/api/questions', { userAnswers })
    },
    onSuccess: ({ data }) => {
      const average = calculateAverage(data)
      setAverage(average)
      setOpenDialog(true)
    },
  })
}
