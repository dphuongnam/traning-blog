"use client"
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import CreateModal from "./create.modal";
import UpdateModal from "./update.modal";
import Link from "next/link";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
    blogs: IBlog[];
    categories: ICategory[];
}

const AppTable = (props: IProps) => {
    const { blogs, categories } = props;

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [blog, setBlog] = useState<IBlog | null>(null);
    const [localStorageBlogs, setLocalStorageBlogs] = useState<IBlog[]>([]);

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        setLocalStorageBlogs(localStorageData);
    }, []);

    const handleClickDelete = (id: number) => {
        if (confirm(`Do you want to delete this blog (id= ${id})`)) {
            const updatedLocalStorageData = localStorageBlogs.filter((blog) => blog.id !== id);
            localStorage.setItem("blogPosts", JSON.stringify(updatedLocalStorageData));
            setLocalStorageBlogs(updatedLocalStorageData);

            toast.success("The post has been deleted!");
        }
    };

    const updateTableData = () => {
        const localStorageData = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        setLocalStorageBlogs(localStorageData);
    };

    return (
        <>
            <div className="mt-3 mb-3" style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>App Table</h2>
                <Button
                    onClick={() => {
                        setShowModalCreate(true);
                    }}
                >
                    Create Blog
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Image</th> {/* Add this header for the image column */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {localStorageBlogs.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>
                                    {item.categories.map((category, categoryIndex) => (
                                        <div key={categoryIndex}>
                                            <span>{category.title} </span>
                                            <br />
                                        </div>
                                    ))}
                                </td>
                                <td>{item.author}</td>
                                <td>
                                    <img src={item.image} alt={item.title} style={{ maxWidth: "100px" }} />
                                </td>
                                <td>
                                    <Link href={`/posts/${item.id}`} className="btn btn-primary">
                                        View
                                    </Link>
                                    <Button
                                        variant="success"
                                        className="mx-3"
                                        onClick={() => {
                                            setBlog(item);
                                            setShowModalUpdate(true);
                                        }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="warning"
                                        onClick={() => {
                                            handleClickDelete(item.id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <CreateModal
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
                updateTableData={updateTableData}
                categories={categories}
            />
            <UpdateModal
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                blog={blog}
                setBlog={setBlog}
                updateTableData={updateTableData}
                categories={categories}
            />
        </>
    );
};

export default AppTable;


