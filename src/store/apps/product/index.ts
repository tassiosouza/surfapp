// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts } from 'src/repository/apps/product/'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Products
export const fetchProducts = createAsyncThunk('appUsers/fetchData', async () => {
  const { error, message, data } = await getProducts()

  return { error, message, data }
})

// ** Add to cart
export const addToCart = createAsyncThunk('appUsers/addToCart', async (params: { id: string; callback: any }) => {
  const { id, callback } = params
  const { error, message, data } = await getProducts()

  return { error, message, data, callback }
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
      state.loading = false
      state.products = action.payload.data
    })
    builder.addCase(addToCart.fulfilled, (state, action) => {
      action.payload.callback()
    })
  }
})

export const { setLoading } = appProductSlice.actions
export default appProductSlice.reducer
