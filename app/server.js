import wrap from 'express-async-wrap'
import express from 'express'
import bodyParser from 'body-parser'

import * as e from '../env'
import * as pg from './postgres/postgres'
import { getQuestions, deleteQuestions, createQuestion } from './questions/question'

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/questions', wrap(getQuestions))

app.delete('/questions', wrap(deleteQuestions))

app.post('/question', wrap(createQuestion))

app.listen(8080)
