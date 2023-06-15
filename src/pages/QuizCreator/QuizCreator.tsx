import React, { useState, useEffect } from 'react'
import styles from './QuizCreator.module.scss'

import Button from '../../components/ActiveQuiz/UI/Button/Button'
import Input from '../../components/ActiveQuiz/UI/Input/Input'
import Auxilliary from '../../hoc/Auxilliary/Auxilliary'
import Select from '../../components/ActiveQuiz/UI/Select/Select'
import {
  createControl,
  createControlType,
  validateControls,
  createFormControlsType,
  validateForm
} from '../../form/FormFramework'

import { useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import {
  createQuizQuestion,
  selectCreateQuiz,
  finishCreateQuiz,
  resetQuizState,
  Status
} from '../../redux/slices/createSlice'

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
  formControls: createFormControlsType
  rightAnswerId: number
  isFormValid: boolean
}

const initialState = {
  formControls: createFormControls(),
  rightAnswerId: 1,
  isFormValid: false
}

const QuizCreator = () => {
  const dispatch = useAppDispatch()
  const { createQuiz, status } = useSelector(selectCreateQuiz)
  const [state, setState] = useState<initialStateType>(initialState)

  const changeHandlerControl = (value: string, controlName: string) => {
    const formControls = { ...state.formControls}
    const control = formControls[controlName]

    control.touched = true
    control.value = value
    control.valid = validateControls(control.value, control.validation)

    formControls[controlName] = control
    setState({
      ...state,
      formControls,
      isFormValid: validateForm(formControls)
    })
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

  const addQuestionHandler = (event: any) => {
    event.preventDefault()

    const {
      question,
      option1,
      option2,
      option3,
      option4
    } = state.formControls

    const questionItem = {
      question: question.value,
      idQuestion: createQuiz.length + 1,
      rightAnswerId: state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id }
      ]
    }

    dispatch(createQuizQuestion(questionItem))
    setState({
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false
    })
  }

  const createTestHandler = async (event: any) => {
    event.preventDefault()

    dispatch(finishCreateQuiz(createQuiz))

    setState({
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false
    })
  }

  const onChangeHandler = (event: any) => {
    event.preventDefault()
    setState({
      ...state,
      rightAnswerId: +event.target.value
    })
  }

  useEffect( () => {
    if (status === Status.SUCCESS) {
      dispatch(resetQuizState())
    }
  }, [status, dispatch])

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
              disabled={state.isFormValid ? false : true}
            >
              Добавить вопрос
            </Button>
            <Button
              type='createTest'
              onClick={createTestHandler}
              disabled={createQuiz.length === 0 ? true : false}
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