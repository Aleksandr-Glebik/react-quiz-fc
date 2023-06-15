import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'
import quizesSlice from './slices/quizesSlice'
import quizSlice  from "./slices/quizSlice"
import createQuizSlice  from "./slices/createSlice"

const store = configureStore({
    reducer: {
        quizes: quizesSlice,
        quiz: quizSlice,
        createQuiz: createQuizSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store