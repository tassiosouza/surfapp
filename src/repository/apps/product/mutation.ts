import { gql } from '@apollo/client'

export const REFRESH_TOKEN = gql`
  mutation refreshJwtAuthToken($jwtRefreshToken: String!) {
    refreshJwtAuthToken(input: { jwtRefreshToken: $jwtRefreshToken }) {
      authToken
    }
  }
`
