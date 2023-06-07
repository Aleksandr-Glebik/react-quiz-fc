import React from 'react'
import clsx from 'clsx'
import styles from './NotFoundPage.module.scss'
import { useNavigate } from 'react-router-dom'

const NotFoundBlock: React.FC = () => {
  const navigate = useNavigate()

  const redirectHomePage = () => {
    navigate('/')
  }

  return (
    <div className={styles.root}>
        <h1 >
            <span>😕</span>
            <br />
            Ничего не найдено
        </h1>
        <p className={styles.text}>
            Данная страница не найдена
        </p>
        <button
          className={clsx(styles.btn, styles.notFoundBtn)}
          onClick={redirectHomePage}
        >
          Перейти на главную страницу
        </button>
    </div>
  )
}

export default NotFoundBlock