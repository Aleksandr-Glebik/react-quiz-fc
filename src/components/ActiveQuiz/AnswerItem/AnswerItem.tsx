import React, { useState, useEffect } from 'react'
import styles from './AnswerItem.module.scss'
import clsx from 'clsx'

interface AnswersItemType {
    id: number
    key: string
    item: string
    rightAnswerId: number
    onAnswerClick: (answerId: number) => void
}

const AnswersItem: React.FC<AnswersItemType> = ({
    item,
    id,
    onAnswerClick,
    rightAnswerId
}) => {
  const [isActive, setIsActive] = useState(false)

  const onClickHandler = () => {
    onAnswerClick(id)
    setIsActive(prev => !prev)
  }

  const setBgColorFromItem = (
    isActive: boolean,
    id?: number,
    rightAnswerId?: number
  ): string => {
    if (isActive === true && id === rightAnswerId) {
        return clsx(styles.item, styles.success)
    } else if (isActive === true && id !== rightAnswerId) {
        return clsx(styles.item, styles.error)
    } else if (isActive === false) {
        return styles.item
    } else {
        return styles.item
    }
  }

  useEffect( () => {
    setIsActive(false)
  }, [])

  useEffect( () => {
    setIsActive(false)
  }, [rightAnswerId])

  return (
    <li
      className={setBgColorFromItem(isActive, id, rightAnswerId)}
      onClick={onClickHandler}
    >
        {item}
    </li>
  )
}

export default AnswersItem