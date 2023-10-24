
import Link from 'next/link';
import '@/styles/app.css'

import type { Metadata } from 'next';
import SearchResults from '@/components/app.search';

export const metadata: Metadata = {
    title: 'Search page',
    description: 'Search page',
}

export default function Home() {


    return (
        <>
            <SearchResults />
        </>

    )
}