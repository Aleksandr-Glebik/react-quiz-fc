import React from 'react'
import styles from './AnswerItem.module.scss'

interface AnswersItemType {
    key: string
    item: string
}

const AnswersItem: React.FC<AnswersItemType> = ( { item } ) => {
  return (
    <li
      className={styles.item}
    >
        {item}
    </li>
  )
}

export default AnswersItem