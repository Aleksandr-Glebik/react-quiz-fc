import React from 'react'
import styles from './Select.module.scss'

type optionType = {
    value: number
    text: string
}

interface selectType {
    label: string
    value: number
    onChangeHandler: (event: any) => void
    options: optionType[]
}

const Select: React.FC<selectType> = ({ label, value, onChangeHandler, options }) => {
  const htmlFor = `${label}_${Math.random()}`

  return (
    <div className={styles.container}>
        <label
          htmlFor={htmlFor}
          className={styles.label}
        >
            {label}
        </label>
        <select
          id={htmlFor}
          className={styles.select}
          value={value}
          onChange={onChangeHandler}
        >
            {
              options.map((option, ind) => {
                return (
                    <option
                      key={`${option}_${ind}`}
                      value={option.value}
                    >
                        {option.text}
                    </option>
                )
              })
            }
        </select>
    </div>
  )
}

export default Select