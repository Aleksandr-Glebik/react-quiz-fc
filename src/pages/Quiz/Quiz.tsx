import React, { useState } from 'react'
import styles from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

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

interface StateType {
    quiz: QuestionType[]
}

const Quiz: React.FC = () => {
  const state: StateType = {
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
    console.log('answerId', answerId)
    const timeout = window.setTimeout( () => {
        if (answerId === activeQuestion?.rightAnswerId) {
            alert('right')
        } else {
            alert('wrong')
        }
        if (isQuizFinished()) {
            setActiveQuestionId(prev => prev + 1)
        } else {
            alert('quiz finished')
        }
        window.clearTimeout(timeout)
    }, 1000)
  }

  return (
    <div className={styles.quiz}>
        <h1 className={styles.h1}>Ответьте на все вопросы</h1>

        <div className={styles.quizWrapper}>
            {
              activeQuestion && <ActiveQuiz
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