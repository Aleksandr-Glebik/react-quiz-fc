import React, { ReactNode } from 'react'
import styles from './Button.module.scss'
import clsx from 'clsx'

interface buttonType {
    children?: ReactNode | string
    disabled?: boolean
    type?: 'btnLogin' | 'btnRegister' | 'backToQuizList' | 'addQuiz' | 'createTest'
    onClick?: (event: any) => void
}

const Button: React.FC<buttonType> = ({ children, onClick, disabled, type }) => {
  return (
    <button
      className={clsx(styles.btn, type ? styles[type] : '')}
      onClick={onClick}
      disabled={disabled}
    >
        {children}
    </button>
  )
}

export default Button