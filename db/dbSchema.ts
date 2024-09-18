import {
  pgTable,
  varchar,
  integer,
  jsonb,
  pgEnum,
  uuid,
  boolean,
} from 'drizzle-orm/pg-core'

const difficultyEnum = pgEnum('difficulty', ['EASY', 'MEDIUM', 'HARD'])

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  title: varchar('name').notNull(),
  description: varchar('description'),
  difficulty: difficultyEnum('difficulty').notNull(),
})

const questionTypeEnum = pgEnum('question_type', [
  'text',
  'paragraph',
  'checkbox',
  'multipleChoice',
  'code',
  'range',
  'linearScale',
  'dropdown',
])

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  version: integer('version').notNull(),
  type: questionTypeEnum('type').notNull(),
  score: integer('score').notNull(),
  taskId: uuid('task_id').references(() => tasks.id),
})

export const metadata = pgTable('metadata', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  metadata: jsonb('metadata'),
  questionId: uuid('question_id').references(() => questions.id),
})

export const choices = pgTable('choices', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  choice: varchar('choice').notNull(),
  isCorrect: boolean('isCorrect').notNull(),
  questionId: uuid('question_id').references(() => questions.id),
})
