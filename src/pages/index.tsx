import Head from 'next/head'
import {Inter} from 'next/font/google'
import {SearchInput} from "@/components/SearchInput";
import {VertCenter} from '@/components/Layout/vert-center';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Transaction List</title>
      </Head>
        <VertCenter>
            <main>
                <div>
                    Please enter a transaction address:
                    <SearchInput />
                </div>
            </main>
        </VertCenter>
    </>
  )
}
