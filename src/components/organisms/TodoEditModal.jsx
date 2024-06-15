import { Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormLabel, FormControl } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { postTodo } from "../../api/todos";

/**
 * TODO編集モーダル
 * @param {*} props 
 * @returns JSX
 */
export function TodoEditModal(props) {
    const { isOpen, onClose } = props;

    // フォーム
    const [form, setForm] = useState({
        id: "",
        userId: "",
        title: "",
    });
    const handleForm = (e) => {
        console.log(e.target.name);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // 初期表示時
    useEffect(() => {
        setForm({
            id: "",
            userId: "",
            title: "",
        });
    }, [isOpen]);

    // 確定ボタン押下時
    const onClickConfirm = async () => {
        console.log("onClickConfirm");
        console.log(form);

        await postTodo(form)
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