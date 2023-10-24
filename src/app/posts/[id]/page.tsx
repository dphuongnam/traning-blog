'use client'
import HeaderExample from "@/components/app.header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useSWR, { Fetcher } from 'swr';


interface IProps {
    blogs: IBlog[];
}

const ViewDetailPost = ({ params }: { params: { id: string } }, props: IProps) => {

    const { blogs } = props;
    const [blogPosts, setBlogPosts] = useState<IBlog[]>([]);

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        setBlogPosts(localStorageData);
    }, [blogs]);

    const filteredPosts = blogPosts.filter((blogPost) => (
        blogPost.id === parseInt(params.id))
    );

    const router = useRouter();

    return (
        <>
            <HeaderExample />
            <div>
                <button type="button" onClick={() => router.back()}>
                    Click here to go back
                </button>
                {filteredPosts.map((item) => {
                    return (
                        <Card className="text-center m-5">
                            <Card.Header as={'h2'}>{item?.title}</Card.Header>
                            <Card.Body>
                                <Card.Img className="w-75 mb-5" src={item?.image} />
                                <Card.Title>{item?.title}</Card.Title>
                                <Card.Text><span>Categories: </span>{item.categories.map((cate) => (
                                    <div className="btn category-show ">
                                        <Link className="nav-link" href={`/categories/${cate.idCate}`} key={cate.idCate}>{cate.title} </Link>
                                    </div>))}
                                </Card.Text>
                                <Card.Text>
                                    {item?.content}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted d-flex justify-content-flex-end" >
                                <span>Author:</span><Link href={`/author/${item?.author}`} className="nav-link ms-5">{item?.author}</Link>
                            </Card.Footer>
                        </Card>
                    )
                })

                }

            </div>
        </>

    )
}
export default ViewDetailPost;