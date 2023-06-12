import React from 'react'
import ReactDOM from 'react-dom/client'
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
        element: <QuizList />,
      },
      {
        path: "/quiz/:id",
        element: <Quiz />,
      },
      {
        path: "/auth",
        element: <Auth />,
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
  <RouterProvider router={router} />
)
