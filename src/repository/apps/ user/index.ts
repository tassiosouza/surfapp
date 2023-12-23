import { LOGIN } from './mutation'
import apolloClient from '../../apollo-client'
import { LoginParams } from 'src/context/types'

export const performLogin = async (params: LoginParams) => {
  console.log('trying to perform login:')
  const response = await apolloClient.mutate({
    mutation: LOGIN,
    variables: {
      input: {
        username: params.email,
        password: params.password
      }
    }
  })
  console.log('response: ' + JSON.stringify(response))
  if (response.errors) {
    console.log('message: ' + response.errors[0].message)
  }

  return {
    error: response.errors ? true : false,
    message: response.errors ? response.errors[0].message : 'success',
    data: response.data
  }
}
