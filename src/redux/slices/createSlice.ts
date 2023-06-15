import axios from '../../axios/axios-quiz'
import { RootState } from "../store"
import {
  createAsyncThunk,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit"

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

type answerType = {
    id: number | undefined
    text: string | undefined
}

type quizType = {
    question: string | undefined
    rightAnswerId: number
    idQuestion: number
    answers: answerType[]
}

interface createQuizType {
    createQuiz: quizType[]
    status: Status
}

const initialState: createQuizType = {
    createQuiz: [],
    status: Status.LOADING
}

export const finishCreateQuiz = createAsyncThunk<quizType[], quizType[]>(
    'createQuiz/finishCreateQuizStatus',
    async (createQuiz) => {
        await axios.post('/quizes.json', createQuiz)

        return createQuiz
    }
)

export const createQuizSlice = createSlice({
    name: 'createQuiz',
    initialState,
    reducers: {
        createQuizQuestion(state, actions: PayloadAction<quizType>) {
            state.createQuiz = state.createQuiz.concat(actions.payload)
        },
        resetQuizState(state) {
            state.createQuiz = []
            state.status = Status.LOADING
        }
    },
    extraReducers: (builder) => {
        builder.addCase(finishCreateQuiz.pending, (state) => {
            state.status = Status.LOADING
            state.createQuiz = []
        })
        builder.addCase(finishCreateQuiz.fulfilled, (state, actions: PayloadAction<quizType[]>) => {
            state.createQuiz = actions.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(finishCreateQuiz.rejected, (state) => {
            state.status = Status.ERROR
            state.createQuiz = []
        })
    }
})

export const selectCreateQuiz = (state: RootState) => state.createQuiz

export const { createQuizQuestion, resetQuizState } = createQuizSlice.actions

export default createQuizSlice.reducer