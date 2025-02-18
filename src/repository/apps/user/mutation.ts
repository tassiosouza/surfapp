import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      authToken
      refreshToken
      loggedInCookieName
      loggedInCookieValue
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

export const REFRESH_TOKEN = gql`
  mutation refreshJwtAuthToken($jwtRefreshToken: String!) {
    refreshJwtAuthToken(input: { jwtRefreshToken: $jwtRefreshToken }) {
      authToken
    }
  }
`

export const REGISTER = gql`
  mutation (
    $email: String!
    $username: String!
    $lastName: String!
    $password: String!
    $firstName: String!
    $description: String!
    $websiteUrl: String
  ) {
    registerUser(
      input: {
        email: $email
        username: $username
        lastName: $lastName
        password: $password
        firstName: $firstName
        description: $description
        websiteUrl: $websiteUrl
      }
    ) {
      user {
        id
        jwtAuthToken
        jwtRefreshToken
        roles {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`
export const USER = gql`
  mutation (
    $email: String!
    $username: String!
    $lastName: String!
    $password: String!
    $firstName: String!
    $description: String!
    $websiteUrl: String
  ) {
    registerUser(
      input: {
        email: $email
        username: $username
        lastName: $lastName
        password: $password
        firstName: $firstName
        description: $description
        websiteUrl: $websiteUrl
      }
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
