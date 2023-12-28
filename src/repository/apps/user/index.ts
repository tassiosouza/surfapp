import { LOGIN, REGISTER } from './mutation'
import apolloClient from '../../apollo-client'
import { LoginParams, RegisterParams } from 'src/context/types'

export const performLogin = async (params: LoginParams) => {
  console.log('trying to perform login:')
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

  return {
    error: !message.includes('success'),
    message: message,
    data: response ? response.data : null
  }
}

export const createUser = async (params: RegisterParams) => {
  console.log('trying to perform register:')
  let response = null
  let message = 'Internal server error'

  try {
    response = await apolloClient.mutate({
      mutation: REGISTER,
      variables: {
        input: {
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email,
          username: params.email,
          password: params.password
        }
      }
    })
    message = 'success'
  } catch (e: any) {
    message = e.message
  }

  return {
    error: !message.includes('success'),
    message: message,
    data: response ? response.data : null
  }
}
