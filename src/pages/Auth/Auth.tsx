import React from 'react'
import clsx from 'clsx'
import styles from './Auth.module.scss'
import Button from '../../components/ActiveQuiz/UI/Button/Button'

const Auth = () => {
  const submitHandler = (event: any) => {
    event.preventDefault()
  }

  return (
    <div className={styles.auth}>
      <div className={styles.container}>
        <h2 className={styles.title}>Авторизация</h2>

        <form
          className={styles.form}
          onSubmit={event => submitHandler(event)}
        >
          <input
            type='text'
            placeholder='Введите логин'
            className={clsx(styles.input)}
          />
          <input
            type='password'
            placeholder='Введите пароль'
            className={clsx(styles.input)}
          />
          <div className={styles.btnContainer}>
            <Button
              type='btnLogin'
            >
              Войти
            </Button>
            <Button
              type='btnRegister'
            >
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth