import React from 'react'
import styles from './FinishedQuiz.module.scss'
import clsx from 'clsx'
import { answerStateType, QuestionType } from '../../../pages/Quiz/Quiz'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

interface FinishedQuizType {
  answerState: answerStateType[]
  quiz: QuestionType[]
  onRetry: () => void
}

type resultType = {
  idQuestion: number
  question: string
  status: string
}

const FinishedQuiz: React.FC<FinishedQuizType> = ({
  answerState,
  quiz,
  onRetry
 }) => {
  const navigate = useNavigate()
  let result: resultType[] = quiz.map((el, ind) => {
    let status = answerState[ind]

    return {
      idQuestion: el.idQuestion,
      question: el.question,
      status: status[el.idQuestion]
    }
  })

  let rightAnswerLength = result.filter(item => item.status === 'success').length

  const redirectToList = () => {
    navigate('/')
  }

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
              <strong>{item.idQuestion}.&nbsp;</strong>
              <span className={clsx(item.status === 'success'
                  ? styles.success
                  : styles.error
              )}>{item.question}</span>
              <FontAwesomeIcon
                icon={item.status === 'success' ? faCheck : faXmark}
                className={clsx(styles.icon, item.status === 'success'
                  ? styles.success
                  : styles.error
              )} />
            </li>
          ))
        }
      </ul>
      <p className={styles.rightAnswer}>
        Правильных ответов {rightAnswerLength} из {result.length}
      </p>
      <div className={styles.btnContainer}>
        <button
          className={clsx(styles.btn)}
          onClick={onRetry}
        >
          Повторить
        </button>
        <button
          className={clsx(styles.btn, styles.backToQuizList)}
          onClick={redirectToList}
        >
          Перейти в список тестов
        </button>
      </div>
    </div>
  )
}

export default FinishedQuiz