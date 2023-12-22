import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation MyMutation($input: LoginInput!) {
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
