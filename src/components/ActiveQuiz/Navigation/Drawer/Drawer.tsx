import React from 'react'
import styles from './Drawer.module.scss'
import clsx from 'clsx'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../../../redux/slices/authSlice'
interface DrawerType {
    isOpenMenu: boolean
    handlerClick: () => void
}

const Drawer: React.FC<DrawerType> = ({ isOpenMenu, handlerClick }) => {
  let pathArr = [
    {name: 'Авторизация', path: '/'},
    {name: 'Список', path: '/quiz-list'},
    {name: 'Создать тест', path: '/quiz-creator'},
  ]

  const { token } = useSelector(selectAuth)

  if (token.length === 0) {
    pathArr = pathArr.filter(item => item.path !== '/quiz-creator')
  }

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