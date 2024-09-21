import { pgTable, varchar, jsonb, pgEnum, uuid } from 'drizzle-orm/pg-core'

const difficultyEnum = pgEnum('difficulty', ['EASY', 'MEDIUM', 'HARD'])

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  title: varchar('name').notNull(),
  description: varchar('description'),
  difficulty: difficultyEnum('difficulty').notNull(),
  questions: jsonb('questions').notNull(),
})
