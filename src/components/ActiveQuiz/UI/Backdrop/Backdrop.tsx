import React from 'react'
import styles from './Backdrop.module.scss'
import clsx from 'clsx'

interface BackdropType {
    handlerClick: () => void
}

const Backdrop: React.FC<BackdropType> = ({ handlerClick }) => {
  return (
    <div
      className={clsx(styles.backdrop, )}
      onClick={handlerClick}
    />
  )
}

export default Backdrop