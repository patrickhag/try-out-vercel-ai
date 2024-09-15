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

export const AddOnInfoSchema = z.object({
  task: z.string(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
})

const QuestionChoiceSchema = z.object({
  id: z.string().uuid(),
  choice: z.string(),
  isCorrect: z.boolean(),
})

const BaseQuestionSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  expectedAnswer: z.string(),
  version: z.number(),
  orderIndex: z.number(),
})

const TextQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Text),
})

const CheckboxQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Checkbox),
  choices: z.array(QuestionChoiceSchema),
})

const ParagraphQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Paragraph),
})

const MultipleChoiceQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.MultipleChoice),
  choices: z.array(QuestionChoiceSchema),
})

const CodeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Code),
  metadata: z.object({
    codesInfo: z.object({
      codeQuestion: z.string(),
      language: z.string(),
    }),
  }),
})

const RangeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Range),
  metadata: z.object({
    range: z.object({
      min: z.string(),
      max: z.string(),
    }),
  }),
})

const LinearScaleQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.LinearScale),
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
  metadata: z.object({
    dropDown: z.object({
      dataset: z.string(),
      datasetData: z.array(z.string()),
    }),
  }),
})

const QuestionSchema = z.discriminatedUnion('type', [
  TextQuestionSchema,
  CheckboxQuestionSchema,
  ParagraphQuestionSchema,
  MultipleChoiceQuestionSchema,
  CodeQuestionSchema,
  RangeQuestionSchema,
  LinearScaleQuestionSchema,
  DropDownQuestionSchema,
])

export const questionSchema = z.array(QuestionSchema)
