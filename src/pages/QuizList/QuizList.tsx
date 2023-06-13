import React, { useEffect } from 'react'
import styles from './QuizList.module.scss'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/ActiveQuiz/UI/Loader/Loader'

import { useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { Status, fetchQuizes, selectQuizes } from '../../redux/slices/quizesSlice'

const QuizList = () => {
  const dispatch = useAppDispatch()
  const { quizes, status} = useSelector(selectQuizes)

  useEffect( () => {
    dispatch(fetchQuizes())
  }, [dispatch])

  return (
    <div className={styles.quizList}>
      <div>
        <h2 className={styles.title}>Список тестов</h2>

        {
          status === Status.LOADING
           ? <Loader />
           : <ul className={styles.list}>
                {quizes.length > 0 && quizes.map((quiz) => (
                  <li
                    className={styles.item}
                    key={`${quiz.id}`}
                  >
                    <NavLink
                      to={`/quiz/` + quiz.id }
                      className={styles.link}
                    >
                      {quiz.name}
                    </NavLink>
                  </li>
                ))}
             </ul>
        }
      </div>
    </div>
  )
}

export default QuizList