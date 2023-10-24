"use client"

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import Select from 'react-select';

interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    blog: IBlog | null;
    setBlog: (value: IBlog | null) => void;
    updateTableData: () => void;
    categories: ICategory[];
}

function UpdateModal(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, blog, setBlog, updateTableData, categories } = props;

    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);

    const [localStorageCategories, setLocalStorageCategories] = useState<ICategory[]>([]);

    const [image, setImage] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);


    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("categoryPosts") || "[]");
        setLocalStorageCategories(localStorageData);
    }, []);

    useEffect(() => {
        if (blog && blog.id) {
            setId(blog.id);
            setTitle(blog.title);
            setAuthor(blog.author);
            setContent(blog.content);
            setImageURL(blog.image || null);
            setSelectedCategories(blog.categories || []);
        }

    }, [blog]);

    const handleSubmit = () => {
        if (!title || !author || !content) {
            toast.error("Please fill in all fields.");
            return;
        }

        const existingPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");

        const updatedPosts = existingPosts.map((post: IBlog) => {
            if (post.id === id) {
                return {
                    ...post,
                    title,
                    author,
                    content,
                    categories: selectedCategories,
                    image: imageURL, // Update the image URL
                };
            } else {
                return post;
            }
        });

        localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));

        toast.success("The post has been updated!");
        handleCloseModal();
        updateTableData();
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0] || null;

        if (selectedImage) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                setImageURL(imageUrl);
            };

            reader.readAsDataURL(selectedImage);
        } else {
            setImageURL(null);
        }

        setImage(selectedImage); // Update the image state
    };

    const handleCloseModal = () => {
        setTitle("");
        setAuthor("");
        setContent("");
        setBlog(null);
        setShowModalUpdate(false);
    };

    return (
        <Modal
            show={showModalUpdate}
            onHide={() => handleCloseModal()}
            backdrop="static"
            keyboard={false}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Update Blog Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title"
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="Author"
                            value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            value={content} onChange={(e) => setContent(e.target.value)} />
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
    );
}

export default UpdateModal;


