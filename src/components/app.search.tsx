'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Link from "next/link";

function SearchResults() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchKey = searchParams.get('q');


    const [searchResults, setSearchResults] = useState<IBlog[]>([]);
    const [localStorageBlogs, setLocalStorageBlogs] = useState<IBlog[]>([]);

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        setLocalStorageBlogs(localStorageData);
    }, []);

    useEffect(() => {


        if (searchKey) {
            const searchPosts = localStorageBlogs.filter((post) =>
                post.title.toLowerCase().includes(searchKey.toLowerCase()) ||
                post.content.toLowerCase().includes(searchKey.toLowerCase()) ||
                post.author.toLowerCase().includes(searchKey.toLowerCase()) ||
                post.categories.some((category) =>
                    category.title.toLowerCase().includes(searchKey.toLowerCase())
                )
            );
            setSearchResults(searchPosts);
        } else {
            setSearchResults([]);
        }
    }, [searchKey, localStorageBlogs]);

    const shortenContent = (content: string, maxLength: number) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + "...";
        }
        return content;
    };

    return (
        <div className="container">
            <h1>Search Results for "{searchKey}"</h1>
            <div className="container">
                {searchResults.map((post) => (
                    <Card key={post.id} className="my-3">
                        <Card.Header as="h5">{post.title}</Card.Header>
                        <Card.Body className="d-flex">
                            <div className="w-25">
                                <Card.Img src={post.image} />
                            </div>
                            <div className="ms-5">
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{shortenContent(post.content, 100)}</Card.Text>
                                <Card.Text><span>Categories: </span>{post.categories.map((cate) => (
                                    <div className="btn category-show ">
                                        <Link className="nav-link" href={`/categories/${cate.idCate}`} key={cate.idCate}>{cate.title} </Link>
                                    </div>))}
                                </Card.Text>
                                <Card.Text>
                                    <span>Author:</span>
                                    <div className="btn category-show ">
                                        <Link href={`/author/${post?.author}`} className="nav-link">{post?.author}</Link>
                                    </div>
                                </Card.Text>
                                <Link href={`/posts/${post.id}`}>
                                    <Button variant="primary">Read More</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
