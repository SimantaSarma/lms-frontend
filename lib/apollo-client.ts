// lib/apollo-client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API, // example: http://localhost:4000/graphql
  cache: new InMemoryCache(),
})

export default client
