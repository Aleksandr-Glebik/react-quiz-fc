import React, { useEffect } from 'react'
import Layout from './hoc/Layout/Layout'
import { Outlet } from "react-router-dom"

import { useAppDispatch } from './redux/store'
import {  autoLogin  } from './redux/slices/authSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect( () => {
    dispatch(autoLogin())
  }, [dispatch])

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App
