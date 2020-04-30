import { Sequelize, Model, DataTypes } from 'sequelize'
import { text } from 'express'
import { v4 as UUIDV4 } from 'uuid'
import { sequelize } from '../postgres/postgres'

class Question extends Model {}

/**
 * @param {String} id A unique (random) UUIDV4 (universally unique identifier) to identify each question.
 * @param {String} questionType An enum that defines whether the question is true false, multiple choice, or short answer.
 * @param {String} questionText A question.
 * @param {String} multiChoices Array of choices.
 * @param {String} multiChoiceAnswer Correct answer.
 */
Question.init({
  id: { type: Sequelize.UUID, primaryKey: true },
  questionType: {
    type: Sequelize.ENUM,
    values: ['multichoice', 'freeform', 'boolean'],
    allowNull: false,
  },
  questionText: DataTypes.TEXT,
  multiChoices: DataTypes.ARRAY(DataTypes.TEXT),
  multiChoiceAnswer: DataTypes.INTEGER,
  boolAnswer: DataTypes.BOOLEAN,
}, { sequelize, modelName: 'question' })

export async function createQuestion(req, resp) {
  console.log(req.body)
  const question = req.body
  console.log(question)
  question.id = UUIDV4()
  console.log(question)
  await sequelize.sync()
  const q = await Question.create(question)
  resp.json(q)
}

export async function getQuestions(req, resp) {
  const questions = await Question.findAll()
  console.log(questions)
  resp.json(questions)
}

export async function deleteQuestions(req, resp) {
  const questions = await Question.destroy({ truncate: true })
  console.log(questions)
  resp.json(questions)
}
