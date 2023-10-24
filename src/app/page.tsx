'use client'
import Link from 'next/link';
import '@/styles/app.css'

import type { Metadata } from 'next';
import HeaderExample from '@/components/app.header';


export default function Home() {


  return (
    <>
      <HeaderExample />
      <div>
        Hello world
      </div>
    </>

  )
}
