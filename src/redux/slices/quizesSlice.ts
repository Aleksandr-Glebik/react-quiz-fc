import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import axios from '../../axios/axios-quiz'

export type QuizesSliceItemType = {
    id: string
    name: string
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}
interface QuizesSliceState {
    quizes: QuizesSliceItemType[]
    status: Status
}

const initialState: QuizesSliceState = {
    quizes: [],
    status: Status.LOADING
}

export const fetchQuizes = createAsyncThunk<QuizesSliceItemType[]>(
    'quizes/fetchQuizesStatus',
    async () => {
        const { data } = await axios.get('/quizes.json')

        const quizes: QuizesSliceItemType[] = []

        Object.keys(data).forEach((item, ind) => {
            quizes.push({
              id: item,
              name: `Тест №${ind + 1}`
            })
        })

        return quizes
    }
)

export const quizesSlice = createSlice({
    name: 'quizes',
    initialState,
    reducers: {
        setQuizes(state, actions: PayloadAction<QuizesSliceItemType[]>) {
            state.quizes = actions.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuizes.pending, (state) => {
            state.status = Status.LOADING
            state.quizes = []
        })
        builder.addCase(fetchQuizes.fulfilled, (state, actions: PayloadAction<QuizesSliceItemType[]>) => {
            state.quizes = actions.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchQuizes.rejected, (state) => {
            state.status = Status.ERROR
            state.quizes = []
        })
    }
})

export const selectQuizes = (state: RootState) => state.quizes

export const { setQuizes } = quizesSlice.actions

export default quizesSlice.reducer