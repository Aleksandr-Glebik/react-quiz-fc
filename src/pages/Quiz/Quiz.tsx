import React, { useEffect, useState } from 'react'
import styles from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/ActiveQuiz/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import { useLocation } from 'react-router-dom'
import Loader from '../../components/ActiveQuiz/UI/Loader/Loader'

export type AnswerType = {
    id: number
    text: string
}

export type QuestionType = {
    idQuestion: number
    question: string
    rightAnswerId: number
    answers: AnswerType[]
}

export type answerStateType = {
    [id: number]: 'success' | 'error'
}
interface StateType {
    isFinished: boolean
    activeQuestionId: number
    answerState: answerStateType[]
    quiz: QuestionType[]
    loading: boolean
}

const Quiz: React.FC = () => {
  const { pathname } = useLocation()
  const [quiz, setQuiz] = useState<QuestionType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [isFinished, setIsFinished] = useState(false)
  const [answerState, setAnswerState] = useState<answerStateType[]>([])

  const state: StateType = {
    isFinished: isFinished,
    activeQuestionId: 1,
    answerState: answerState,
    quiz: quiz,
    loading: isLoading
  }

  const [activeQuestionId, setActiveQuestionId] = useState(1)

  useEffect( () => {
    const fetchData = async () => {
        const newId = pathname.slice(6)
        const response = await axios.get(`/quizes/${newId}.json`)
        const quiz = response.data
        setQuiz(quiz)
        setIsLoading(false)
      }
      fetchData()
        .catch(console.error)
  }, [pathname])

  let activeQuestion = state.quiz.find(item => item.idQuestion === activeQuestionId)

  const isQuizFinished = () => {
    return activeQuestion && state.quiz.length > activeQuestion.idQuestion
  }

  const onAnswerClickHandler = (answerId: number | null) => {
    let doubleClickOnBtn = false

    state.answerState.forEach(item => {
      if (+Object.keys(item)[0] === activeQuestionId) {
        doubleClickOnBtn = true
      }
    })

    if (doubleClickOnBtn) {
        return
    }

    if (answerId && activeQuestionId) {
        answerId === activeQuestion?.rightAnswerId
          ? setAnswerState(prev => prev.concat({[activeQuestionId]: 'success'}))
          : setAnswerState(prev => prev.concat({[activeQuestionId]: 'error'}))
    }

    const timeout = window.setTimeout( () => {
        if (isQuizFinished()) {
            setActiveQuestionId(prev => prev + 1)
        } else {
            setIsFinished(true)
        }
        window.clearTimeout(timeout)
    }, 1000)
  }

  const onRetryHandler = () => {
    setIsFinished(false)
    setAnswerState([])
    setActiveQuestionId(1)
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
            isLoading
              ? <Loader />
              : (
                    isFinished
                    ? <FinishedQuiz
                        answerState={answerState}
                        quiz={state.quiz}
                        onRetry={onRetryHandler}
                    />
                    : activeQuestion
                        && <ActiveQuiz
                        quiz={activeQuestion}
                        quizesLength={state.quiz.length}
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