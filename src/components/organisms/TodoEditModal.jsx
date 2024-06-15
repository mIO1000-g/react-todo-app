import { Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormLabel, FormControl } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getTodosByWhere, postTodo } from "../../api/todos";

export function TodoEditModal(props) {
    const { isOpen, onClose } = props;
    const [form, setForm] = useState({
        id: "",
        userId: "",
        title: "",
    });

    useEffect(() => {
        setForm({
            id: "",
            userId: "",
            title: "",
        });
    }, [isOpen]);

    const handleForm = (e) => {
        console.log(e.target.name);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickConfirm = async () => {
        console.log("onClickConfirm");
        console.log(form);

        await postTodo(form)
            .then(() => {
                
            })
            .catch((error) => {
                console.log(error);
            });

        onClose();
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>TODO編集</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>ID</FormLabel>
                            <Input name="id" onChange={handleForm} value={form.id}></Input>
                            <FormLabel>ユーザID</FormLabel>
                            <Input name="userId" onChange={handleForm} value={form.userId}></Input>
                            <FormLabel>タイトル</FormLabel>
                            <Input name="title" onChange={handleForm} value={form.title}></Input>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="teal" onClick={onClickConfirm}>確定</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}