"use client"

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import Select from 'react-select';

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
    updateTableData: () => void;
    categories: ICategory[];
}

function CreateModal(props: IProps) {
    const { showModalCreate, setShowModalCreate, updateTableData, categories } = props;
    console.log(">>>check data blogs: ", categories);
    const [localStorageCategories, setLocalStorageCategories] = useState<ICategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);

    const [id, setId] = useState<number>(() => {
        const existingPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        return existingPosts.length + 1;
    });
    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("categoryPosts") || "[]");
        setLocalStorageCategories(localStorageData);
    }, []);

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(() => {
        const storedImageURL = localStorage.getItem("blogPostImageURL");
        return storedImageURL || null;
    });

    const handleSubmit = () => {
        if (!title || !author || !content || !imageURL) {
            toast.error("Please fill in all fields and select at least one category and an image.");
            return;
        }
        const newPostId = new Date().getTime();

        const newBlogPost = {
            id: newPostId,
            title,
            author,
            content,
            categories: selectedCategories,
            image: imageURL,
        };

        const existingPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        existingPosts.push(newBlogPost);
        localStorage.setItem("blogPosts", JSON.stringify(existingPosts));

        toast.success("The post has been saved!");
        handleCloseModal();

        updateTableData();
    };

    const handleCategoryChange = (categoryId: number, categoryTitle: string) => {
        setSelectedCategories((prevSelectedCategories) => {
            const categoryIndex = prevSelectedCategories.findIndex((category) => category.idCate === categoryId);

            if (categoryIndex !== -1) {
                const updatedCategories = [...prevSelectedCategories];
                updatedCategories.splice(categoryIndex, 1);
                return updatedCategories;
            } else {
                return [...prevSelectedCategories, { idCate: categoryId, title: categoryTitle }];
            }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0] || null;

        if (selectedImage) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                setImageURL(imageUrl);

                // Lưu đường dẫn của ảnh vào Local Storage
                localStorage.setItem("blogPostImageURL", imageUrl);
            };

            reader.readAsDataURL(selectedImage);
        } else {
            setImageURL(null);
            localStorage.removeItem("blogPostImageURL");
        }
    };


    const handleCloseModal = () => {
        setTitle("");
        setAuthor("");
        setContent("");
        setImage(null); // Clear the selected image
        setSelectedCategories([]); // Clear selected categories
        setShowModalCreate(false);
    };

    return (
        <>
            <Modal
                show={showModalCreate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Blog Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Categories</Form.Label>
                            <Select
                                isMulti
                                options={localStorageCategories.map((category) => ({
                                    value: category.idCate,
                                    label: category.title,
                                }))}
                                value={selectedCategories.map((selectedCategory) => ({
                                    value: selectedCategory.idCate,
                                    label: selectedCategory.title,
                                }))}
                                onChange={(selectedOptions) => {
                                    setSelectedCategories(
                                        selectedOptions.map((option) => ({
                                            idCate: option.value,
                                            title: option.label,
                                        }))
                                    );
                                }}
                            />
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
        </>
    );
}

export default CreateModal;

