// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts } from 'src/repository/apps/product/'

// ** Fetch Users
export const fetchProducts = createAsyncThunk('appUsers/fetchData', async () => {
  const { error, message, data } = await getProducts()

  return { error, message, data }
})

export const appProductSlice = createSlice({
  name: 'appProduct',
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
      state.loading = false
    })
  }
})

export const { setLoading } = appProductSlice.actions
export default appProductSlice.reducer
