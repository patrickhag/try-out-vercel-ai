import { calculateAverage } from '@/lib/utils'
import { PromptType } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const useCreateQuestions = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (userPrompt: PromptType) => {
      return axios.post('/api/questions', userPrompt)
    },
    onSuccess: () => {
      router.push('/')
    },
  })
}

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await axios.get(`/api/questions`)
      return data.data
    },
  })
}

export const useGetQuestions = (taskId: string) => {
  return useQuery({
    queryKey: ['questions', taskId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/questions/${taskId}`)
      return data.data[0]
    },
    enabled: !!taskId,
  })
}

export const useSendQuestions = (
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setAverage: any
) => {
  return useMutation({
    mutationFn: async ({
      answers,
      taskId,
    }: {
      answers: PromptType
      taskId: string
    }) => {
      console.log(answers, taskId)
      return axios.put(`/api/questions/${taskId}`, { userAnswers: answers })
    },
    onSuccess: ({ data }) => {
      const average = calculateAverage(data)
      setAverage(average)
      setOpenDialog(true)
    },
  })
}
