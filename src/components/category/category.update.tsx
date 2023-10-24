"use client"

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

interface IProps {
    showCategoryUpdate: boolean;
    setShowCategoryUpdate: (value: boolean) => void;
    category: ICategory | null;
    setCategory: (value: ICategory | null) => void;
    updateTableData: () => void;
    blogs: IBlog[];
    setBlogPosts: (value: IBlog[]) => void;
}

function UpdateCategoryModal(props: IProps) {
    const { showCategoryUpdate, setShowCategoryUpdate, category, setCategory, updateTableData, blogs, setBlogPosts } = props;

    const [idCate, setIdCate] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [localStorageBlogs, setLocalStorageBlogs] = useState<IBlog[]>([]);

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        setLocalStorageBlogs(localStorageData);
    }, []);


    useEffect(() => {
        if (category && category.idCate) {
            setIdCate(category.idCate);
            setTitle(category.title);

        }
    }, [category]);
    const updateBlogPosts = (updatedCategory: ICategory) => {
        const updatedBlogPosts = localStorageBlogs.map((blog) => {
            const lastIdCate = blog.categories.map((category) => category.idCate);
            console.log('lasst 12', updatedCategory.idCate);

            if (lastIdCate.includes(updatedCategory.idCate)) {
                return {
                    ...blog,
                    categories: blog.categories.map((category) =>
                        category.idCate === updatedCategory.idCate
                            ? {
                                ...category,
                                title: updatedCategory.title,
                            }
                            : category
                    ),
                };
            }
            return blog;
        });
        console.log(updatedBlogPosts);
        localStorage.setItem("blogPosts", JSON.stringify(updatedBlogPosts));
    };


    const handleSubmit = () => {
        if (!title) {
            toast.error("Please fill in all fields.");
            return;
        }

        // Lấy danh sách bài viết từ local storage
        const existingPosts = JSON.parse(localStorage.getItem("categoryPosts") || "[]");

        // Cập nhật bài viết tương ứng trong danh sách
        const updatedCategory = existingPosts.map((cate: ICategory) => {
            if (cate.idCate === idCate) {
                return {
                    ...cate,
                    title,
                };
            } else {
                return cate;
            }
        });

        // Lưu danh sách đã cập nhật trở lại local storage
        localStorage.setItem("categoryPosts", JSON.stringify(updatedCategory));

        toast.success("The post has been updated!");
        handleCloseModal();
        console.log('nammm', updatedCategory.find((cate: ICategory) => cate.idCate === idCate));
        updateBlogPosts(updatedCategory.find((cate: ICategory) => cate.idCate === idCate));
        // Gọi hàm cập nhật danh sách bài viết
        updateTableData();

    };

    const handleCloseModal = () => {
        setTitle("");
        setCategory(null);
        setShowCategoryUpdate(false);
    };

    return (
        <Modal
            show={showCategoryUpdate}
            onHide={() => handleCloseModal()}
            backdrop="static"
            keyboard={false}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Update Blog Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title"
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseModal()}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateCategoryModal;


