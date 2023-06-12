import React, { useState, useEffect } from 'react'
import styles from './QuizList.module.scss'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../components/ActiveQuiz/UI/Loader/Loader'

const url = 'https://react-quiz-fc-946b4-default-rtdb.firebaseio.com/quizes.json'

type quizesType = {
  id: string
  name: string
}
interface initialStateType {
  quizes: quizesType[]
  loading: boolean
}
const initialState: initialStateType = {
  quizes: [],
  loading: true
}

const QuizList = () => {
  const [data, setData] = useState<initialStateType>(initialState)

  useEffect( () => {
    const fetchData = async () => {
      const { data } = await axios.get(url)

      const quizes: quizesType[] = []

      Object.keys(data).forEach((item, ind) => {
        quizes.push({
          id: item,
          name: `Тест №${ind + 1}`
        })
      })

      setData({
        quizes,
        loading: false
      })
    }
    fetchData()
      .catch(console.error)
  }, [])

  return (
    <div className={styles.quizList}>
      <div>
        <h2 className={styles.title}>Список тестов</h2>

        {
          !data.loading
           ? <ul className={styles.list}>
            {data.quizes && data.quizes.map((quiz) => (
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
          : <Loader />
        }
      </div>
    </div>
  )
}

export default QuizList