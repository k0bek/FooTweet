import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'

import Layout from '@/components/Layout'

const queryClient = new QueryClient()

import { SkeletonTheme } from 'react-loading-skeleton'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SkeletonTheme baseColor="#334155" highlightColor="#1F2937">
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </SessionProvider>
    </SkeletonTheme>
  )
}
