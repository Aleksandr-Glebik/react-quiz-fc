import React from 'react'
import styles from './Drawer.module.scss'
import clsx from 'clsx'
import Backdrop from '../../UI/Backdrop/Backdrop'

interface DrawerType {
    isOpenMenu: boolean
    handlerClick: () => void
}

const Drawer: React.FC<DrawerType> = ({ isOpenMenu, handlerClick }) => {
  return (
    <>
        {isOpenMenu && <Backdrop handlerClick={handlerClick} />}
        <nav className={clsx(styles.drawer, isOpenMenu ? styles.open : '')}>
            <ul className={styles.list}>
                <li className={styles.item}>1</li>
                <li className={styles.item}>2</li>
                <li className={styles.item}>3</li>
            </ul>
        </nav>
    </>
  )
}

export default Drawer