import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from '../store'
import axios from '../../axios/axios-quiz'

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export type AnswerType = {
    id: number
    text: string
}

export type answerStateType = {
    [id: number]: 'success' | 'error'
}

export type FetchQuizArgType = string

export type QuestionType = {
    idQuestion: number
    question: string
    rightAnswerId: number
    answers: AnswerType[]
}

interface QuizSliceState {
    isFinished: boolean
    activeQuestionId: number
    answerState: answerStateType[]
    quiz: QuestionType[]
    status: Status
}

const initialState: QuizSliceState = {
    isFinished: false,
    activeQuestionId: 1,
    answerState: [],
    quiz: [],
    status: Status.LOADING
}

export const fetchQuiz = createAsyncThunk<QuestionType[], FetchQuizArgType>(
    'quiz/fetchQuizStatus',
    async (id) => {
        const response = await axios.get(`/quizes/${id}.json`)
        const quiz = response.data
        setQuiz(quiz)

        return quiz
    }
)

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuiz(state, actions: PayloadAction<QuestionType[]>) {
            state.quiz = actions.payload
        },
        setIsFinished(state, actions: PayloadAction<boolean>) {
            state.isFinished = actions.payload
        },
        setActiveQuestionId(state, actions: PayloadAction<number>) {
            state.activeQuestionId = actions.payload
        },
        setAnswerState(state, actions: PayloadAction<answerStateType[]>) {
            state.answerState = actions.payload
        },
        retryStateQuiz(state) {
            state.activeQuestionId = 1
            state.answerState = []
            state.isFinished = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuiz.pending, (state) => {
            state.status = Status.LOADING
            state.quiz = []
        })
        builder.addCase(fetchQuiz.fulfilled, (state, actions: PayloadAction<QuestionType[]>) => {
            state.quiz = actions.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchQuiz.rejected, (state) => {
            state.status = Status.ERROR
            state.quiz = []
        })
    }
})

export const selectQuiz = (state: RootState) => state.quiz

export const {
  setQuiz,
  setIsFinished,
  setActiveQuestionId,
  setAnswerState,
  retryStateQuiz
} = quizSlice.actions

export default quizSlice.reducer