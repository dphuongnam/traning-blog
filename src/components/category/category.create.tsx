"use client"

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

interface IProps {
    showCategoryCreate: boolean;
    setShowCategoryCreate: (value: boolean) => void;
    updateTableData: () => void;
    categories: ICategory[];
}

function CreateCategoryModal(props: IProps) {
    const { showCategoryCreate, setShowCategoryCreate, updateTableData, categories } = props;

    const [title, setTitle] = useState<string>("");

    const handleSubmit = () => {
        if (!title) {
            toast.error("Please fill in all fields.");
            return;
        }

        // Tạo một id cho bản ghi mới bằng cách sử dụng thời gian hiện tại
        const newCategoryId = new Date().getTime();

        const newCategoryPost = {
            idCate: newCategoryId,
            title,
        };

        // Lấy danh sách danh mục từ local storage
        const existingCategories = JSON.parse(localStorage.getItem("categoryPosts") || "[]");

        // Thêm bản ghi mới vào danh sách
        existingCategories.push(newCategoryPost);

        // Lưu danh sách đã cập nhật trở lại local storage
        localStorage.setItem("categoryPosts", JSON.stringify(existingCategories));

        toast.success("The category has been saved!");
        handleCloseModal();

        // Gọi hàm cập nhật danh sách danh mục
        updateTableData();
    };

    const handleCloseModal = () => {
        setTitle("");
        setShowCategoryCreate(false);
    };

    return (
        <>
            <Modal
                show={showCategoryCreate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
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
        </>
    );
}

export default CreateCategoryModal;

