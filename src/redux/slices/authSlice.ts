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

export interface authArgType {
    email: string
    password: string
    returnSecureToken: boolean
    isLogin: boolean
}

interface authType {
    token: string
    status: Status
}

const initialState: authType = {
    token: '',
    status: Status.LOADING
}

export const authFetch = createAsyncThunk<authType, authArgType>(
    'auth/authFetchStatus',
    async (authData) => {
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_CLIENT_KEY}`

        if (authData.isLogin) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_CLIENT_KEY}`
        }

        const response = await axios.post(url, authData)
        const data = await response.data

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('userEmail', data.email)

        return data.idToken
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('userEmail')

            state.token = ''
            state.status = Status.LOADING
        },
        autoLogin(state) {
            let getTokenFromLS = localStorage.getItem('token')
            if (getTokenFromLS) {
                state.token = state.token + getTokenFromLS
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authFetch.pending, (state) => {
            state.status = Status.LOADING
            state.token = ''
        })
        builder.addCase(authFetch.fulfilled, (state, actions: PayloadAction<authType>) => {
            state.status = Status.SUCCESS
            state.token = state.token + actions.payload
        })
        builder.addCase(authFetch.rejected, (state) => {
            state.status = Status.ERROR
            state.token = ''
        })
    }
})

export const selectAuth = (state: RootState) => state.auth

export const { logout, autoLogin } = authSlice.actions

export default authSlice.reducer
