
import React from 'react'
import styles from './AnswersList.module.scss'
import AnswersItem from '../AnswerItem/AnswerItem'

type AnswerType = {
    id: number
    text: string
}
interface AnswersType {
    answers: AnswerType[]
    rightAnswerId: number
    onAnswerClick: (answerId: number) => void
}

const AnswersList: React.FC<AnswersType> = ( { answers, onAnswerClick, rightAnswerId } ) => {
  return (
    <ul className={styles.list}>
        {
          answers.map(item => (
            <AnswersItem
              key={item.id.toString()}
              item={item.text}
              id={item.id}
              onAnswerClick={onAnswerClick}
              rightAnswerId={rightAnswerId}
            />
          ))
        }
    </ul>
  )
}

export default AnswersList