import { LOGIN } from './mutation'
import apolloClient from '../../apollo-client'
import { LoginParams } from 'src/context/types'

export const performLogin = async (params: LoginParams) => {
  const response = await apolloClient.mutate({
    mutation: LOGIN,
    variables: {
      input: {
        username: params.email,
        password: params.password
      }
    }
  })

  return { error: false, message: 'success', data: response.data }
}
