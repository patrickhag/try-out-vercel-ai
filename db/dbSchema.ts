import {
  pgTable,
  varchar,
  integer,
  jsonb,
  pgEnum,
  uuid,
} from 'drizzle-orm/pg-core'

const difficultyEnum = pgEnum('difficulty', ['EASY', 'MEDIUM', 'HARD'])

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  title: varchar('name').notNull(),
  description: varchar('description'),
  difficulty: difficultyEnum('difficulty').notNull(),
})

export const questionTypeEnum = pgEnum('question_type', [
  'text',
  'paragraph',
  'checkbox',
  'multiplechoice',
  'code',
  'range',
  'linearscale',
  'dropdown',
])

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  version: integer('version').notNull(),
  type: questionTypeEnum('type').notNull(),
  choices: jsonb('choices'),
  score: integer('score').notNull(),
  taskId: uuid('task_id').references(() => tasks.id),
})

export const metadata = pgTable('metadata', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  metadata: jsonb('metadata'),
  questionId: uuid('question_id').references(() => questions.id),
})
