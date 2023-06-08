import React, { useEffect, useState } from 'react'
import styles from './Auth.module.scss'
import Button from '../../components/ActiveQuiz/UI/Button/Button'
import Input from '../../components/ActiveQuiz/UI/Input/Input'

type validationEmailType = {
  required: boolean
  email?: boolean
}
interface initialEmailStateType {
  value: string
  type: string
  label: string
  placeholder: string
  errorMessage: string
  valid: boolean
  touched: boolean
  validation: validationEmailType
}

const initialEmailState = {
  value: '',
  type: 'email',
  label: 'Email',
  placeholder: 'Введите email',
  errorMessage: 'Введите корректный email',
  valid: false,
  touched: false,
  validation: {
    required: true,
    email: true
  }
}

type validationPasswordType = {
  required: boolean
  minLength?: number
}

type validateInputType = {
  required: boolean
  email?: boolean
  minLength?: number
}
interface initialPasswordStateType {
  value: string
  type: string
  label: string
  placeholder: string
  errorMessage: string
  valid: boolean
  touched: boolean
  validation: validationPasswordType
}

const initialPasswordState = {
  value: '',
  type: 'password',
  label: 'Пароль',
  placeholder: 'Введите пароль',
  errorMessage: 'Введите корректный пароль',
  valid: false,
  touched: false,
  validation: {
    required: true,
    minLength: 6
  }
}

function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const Auth = () => {
  const submitHandler = (event: any) => {
    event.preventDefault()
  }

  const [email, setEmail] = useState<initialEmailStateType>(initialEmailState)
  const [password, setPassword] = useState<initialPasswordStateType>(initialPasswordState)
  const [isFormValid, setIsFormValid] = useState(false)

  const loginHandler = () => {

  }

  const registerHandler = () => {

  }

  const validateInput = (
    value: string,
    obj: validateInputType
  ) => {
    if (!obj) {
      return true
    }

    let isValid = true

    if (obj.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (obj?.email) {
      isValid = validateEmail(email.value) && isValid
    }

    if (obj?.minLength) {
      isValid = value.length >= obj.minLength && isValid
    }

    return isValid
  }

  const onChangeEmail = (event: any) => {
    setEmail({
      ...email,
      touched: true,
      value: event.target.value,
      valid: validateInput(email.value, email.validation)
    })
  }

  const onChangePassword = (event: any) => {
    setPassword({
      ...password,
      touched: true,
      value: event.target.value,
      valid: validateInput(password.value, password.validation)
    })
  }

  console.log('email', email.valid)
  console.log('password', password.valid)
  console.log('isFormValid', isFormValid)


  useEffect( () => {
    if (email.valid && password.valid) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }, [email.valid, password.valid])

  return (
    <div className={styles.auth}>
      <div className={styles.container}>
        <h2 className={styles.title}>Авторизация</h2>

        <form
          className={styles.form}
          onSubmit={event => submitHandler(event)}
        >
          <Input
            inputType={email.type}
            placeholder={email.placeholder}
            addStyles='inputAuth'
            label={email.label}
            errorMessage={email.errorMessage}
            value={email.value}
            shouldValidate={!!email.validation}
            onChange={onChangeEmail}
            valid={email.valid}
            touched={email.touched}
          />
          <Input
            inputType={password.type}
            placeholder={password.placeholder}
            addStyles='inputAuth'
            label={password.label}
            errorMessage={password.errorMessage}
            value={password.value}
            shouldValidate={!!password.validation}
            onChange={onChangePassword}
            valid={password.valid}
            touched={password.touched}
          />
          <div className={styles.btnContainer}>
            <Button
              type='btnLogin'
              onClick={loginHandler}
              disabled={isFormValid ? false : true}
            >
              Войти
            </Button>
            <Button
              type='btnRegister'
              onClick={registerHandler}
              disabled={isFormValid ? false : true}
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