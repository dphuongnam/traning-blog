'use client'

import BlogsPost from '../blogs';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


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
            {isLoggedIn && <BlogsPost />}
        </>

    )
}
