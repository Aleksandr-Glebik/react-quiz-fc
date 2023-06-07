import React from 'react'
import styles from './QuizList.module.scss'
import { NavLink } from 'react-router-dom'

const QuizList = () => {
  const quizListArr = [1, 2, 3]
  return (
    <div className={styles.quizList}>
      <div>
        <h2 className={styles.title}>Список тестов</h2>

        <ul className={styles.list}>
          {quizListArr.map((quiz, ind) => (
            <li
              className={styles.item}
              key={`${quiz}_${ind}`}
            >
              <NavLink
                to={`/quiz` }
                // to={`/quiz/${quiz}` }
                className={styles.link}
              >
                {quiz}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default QuizList