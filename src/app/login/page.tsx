'use client'

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import LoginSection from '@/components/app.login';


const LoginPage = () => {

    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userLoggedIn = Cookies.get('isLoggedIn');
        if (userLoggedIn) {
            setIsLoggedIn(true);
            router.push('/');
        }
    }, []);

    return (
        <>
            {!isLoggedIn && <LoginSection />}
        </>
    );
};

export default LoginPage;
