// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { performLogin } from 'src/repository/apps/ user'

// ** Axios Imports
import axios from 'axios'
import { LoginParams } from 'src/context/types'

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

  console.log('error: ' + error)
  console.log('message: ' + message)
  console.log('data: ' + JSON.stringify(data))

  return { error, message, data, callback }
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
    authenticating: false,
    user: null
  },
  reducers: {
    setAuthenticating: (state, action) => {
      state.authenticating = action.payload
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
      console.log('payload', JSON.stringify(action.payload))
      state.user = action.payload.data.login.user
      console.log('user store: ' + JSON.stringify(state.user))

      // state.authenticating = false
      if (action.payload.callback) {
        action.payload.callback(action.payload.error, action.payload.message, state.user)
      }
    })
  }
})

export const { setAuthenticating } = appUsersSlice.actions
export default appUsersSlice.reducer
