'use client'

import '@/styles/app.css'
import { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminPanel() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userLoggedIn = Cookies.get('isLoggedIn');
        if (userLoggedIn) {
            setIsLoggedIn(true);
        } else {
            router.push('/login');
        }
    }, []);

    return (
        <>
            {isLoggedIn && <Sidebar />}
        </>
    )
}