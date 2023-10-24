
"use client"

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


function HeaderExample() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const [localStorageBlogs, setLocalStorageBlogs] = useState<IBlog[]>([]);

    useEffect(() => {
        setIsLoggedIn(Cookies.get('isLoggedIn') === 'true');

        const localStorageData = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        setLocalStorageBlogs(localStorageData);
    }, []);

    const handleLogout = () => {
        Cookies.remove('isLoggedIn');
        setIsLoggedIn(false);
        router.push('/login');
    };

    console.log('search: ', localStorageBlogs);
    const handleSearch = () => {

        const searchPosts = localStorageBlogs.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.categories.some((category) =>
                category.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        console.log("Filtered Posts:", searchPosts);

    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <Link href={"/"} className='navbar-brand'>React-Bootstrap</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto w-100" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link href="/posts" className='nav-link'>List Post</Link>

                        <div className='search-box'>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button onClick={() => router.push(`/search?q=${searchQuery}`)}>Search</button>
                        </div>
                        {isLoggedIn ? (
                            <div className='admin-panel d-flex'>
                                <Link href="/admin" className='nav-link'>Admin</Link>
                                <Link href={'/'} className='nav-link' onClick={handleLogout}>Logout</Link>
                            </div>
                        ) : (
                            <div className='admin-panel'>
                                <Link href="/login" className='nav-link'>Login</Link>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderExample;
