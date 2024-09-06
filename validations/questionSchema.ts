import { z } from 'zod'

enum QuestionType {
  Text = 'text',
  Checkbox = 'checkbox',
  Paragraph = 'paragraph',
  MultipleChoice = 'multiple choice',
  Code = 'code',
  Range = 'range',
  LinearScale = 'linear scale',
  DropDown = 'drop down',
}

const QuestionChoiceSchema = z.object({
  id: z.string().uuid(),
  choice: z.string(),
  isCorrect: z.boolean(),
})

const QuestionSchema = z.object({
  id: z.string().uuid(),
  type: z.enum([
    QuestionType.Text,
    QuestionType.Checkbox,
    QuestionType.Paragraph,
    QuestionType.MultipleChoice,
    QuestionType.Code,
    QuestionType.Range,
    QuestionType.LinearScale,
    QuestionType.DropDown,
  ]),
  title: z.string(),
  description: z.string().optional(),
  version: z.number(),
  orderIndex: z.number(),
  choices: z.array(QuestionChoiceSchema).optional(),
  metadata: z.object({
    automatedResponse: z.string(),
    codesInfo: z
      .object({
        codeQuestion: z.string().optional(),
        language: z.string().optional(),
      })
      .nullable()
      .optional(),
    validationRules: z.any().optional(),
    linearScale: z
      .object({
        toRangeValue: z.number(),
        fromRangeLabel: z.string().optional(),
        toRangeLabel: z.string().optional(),
      })
      .optional(),
    dropDown: z
      .object({
        dataset: z.string(),
        datasetData: z.array(z.string()).optional(),
      })
      .optional(),
    range: z
      .object({
        min: z.string(),
        max: z.string(),
      })
      .optional(),
  }),
})

export const questionSchema = z.array(QuestionSchema)
