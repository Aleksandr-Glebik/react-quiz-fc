import React from 'react'
import styles from './AnswerItem.module.scss'

interface AnswersItemType {
    id: number
    key: string
    item: string
    onAnswerClick: (answerId: number) => void
}

const AnswersItem: React.FC<AnswersItemType> = ( { item, id, onAnswerClick } ) => {
  return (
    <li
      className={styles.item}
      onClick={() => onAnswerClick(id)}
    >
        {item}
    </li>
  )
}

export default AnswersItem