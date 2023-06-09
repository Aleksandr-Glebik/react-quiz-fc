import { inputType } from "../components/ActiveQuiz/UI/Input/Input"

type validateInputQuizCreatorType = {
    required: boolean
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
    valid?: boolean
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