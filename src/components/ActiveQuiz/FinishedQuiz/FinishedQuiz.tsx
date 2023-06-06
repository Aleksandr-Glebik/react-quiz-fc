import React from 'react'
import styles from './FinishedQuiz.module.scss'
import clsx from 'clsx'
import { answerStateType, QuestionType } from '../../../pages/Quiz/Quiz'

interface FinishedQuizType {
  answerState: answerStateType[]
  quiz: QuestionType[]
}

type resultType = {
  idQuestion: number
  question: string
  status: string
}

const FinishedQuiz: React.FC<FinishedQuizType> = ({ answerState, quiz }) => {
  console.log('answerState', answerState)
  console.log('quiz', quiz)
  let result: resultType[] = quiz.map((el, ind) => {
    let status = answerState[ind]

    return {
      idQuestion: el.idQuestion,
      question: el.question,
      status: status[el.idQuestion]
    }
  })
  let rightAnswerLength = result.filter(item => item.status === 'success').length

  console.log('result', result)

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {
          result &&
          result.map((item, ind) => (
            <li
              key={`${item}_${ind}`}
              className={styles.text}
            >
              <strong>{item.idQuestion}. </strong>
              <span className={clsx(item.status === 'success'
                  ? styles.success
                  : styles.error
              )}>{item.question}</span>
            </li>
          ))
        }
      </ul>
      <p className={styles.rightAnswer}>
        Правильных ответов {rightAnswerLength} из {result.length}
      </p>
    </div>
  )
}

export default FinishedQuiz