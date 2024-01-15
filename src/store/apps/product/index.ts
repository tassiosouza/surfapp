// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts } from 'src/repository/apps/product/'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchProducts = createAsyncThunk('appUsers/fetchData', async () => {
  const { error, message, data } = await getProducts()

  return { error, message, data }
})

export const appProductSlice = createSlice({
  name: 'appProducts',
  initialState: {
    products: [],
    loading: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log('product return: ' + JSON.stringify(action.payload.data))
      state.loading = false
      state.products = action.payload.data
    })
  }
})

export const { setLoading } = appProductSlice.actions
export default appProductSlice.reducer
