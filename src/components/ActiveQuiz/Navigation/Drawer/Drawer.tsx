import React from 'react'
import styles from './Drawer.module.scss'
import clsx from 'clsx'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'
interface DrawerType {
    isOpenMenu: boolean
    handlerClick: () => void
}

const pathArr = [
  {name: 'Список', path: '/'},
  {name: 'Авторизация', path: '/auth'},
  {name: 'Создать тест', path: '/quiz-creator'},
]

const Drawer: React.FC<DrawerType> = ({ isOpenMenu, handlerClick }) => {
  console.log('pathArr', pathArr)

  return (
    <>
        {isOpenMenu && <Backdrop handlerClick={handlerClick} />}
        <nav className={clsx(styles.drawer, isOpenMenu ? styles.open : '')}>
            <ul className={styles.list}>
              {pathArr.map((el, ind) => (
                <NavLink
                  key={`${el.name}_${ind}`}
                  to={el.path}
                  className={styles.item}
                  onClick={handlerClick}
                >
                  {el.name}
                </NavLink>
              ))}
            </ul>
        </nav>
    </>
  )
}

export default Drawer