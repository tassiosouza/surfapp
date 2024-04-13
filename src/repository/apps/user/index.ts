import { LOGIN, REFRESH_TOKEN, REGISTER } from './mutation'
import apolloClient from '../../apollo-client'
import { LoginParams, RegisterParams } from 'src/context/types'

export const performLogin = async (params: LoginParams) => {
  let response = null
  let message = 'Internal server error'

  try {
    response = await apolloClient.mutate({
      mutation: LOGIN,
      variables: {
        input: {
          username: params.email,
          password: params.password
        }
      }
    })
    message = 'success'
  } catch (e: any) {
    message = e.message
  }
  console.log('response login', response)
  return {
    error: !message.includes('success'),
    message: message,
    data: response ? response.data : null
  }
}

export const refreshJwtAuthToken = async () => {
  let response = null
  let message = 'Internal server error'

  try {
    response = await apolloClient.mutate({
      mutation: REFRESH_TOKEN,
      variables: {
        input: {
          jwtRefreshToken: window.localStorage.getItem('refreshToken')
        }
      }
    })
    message = 'success'
  } catch (e: any) {
    message = e.message
  }
  console.log('response refresh token', response)

  if (response && response.data) {
    // Code to be executed if response.data exists
    console.log('update authtoken: ', JSON.stringify(response.data))
  }

  return {
    error: !message.includes('success'),
    message: message,
    data: response ? response.data : null
  }
}

export const createUser = async (params: RegisterParams) => {
  let response = null
  let message = 'Internal server error'

  try {
    response = await apolloClient.mutate({
      mutation: REGISTER,
      variables: {
        email: params.email,
        username: params.email,
        lastName: params.lastName,
        password: params.password,
        firstName: params.firstName,
        description: params.description,
        websiteUrl: params.imageUrl
      }
    })
    message = 'Successfully registered'
  } catch (e: any) {
    message = e.message
  }

  let data = null
  if (response?.data) {
    data = {
      authToken: response.data.registerUser.user.jwtAuthToken,
      refreshToken: response.data.registerUser.user.jwtRefreshToken,
      user: {
        email: params.email,
        firstName: params.firstName,
        id: response.data.registerUser.user.id,
        lastName: params.lastName,
        name: params.firstName + ' ' + params.lastName,
        role: 'admin'
      }
    }
  }
  return {
    error: !message.includes('success'),
    message: message,
    data: data
  }
}
