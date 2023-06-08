import React from 'react'
import styles from './Input.module.scss'
import clsx from 'clsx'

interface inputType {
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
}

interface isInvalidType {
    valid?: boolean
    touched?: boolean
    shouldValidate?: boolean
}

const isInvalid = ({
    valid,
    touched,
    shouldValidate
}: isInvalidType) => {
    return !valid && shouldValidate && touched
}

const Input: React.FC<inputType> = ({
    inputType,
    placeholder,
    addStyles,
    label,
    value,
    onChange,
    errorMessage,
    shouldValidate,
    valid,
    touched
}) => {
  const htmlFor = `${inputType}-${Math.random()}`

  return (
    <div className={styles.inputContainer}>
        <label
          htmlFor={htmlFor}
          className={clsx(
            styles.label,
            isInvalid({ valid, shouldValidate, touched }) ? styles.invalid : ''
          )}
        >
            {label}
        </label>
        <input
          id={htmlFor}
          type={inputType ? inputType : 'text'}
          placeholder={placeholder}
          className={clsx(
            styles.input,
            addStyles ? styles[addStyles] : ''
            )}
          value={value}
          onChange={onChange}
        />
        {
          isInvalid({ valid, shouldValidate, touched })
            ? (<span className={styles.errorValidate}>
                {errorMessage || 'Ввудите верное значение'}
              </span>)
            : null
        }

    </div>
  )
}

export default Input