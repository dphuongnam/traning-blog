'use client'
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import HeaderExample from "@/components/app.header";
import Link from "next/link";


interface IProps {
    blogs: IBlog[];
    categories: ICategory[];

}

const ListCategoryPosts = ({ params }: { params: { id: string } }, props: IProps) => {
    const { blogs, categories } = props;
    const [blogPosts, setBlogPosts] = useState<IBlog[]>([]);
    const [localStorageCategories, setLocalStorageCategories] = useState<ICategory[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    console.log(params.id);

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        setBlogPosts(localStorageData);

        const localStorageDataCate = JSON.parse(localStorage.getItem("categoryPosts") || "[]");
        setLocalStorageCategories(localStorageDataCate);
    }, [blogs, categories]);

    const filteredPosts = blogPosts.filter((blogPost) => (
        blogPost.categories.some((category) => category.idCate === parseInt(params.id))
    ));
    const filteredCategory = localStorageCategories.filter((categories) => (categories.idCate) === parseInt(params.id));

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        console.log('as', pageNumber);
    };


    return (
        <>
            <HeaderExample />
            <div className="container">
                <div className="mt-5 mb-5"><h3>List Post Of Category : {filteredCategory.map((categories) => (categories.title))}</h3></div>
                {currentPosts.map((post) => (
                    <Card key={post.id} className="my-3">
                        <Card.Header as="h5">{post.title}</Card.Header>
                        <Card.Body>
                            <Card.Img className="w-25" src={post.image} />
                            <Card.Text>{post.content}</Card.Text>
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
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div className="pagination d-flex justify-content-center">
                <ul className="pagination">
                    {Array(Math.ceil(filteredPosts.length / itemsPerPage))
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

export default ListCategoryPosts;
