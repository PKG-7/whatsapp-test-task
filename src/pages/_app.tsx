import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SelectedChatProvider } from 'context/ChatContext'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SelectedChatProvider>
                <Component {...pageProps} />
                <ReactQueryDevtools />
            </SelectedChatProvider>
        </QueryClientProvider>
    )
}

export default MyApp
