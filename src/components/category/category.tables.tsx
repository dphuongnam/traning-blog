"use client"

import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import CreateCategoryModal from "./category.create";
import { useState, useEffect } from "react";
import UpdateCategoryModal from "./category.update";
import Link from "next/link";
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    categories: ICategory[];
    blogs: IBlog[];
    setBlogPosts: (value: IBlog[]) => void;
}

const CategoryTable = (props: IProps) => {
    const { categories, blogs, setBlogPosts } = props;

    const [showCategoryCreate, setShowCategoryCreate] = useState<boolean>(false);
    const [showCategoryUpdate, setShowCategoryUpdate] = useState<boolean>(false);
    const [category, setCategory] = useState<ICategory | null>(null);
    const [localStorageCategories, setLocalStorageCategories] = useState<ICategory[]>([]);
    const [localStorageBlogs, setLocalStorageBlogs] = useState<IBlog[]>([]);

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("categoryPosts") || "[]");
        setLocalStorageCategories(localStorageData);

        const localStorageDataPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        setLocalStorageBlogs(localStorageDataPosts);
    }, []);


    const handleClickDelete = (idCate: number) => {

        const checkIdBLogs = localStorageBlogs.map((cate) => (cate.categories.map((category) => (category.idCate))));
        if (checkIdBLogs.some(ids => ids.includes(idCate))) {
            toast.error("Cannot delete this category as it is associated with some blog posts.");
        } else {

            if (confirm(`Do you want to delete this category (id= ${idCate})`)) {
                const updatedLocalStorageData = localStorageCategories.filter(blog => blog.idCate !== idCate);
                localStorage.setItem("categoryPosts", JSON.stringify(updatedLocalStorageData));
                setLocalStorageCategories(updatedLocalStorageData);

                toast.success("The post has been deleted!");
                toast.error("Cannot delete this category as it is associated with some blog posts.");
            }
        }
    }

    const updateTableData = () => {
        const localStorageData = JSON.parse(localStorage.getItem("categoryPosts") || "[]");
        setLocalStorageCategories(localStorageData);
    };

    return (
        <>
            <div className="mt-3 mb-3" style={{ display: "flex", justifyContent: "space-between" }}>
                <h2> Category</h2>
                <Button
                    onClick={() => {
                        setShowCategoryCreate(true);
                    }}>
                    Create Category
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {localStorageCategories.map((item, index) => {
                        return (
                            <tr key={item.idCate}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>
                                    <Link href={`/categories/${item.idCate}`} className="btn btn-primary">
                                        View
                                    </Link>
                                    <Button variant="success" className="mx-3"
                                        onClick={() => {
                                            setCategory(item);
                                            setShowCategoryUpdate(true);
                                        }}>
                                        Update
                                    </Button>
                                    <Button variant="warning" onClick={() => {
                                        handleClickDelete(item.idCate);
                                    }}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <CreateCategoryModal
                showCategoryCreate={showCategoryCreate}
                setShowCategoryCreate={setShowCategoryCreate}
                updateTableData={updateTableData}
                categories={categories}
            />
            <UpdateCategoryModal
                showCategoryUpdate={showCategoryUpdate}
                setShowCategoryUpdate={setShowCategoryUpdate}
                category={category}
                setCategory={setCategory}
                updateTableData={updateTableData}
                blogs={blogs}
                setBlogPosts={setBlogPosts}
            />
        </>
    )
}
export default CategoryTable;

