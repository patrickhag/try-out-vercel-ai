import {
  pgTable,
  varchar,
  integer,
  jsonb,
  pgEnum,
  text,
  boolean,
  serial,
  json,
} from 'drizzle-orm/pg-core'

const questionTypeEnum = pgEnum('question_type', [
  'text',
  'checkbox',
  'paragraph',
  'multipleChoice',
  'code',
  'range',
  'linearScale',
  'dropdown',
])

export const questions = pgTable('questions', {
  id: varchar('id').primaryKey(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  expectedAnswer: varchar('expectedAnswer').notNull(),
  version: integer('version').notNull(),
  orderIndex: integer('orderIndex').notNull(),
  type: questionTypeEnum('type').notNull(),
  choices: jsonb('choices'),
})

// export const questions = pgTable('questions', {
//   id: varchar('id', { length: 255 }).primaryKey(),
//   title: varchar('title', { length: 255 }).notNull(),
//   description: varchar('description'),
//   expectedAnswer: varchar('expected_answer').notNull(),
//   version: integer('version').notNull(),
//   orderIndex: integer('order_index').notNull(),
//   type: questionTypeEnum('type').notNull(),
// });

// // Table for question choices (for Checkbox & Multiple Choice)
// export const questionChoices = pgTable('question_choices', {
//   id: varchar('id', { length: 255 }).primaryKey(),
//   questionId: varchar('question_id', { length: 255 }).references(() => questions.id),
//   choice: text('choice').notNull(),
//   isCorrect: boolean('is_correct').notNull(),
// });

// // Metadata for different question types
// export const questionMetadata = pgTable('question_metadata', {
//   id: serial('id').primaryKey(),
//   questionId: varchar('question_id', { length: 255 }).references(() => questions.id),
//   metadataType: varchar('metadata_type', { length: 255 }).notNull(),
//   metadata: json('metadata').notNull(),
// });
