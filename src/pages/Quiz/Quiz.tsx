import React from 'react'
import styles from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

export type AnswerType = {
    id: number
    text: string
}

export type QuestionType = {
    idQuestion: number
    question: string
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
            question: 'Как дела?',
            answers: [
                {
                    id: 1,
                    text: '1. Хорошо'
                },
                {
                    id: 2,
                    text: '2. Плохо'
                },
                {
                    id: 3,
                    text: '3. Не очень'
                },
                {
                    id: 4,
                    text: '4. Бывало и лучше'
                },
                {
                    id: 5,
                    text: '5. Супер'
                },
            ]
        }
    ]
  }

  return (
    <div className={styles.quiz}>
        <h1 className={styles.h1}>Quiz</h1>

        <div className={styles.quizWrapper}>
            <ActiveQuiz
              quiz={state.quiz[0]}
              quizeslength={state.quiz.length}
            />
        </div>
    </div>
  )
}

export default Quiz