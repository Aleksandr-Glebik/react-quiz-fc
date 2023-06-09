import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'
import NotFoundBlock from './pages/NotFoundPage/NotFoundPage'
import QuizList from './pages/QuizList/QuizList'
import Auth from './pages/Auth/Auth'
import QuizCreator from './pages/QuizCreator/QuizCreator'
import Quiz from './pages/Quiz/Quiz'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundBlock />,
    children: [
      {
        path: "/",
        element: <Auth />,
      },
      {
        path: "/quiz/:id",
        element: <Quiz />,
      },
      {
        path: "/quiz-list",
        element: <QuizList />,
      },
      {
        path: "/quiz-creator",
        element: <QuizCreator />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
