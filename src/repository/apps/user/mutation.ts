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
  mutation ($email: String!, $username: String!, $lastName: String!, $password: String!, $firstName: String!) {
    registerUser(
      input: { email: $email, username: $username, lastName: $lastName, password: $password, firstName: $firstName }
    ) {
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
