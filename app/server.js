import wrap from 'express-async-wrap'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'

// eslint-disable-next-line no-unused-vars
import * as e from '../env'
// eslint-disable-next-line no-unused-vars
import * as pg from './postgres/postgres'

import {
  getQuestions, deleteQuestions, createQuestion, deleteQuestion,
} from './questions/question'

const app = express()
app.use(bodyParser.urlencoded({
  extended: true,
}))

const options = {
  index: 'index.html',
}

const corsOptions = {
  origin: 'http://localhost:9000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // preflightContinue: 'true'
  // origin: false
}

// app.options('*',cors(corsOptions))


app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../public'), options))

app.get('/questions', cors(corsOptions), wrap(getQuestions))

app.delete('/questions', cors(corsOptions), wrap(deleteQuestions))

app.options('/question/:id', cors(corsOptions))
app.delete('/question/:id', cors(corsOptions), wrap(deleteQuestion))

app.post('/question', cors(corsOptions), wrap(createQuestion))

app.listen(8080)
