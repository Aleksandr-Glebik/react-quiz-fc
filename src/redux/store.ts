import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import quizesSlice from './slices/quizesSlice'

const store = configureStore({
    reducer: {
        quizes: quizesSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store