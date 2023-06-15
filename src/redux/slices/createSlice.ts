import axios from '../../axios/axios-quiz'
import { RootState } from "../store"
import {
  createAsyncThunk,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit"

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
}

const initialState: createQuizType = {
    createQuiz: []
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(finishCreateQuiz.pending, (state) => {
            state.createQuiz = []
        })
        builder.addCase(finishCreateQuiz.fulfilled, (state, actions: PayloadAction<quizType[]>) => {
            state.createQuiz = actions.payload
        })
        builder.addCase(finishCreateQuiz.rejected, (state) => {
            state.createQuiz = []
        })
    }
})

export const selectCreateQuiz = (state: RootState) => state.createQuiz

export const { createQuizQuestion } = createQuizSlice.actions

export default createQuizSlice.reducer