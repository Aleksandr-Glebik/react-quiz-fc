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
    onChange?: () => void
}

// const isInvalid = ({
//     valid,
//     touched,
//     shouldValidate
// }) => {
//     return !valid && shouldValidate && touched
// }

const Input: React.FC<inputType> = ({
    inputType,
    placeholder,
    addStyles,
    label,
    value,
    onChange,
    errorMessage
}) => {
  const htmlFor = `${inputType}-${Math.random()}`

  return (
    <div className={styles.inputContainer}>
        <label
          htmlFor={htmlFor}
          className={clsx(
            styles.label,
            errorMessage ? styles.invalid : ''
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
            errorMessage && <span className={styles.errorValidate}>
                    {errorMessage}
            </span>
        }
        {/* {
          isInvalid()
            ? (<span className={styles.errorValidate}>
                {errorMessage || 'Ввудите верное значение'}
              </span>)
            : null
        } */}

    </div>
  )
}

export default Input