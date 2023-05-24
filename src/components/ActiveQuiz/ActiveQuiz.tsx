import React from 'react'
import styles from './ActiveQuiz.module.scss'
import AnswersList from './AnswersList/AnswersList'

import { QuestionType } from '../../pages/Quiz/Quiz'

interface ActiveQuizType {
    quiz: QuestionType
    quizeslength: number
}


const ActiveQuiz: React.FC<ActiveQuizType> = ( { quiz, quizeslength } ) => {
    console.log('quiz', quiz);

  return (
    <div className={styles.activeQuiz}>
        <p className={styles.question}>
            <span>
                <strong>{quiz.idQuestion}.</strong>&nbsp;
                {quiz.question}
            </span>
            <small>{quiz.idQuestion} из {quizeslength}</small>
        </p>
        <AnswersList answers={quiz.answers}/>
    </div>
  )
}

export default ActiveQuiz