import React from 'react'
import styles from './MenuToggle.module.scss'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons'

interface MenuToggleType {
    isOpenMenu: boolean
    handlerIconClick: () => void
}

const MenuToggle: React.FC<MenuToggleType> = ({
    isOpenMenu,
    handlerIconClick
}) => {
  return (
    <FontAwesomeIcon
        icon={isOpenMenu ? faXmark : faBars}
        className={clsx(styles.icon, isOpenMenu ? styles.open : '')}
        onClick={handlerIconClick}
    />
  )
}

export default MenuToggle