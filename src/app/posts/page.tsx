'use client'
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import HeaderExample from "@/components/app.header";
import Link from "next/link";

interface IProps {
    blogs: IBlog[];
}

const ListPosts = (props: IProps) => {
    const { blogs } = props;
    const [blogPosts, setBlogPosts] = useState<IBlog[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        setBlogPosts(localStorageData);
    }, []);

    // Calculate the index range for the current page
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Function to handle page change
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        console.log('as', pageNumber);

    };

    const shortenContent = (content: string, maxLength: number) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + "...";
        }
        return content;
    };

    return (
        <>
            <HeaderExample />
            <div className="container">
                {currentPosts.map((post) => (
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
            <div className="pagination d-flex justify-content-center">
                <ul className="pagination">
                    {Array(Math.ceil(blogPosts.length / itemsPerPage))
                        .fill(null)
                        .map((_, index) => (
                            <li key={index} className={`page-item ${index + 1 === currentPage ? "active" : ""}`}>
                                <button onClick={() => paginate(index + 1)} className="page-link">
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    );
};

export default ListPosts;
