import wrap from 'express-async-wrap'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import fs from 'fs'

/* eslint-disable no-unused-vars */
import env from '../env'
import * as pg from './postgres/postgres'
import * as uploads from './questions/uploads'
/* eslint-enable no-unused-vars */

import {
  getQuestionsREST, deleteQuestions, createQuestionREST, deleteQuestion,
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

app.get('/questions', cors(corsOptions), wrap(getQuestionsREST))

app.delete('/questions', cors(corsOptions), wrap(deleteQuestions))

app.options('/question/:id', cors(corsOptions))
app.delete('/question/:id', cors(corsOptions), wrap(deleteQuestion))

app.post('/question', cors(corsOptions), wrap(createQuestionREST))

app.get('/sampleQuestionTemplate', cors(corsOptions), (req,res) => {
  res.writeHead(200, {'Content-disposition': 'attachment; filename=sampleQuestionTemplate.csv'})
  fs.createReadStream("./downloads/sampleQuestionTemplate.csv").pipe(res)
})

app.use(fileUpload({
  preserveExtension: true,
  abortOnLimit: true,
  createParentPath: true,
  debug: true,
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles: true,
  tempFileDir: 'tmp/',
}))

app.post('/upload', cors(corsOptions), wrap(fileUpload2))

async function fileUpload2(req, res) {
  // console.log(req.files.foo) // the uploaded file object
  res.send()
}

app.listen(8080)
