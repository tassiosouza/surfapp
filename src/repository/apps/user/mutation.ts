import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      authToken
      user {
        email
        firstName
        id
        lastName
        name
        roles {
          nodes {
            name
          }
        }
      }
    }
  }
`

export const REGISTER = gql`
  mutation register($input: RegisterInput!) {
    registerUser(input: $input) {
      user {
        roles {
          nodes {
            id
          }
        }
      }
    }
  }
`
