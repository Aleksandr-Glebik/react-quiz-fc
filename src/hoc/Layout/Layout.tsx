
import React, { useState } from 'react'
import styles from './Layout.module.scss'
import MenuToggle from '../../components/ActiveQuiz/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/ActiveQuiz/Navigation/Drawer/Drawer'
interface LayoutType {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutType> = ( { children } ) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  return (
    <div className={styles.layout}>
      <Drawer
        isOpenMenu={isOpenMenu}
        handlerClick={() => setIsOpenMenu(false)}
      />
      <MenuToggle
        isOpenMenu={isOpenMenu}
        handlerIconClick={() => setIsOpenMenu(prev => !prev)}
      />
      <main className={styles.main}>
         { children }
      </main>
    </div>
  )
}

export default Layout