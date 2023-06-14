import React, { useEffect } from 'react'
import styles from './Quiz.module.scss'

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/ActiveQuiz/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/ActiveQuiz/UI/Loader/Loader'

import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import {
  Status,
  selectQuiz,
  fetchQuiz,
  setIsFinished,
  setActiveQuestionId,
  setAnswerState,
  retryStateQuiz
} from '../../redux/slices/quizSlice'

const Quiz: React.FC = () => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const {
    quiz,
    status,
    isFinished,
    activeQuestionId,
    answerState
  } = useSelector(selectQuiz)

  useEffect( () => {
    dispatch(retryStateQuiz())

    const quizId =  pathname.slice(6)

    dispatch(fetchQuiz(quizId))
  }, [pathname, dispatch])

  let activeQuestion = quiz.find(item => item.idQuestion === activeQuestionId)

  const isQuizFinished = () => {
    return activeQuestion && quiz.length > activeQuestion.idQuestion
  }

  const onAnswerClickHandler = (answerId: number | null) => {
    let doubleClickOnBtn = false

    answerState.forEach(item => {
      if (+Object.keys(item)[0] === activeQuestionId) {
        doubleClickOnBtn = true
      }
    })

    if (doubleClickOnBtn) {
        return
    }

    if (answerId && activeQuestionId) {
        answerId === activeQuestion?.rightAnswerId
          ? dispatch(setAnswerState(answerState.concat({[activeQuestionId]: 'success'})))
          : dispatch(setAnswerState(answerState.concat({[activeQuestionId]: 'error'})))
    }

    const timeout = window.setTimeout( () => {
        if (isQuizFinished()) {
          dispatch(setActiveQuestionId(activeQuestionId + 1))
        } else {
          dispatch(setIsFinished(true))
        }
        window.clearTimeout(timeout)
    }, 1000)
  }

  const onRetryHandler = () => {
    dispatch(retryStateQuiz())
  }

  return (
    <div className={styles.quiz}>
        <h1 className={styles.h1}>
            {
              isFinished
                ? 'Результат'
                : 'Ответьте на все вопросы'
            }
        </h1>

        <div className={styles.quizWrapper}>
          {
            status === Status.LOADING
              ? <Loader />
              : (
                    isFinished
                    ? <FinishedQuiz
                        answerState={answerState}
                        quiz={quiz}
                        onRetry={onRetryHandler}
                    />
                    : activeQuestion
                        && <ActiveQuiz
                        quiz={activeQuestion}
                        quizesLength={quiz.length}
                        onAnswerClick={onAnswerClickHandler}
                        rightAnswerId={activeQuestion?.rightAnswerId}
                        />
                )
          }
        </div>
    </div>
  )
}

export default Quiz