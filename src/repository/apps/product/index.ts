import { PRODUCTS } from './query'
import apolloClient from '../../apollo-client'

export const getProducts = async () => {
  let response = null
  let message = 'Internal server error'

  try {
    response = await apolloClient.query({
      query: PRODUCTS
    })
    message = 'success'
  } catch (e: any) {
    message = e.message
  }

  console.log('products response: ' + response)

  return {
    error: !message.includes('success'),
    message: message,
    data: response ? response.data : null
  }
}
