import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_URL_BASE_API,
  cache: new InMemoryCache()
})

export default apolloClient
