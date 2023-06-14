import React from 'react'
import styles from './ActiveQuiz.module.scss'
import AnswersList from './AnswersList/AnswersList'

import { QuestionType } from '../../redux/slices/quizSlice'
interface ActiveQuizType {
    quiz: QuestionType
    quizesLength: number
    rightAnswerId: number
    onAnswerClick: (answerId: number) => void
}

const ActiveQuiz: React.FC<ActiveQuizType> = ( { quiz, quizesLength, onAnswerClick, rightAnswerId } ) => {
  return (
    <div className={styles.activeQuiz}>
        <p className={styles.question}>
            <span>
                <strong>{quiz.idQuestion}.</strong>&nbsp;
                {quiz.question}
            </span>
            <small>{quiz.idQuestion} из {quizesLength}</small>
        </p>
        <AnswersList
          answers={quiz.answers}
          onAnswerClick={onAnswerClick}
          rightAnswerId={rightAnswerId}
        />
    </div>
  )
}

export default ActiveQuiz