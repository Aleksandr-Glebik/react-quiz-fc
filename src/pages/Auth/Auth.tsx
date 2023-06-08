import React from 'react'
import styles from './Auth.module.scss'
import Button from '../../components/ActiveQuiz/UI/Button/Button'
import Input from '../../components/ActiveQuiz/UI/Input/Input'

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
          <Input
            inputType='text'
            placeholder='Введите логин'
            addStyles='inputAuth'
            label='Email'
            errorMessage='error message'
          />
          <Input
            inputType='password'
            placeholder='Введите пароль'
            addStyles='inputAuth'
            label='Пароль'
            // errorMessage='error message'
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