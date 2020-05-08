import chokidar from 'chokidar'
import csvtojson from 'csvtojson'
import fs from 'fs'
import util from 'util'
import { createQuestion } from './question'

const fileDelete = util.promisify(fs.unlink)

chokidar.watch('tmp').on('add', async (event) => {
  try {
    await processUpload(event)
  } catch (e) {
    // console.log('Error ProcessUpload', e)
  }
})
// addDir tmp
// ^ is console logged on server startup

// add tmp/tmp-1-1588643637715

async function processUpload(event) {
  // console.log(event)
  // parse the uploaded files
  const questionArr = await csvtojson().fromFile(event)
  // console.log(questionArr)
  // put data into database
  // eslint-disable-next-line no-restricted-syntax
  for (const q of questionArr) {
    // console.log("Q: ",q)
    const dbq = {
      questionType: q['Question Type'],
      questionText: q['Question Text'],
      multiChoices: [q['Choice 1'], q['Choice 2'], q['Choice 3'], q['Choice 4'], q['Choice 5']],
      multiChoiceAnswer: getAnswerInt(q.Answer),
      boolAnswer: getAnswerBool(q.Answer),
    }
    // console.log('DBQ: ',dbq)
    // eslint-disable-next-line no-await-in-loop
    await createQuestion(dbq)
  }
  await fileDelete(event)
  // report back to UI
}

function getAnswerInt(answer) {
  if (answer != null && answer.length > 0 && !Number.isNaN(Number(answer))) return parseInt(answer, 10)
  return undefined
}

function getAnswerBool(answer) {
  if ((answer || '').toUpperCase() === 'TRUE') return true
  if ((answer || '').toUpperCase() === 'FALSE') return false
  return undefined
}
