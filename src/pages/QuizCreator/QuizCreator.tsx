import React, { useState } from 'react'
import styles from './QuizCreator.module.scss'
import Button from '../../components/ActiveQuiz/UI/Button/Button'
import Input from '../../components/ActiveQuiz/UI/Input/Input'
import { createControl, createControlType } from '../../form/FormFramework'
import Auxilliary from '../../hoc/Auxilliary/Auxilliary'
import Select from '../../components/ActiveQuiz/UI/Select/Select'
interface createFormControlsType {
  [question: string]: createControlType
  option1: createControlType
  option2: createControlType
  option3: createControlType
  option4: createControlType
}

const createOptionControl = (number: number): createControlType => {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Вариант ответа не может быть пустым',
    id: number
  }, { required: true })
}

const createFormControls = (): createFormControlsType => {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}
interface initialStateType {
  quiz: any
  formControls: createFormControlsType
  rightAnswerId: number
}

const initialState = {
  quiz: [],
  formControls: createFormControls(),
  rightAnswerId: 1
}

const QuizCreator = () => {
  const [state, setState] = useState<initialStateType>(initialState)

  const changeHandlerControl = (value: string, controlName: string) => {

  }

  const renderInputGroup = () => {
    const inputs = Object.keys(state?.formControls).map((controlName, index) => {
      let control = state.formControls?.[controlName]

      return (
              <Auxilliary key={`${control.id}_${index}`}>
                <Input
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    addStyles={'inputAuth'}
                    onChange={event => changeHandlerControl(event.target.value, controlName)}
                />
                { index === 0 ? <hr className={styles.hr}/> : null }
              </Auxilliary>
              )
    })
    return inputs
  }


  const submitHandler = (event: any) => {
    event.preventDefault()
  }

  const addQuestionHandler = () => {

  }

  const createTestHandler = () => {

  }

  const onChangeHandler = (event: any) => {
    event.preventDefault()
    setState({
      ...state,
      rightAnswerId: +event.target.value
    })
  }

  return (
    <div className={styles.quizCreator}>
      <div className={styles.container}>
        <h2 className={styles.title}>Создание тестов</h2>
        <form
          className={styles.form}
          onSubmit={event => submitHandler(event)}
        >
          {renderInputGroup()}

          <Select
            label='Выберите правильный вариант ответа'
            value={state.rightAnswerId}
            onChangeHandler={onChangeHandler}
            options={[
              {text: '1', value: 1},
              {text: '2', value: 2},
              {text: '3', value: 3},
              {text: '4', value: 4},
            ]}
          />

          <div className={styles.btnContainer}>
            <Button
              type='addQuiz'
              onClick={addQuestionHandler}
              >
              Добавить вопрос
            </Button>
            <Button
              type='createTest'
              onClick={createTestHandler}
              >
              Создать тест
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuizCreator