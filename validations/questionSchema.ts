import { z } from 'zod'

export enum QuestionType {
  Text = 'text',
  Checkbox = 'checkbox',
  Paragraph = 'paragraph',
  MultipleChoice = 'multipleChoice',
  Code = 'code',
  Range = 'range',
  LinearScale = 'linearScale',
  DropDown = 'dropdown',
}

const BaseQuestionSchema = z.object({
  title: z.string(),
  description: z.string(),
  version: z.number(),
})

const TextQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Text),
  score: z.number().default(5),
})

const ParagraphQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Paragraph),
  score: z.number().default(5),
})

const QuestionChoiceSchema = z.object({
  choice: z.string(),
  isCorrect: z.boolean(),
})

const CheckboxQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Checkbox),
  choices: z.array(QuestionChoiceSchema),
  score: z.number().default(5),
})

const MultipleChoiceQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.MultipleChoice),
  choices: z.array(QuestionChoiceSchema),
  score: z.number().default(5),
})

const CodeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Code),
  score: z.number().default(5),
  metadata: z.object({
    codesInfo: z.object({
      codeQuestion: z.string(),
      language: z.string(),
    }),
  }),
})

const RangeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Range),
  score: z.number().default(5),
  metadata: z.object({
    range: z.object({
      min: z.string(),
      max: z.string(),
    }),
  }),
})

const LinearScaleQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.LinearScale),
  score: z.number().default(5),
  metadata: z.object({
    linearScale: z.object({
      toRangeValue: z.number(),
      fromRangeLabel: z.string(),
      toRangeLabel: z.string(),
    }),
  }),
})

const DropDownQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.DropDown),
  score: z.number().default(5),
  metadata: z.object({
    dropDown: z.object({
      dataset: z.string(),
      datasetData: z.array(z.string()),
    }),
  }),
})

export const AddOnInfoSchema = z.object({
  task: z.string(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
})

const QuestionSchema = z.discriminatedUnion('type', [
  TextQuestionSchema,
  ParagraphQuestionSchema,
  CheckboxQuestionSchema,
  MultipleChoiceQuestionSchema,
  CodeQuestionSchema,
  RangeQuestionSchema,
  LinearScaleQuestionSchema,
  DropDownQuestionSchema,
])

export const questionSchema = z.array(QuestionSchema)
