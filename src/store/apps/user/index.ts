// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { performLogin, createUser } from 'src/repository/apps/user'

// ** Axios Imports
import axios from 'axios'
import { LoginParams, RegisterParams } from 'src/context/types'

interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: DataParams) => {
  const response = await axios.get('/apps/users/list', {
    params
  })

  return response.data
})

// ** Authenticate User
export const authenticateUser = createAsyncThunk('appUsers/authenticateUser', async (params: LoginParams) => {
  const { error, message, data } = await performLogin(params)
  const { callback } = params

  return { error, message, data, params, callback }
})

// ** Register User
export const registerUser = createAsyncThunk('appUsers/registerUser', async (params: RegisterParams) => {
  const { error, message, data } = await createUser(params)

  return { error, message, data, callback: params.socialLoginCallback }
})

// ** Add User
export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await axios.post('/apps/users/add-user', {
      data
    })
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete('/apps/users/delete', {
      data: id
    })
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    loading: false,
    user: null,
    showNotice: false,
    message: ''
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setShowNotice: (state, action) => {
      state.showNotice = action.payload
    },
    setMessage: (state, action) => {
      state.message = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.user = action.payload.data.login.user
        if (action.payload.callback) {
          action.payload.callback(
            action.payload.error,
            action.payload.message,
            state.user,
            action.payload.data.login.authToken,
            action.payload.data.login.refreshToken,
            action.payload.data.login.loggedInCookieName,
            action.payload.data.login.loggedInCookieValue,
            action.payload.params.rememberMe ? action.payload.params.rememberMe : false
          )
        }
      } else {
        state.showNotice = action.payload.error
        state.message = action.payload.message
      }

      state.loading = false
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.message = action.payload.message
      state.showNotice = true
      state.loading = false

      if (action.payload.callback && action.payload.data) {
        action.payload.callback(
          action.payload.error,
          action.payload.message,
          action.payload.data.user,
          action.payload.data.authToken,
          action.payload.data.refreshToken,
          action.payload.data.refreshToken,
          action.payload.data.refreshToken,
          true
        )
      }
    })
  }
})

export const { setLoading, setShowNotice, setMessage } = appUsersSlice.actions
export default appUsersSlice.reducer
