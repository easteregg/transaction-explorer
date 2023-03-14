import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/tanstack-query";
import {useEffect} from "react";
import {initApi} from "@/lib/moralis";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Karla} from "next/font/google";

const karla = Karla({
    subsets: ['latin'],
    variable: "--font-karla"
})

export default function App({Component, pageProps}: AppProps) {
    useEffect(() => {
        initApi();
    }, []);

    return (
        <div className={`${karla.variable} font-sans`}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false}/>
                <Component {...pageProps} />
            </QueryClientProvider>
        </div>
    )
}
