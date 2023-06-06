import React, { useState } from 'react'
import styles from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/ActiveQuiz/FinishedQuiz/FinishedQuiz'

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
}

const Quiz: React.FC = () => {
  const [isFinished, setIsFinished] = useState(false)
  const [answerState, setAnswerState] = useState<answerStateType[]>([])

  const state: StateType = {
    isFinished: isFinished,
    activeQuestionId: 1,
    answerState: answerState, // { [id]: 'success' or 'error' }
    quiz: [
        {
            idQuestion: 1,
            question: 'Какого цвета солнце?',
            rightAnswerId: 1,
            answers: [
                {
                    id: 1,
                    text: '1. Желтый'
                },
                {
                    id: 2,
                    text: '2. Зеленый'
                },
                {
                    id: 3,
                    text: '3. Красный'
                },
                {
                    id: 4,
                    text: '4. Черный'
                },
                {
                    id: 5,
                    text: '5. Белый'
                },
            ]
        },
        {
            idQuestion: 2,
            question: 'Какого цвета небо?',
            rightAnswerId: 3,
            answers: [
                {
                    id: 1,
                    text: '1. Желтый'
                },
                {
                    id: 2,
                    text: '2. Зеленый'
                },
                {
                    id: 3,
                    text: '3. Синий'
                },
                {
                    id: 4,
                    text: '4. Черный'
                },
                {
                    id: 5,
                    text: '5. Белый'
                },
            ]
        },
    ]
  }

  const [activeQuestionId, setActiveQuestionId] = useState(1)

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
            alert('quiz finished')
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
          }
        </div>
    </div>
  )
}

export default Quiz