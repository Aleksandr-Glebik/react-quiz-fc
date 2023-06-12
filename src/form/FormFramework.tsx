import { inputType } from "../components/ActiveQuiz/UI/Input/Input"

type validateInputQuizCreatorType = {
    required: boolean | undefined | null
}
export interface createFormControlsType {
    [question: string]: createControlType
    option1: createControlType
    option2: createControlType
    option3: createControlType
    option4: createControlType
  }
export interface createControlType {
    inputType?: string
    placeholder?: string
    addStyles?: string
    label?: string
    value?: string
    errorMessage?: string
    onChange?: (value: any) => void
    shouldValidate?: boolean
    valid: boolean
    touched?: boolean
    validation?: validateInputQuizCreatorType
    id?: number
}

export const createControl = (
    config: inputType,
    validation: validateInputQuizCreatorType
): createControlType => {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}

export const validateControls = (value: string, validation: validateInputQuizCreatorType | undefined) => {
    if (!validation) {
        return true
    }

    let isValid = true

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    return isValid
}

export const validateForm = (formControls: createFormControlsType) => {
    let isFormValid = true

    Object.keys(formControls).forEach(name => {
        isFormValid = formControls?.[name].valid && isFormValid
    })

    return isFormValid
}