import { Sequelize, Model, DataTypes } from 'sequelize'
import { text } from 'express'
import { v4 as UUIDV4 } from 'uuid'
import { sequelize } from '../postgres/postgres'

class Question extends Model {}

Question.init({
  id: { type: Sequelize.UUIDV4, defualtValue: Sequelize.UUIDV4, primaryKey: true },
  questionType: {
    type: Sequelize.ENUM,
    values: ['multichoice', 'freeform', 'boolean'],
    allowNull: false,
  },
  questionText: DataTypes.TEXT,
  multiChoiceA: DataTypes.TEXT,
  multiChoiceB: DataTypes.TEXT,
  multiChoiceC: DataTypes.TEXT,
  multiChoiceD: DataTypes.TEXT,
  multiChoiceE: DataTypes.TEXT,
  multiChoiceAnswer: DataTypes.CHAR,
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