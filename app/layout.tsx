'use client'

import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apollo-client'
import Layout from '@/components/Layout'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import { ToastContainer } from 'react-toastify'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <Layout>{children}</Layout>
          <ToastContainer position="top-right" autoClose={3000} />
        </ApolloProvider>
      </body>
    </html>
  )
}
