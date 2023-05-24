
import React from 'react'
import styles from './Layout.module.scss'

interface LayoutType {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutType> = ( { children } ) => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
         { children }
      </main>
    </div>
  )
}

export default Layout