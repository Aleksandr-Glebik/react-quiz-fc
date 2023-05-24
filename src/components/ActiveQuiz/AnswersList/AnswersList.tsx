
import React from 'react'
import styles from './AnswersList.module.scss'
import AnswersItem from '../AnswerItem/AnswerItem'

type AnswerType = {
    id: number
    text: string
}

interface AnswersType {
    answers: AnswerType[]
}

const AnswersList: React.FC<AnswersType> = ( { answers } ) => {
  return (
    <ul className={styles.list}>
        {
          answers.map(item => (
            <AnswersItem
              key={item.id.toString()}
              item={item.text}
            />
          ))
        }
    </ul>
  )
}

export default AnswersList