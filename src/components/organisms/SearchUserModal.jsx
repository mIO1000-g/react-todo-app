import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export function SearchUserModal(props) {
    const { isOpen, onClose, setSelectedUserId } = props;
    // const data = [
    //     { id: 111, name: "Leanne Graham" },
    //     { id: 111, name: "Leanne Graham" },
    // ];

    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    
    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [isOpen]);

    const [prevClickRow, setPrevClickRow] = useState(null);

    const onClickRow = (e) => {
        console.log(e.currentTarget);
        const bgColor = "rgb(255, 255, 0)";
        if (prevClickRow) {
            prevClickRow.style.backgroundColor = "#ffffff";
            setId("");
        }
        if (!prevClickRow || prevClickRow.dataset.key !== e.currentTarget.dataset.key) {
            e.currentTarget.style.backgroundColor = bgColor;
            setId(e.currentTarget.dataset.id);
            setPrevClickRow(e.currentTarget);
        }
    };

    const onClickSet = () => {
        setSelectedUserId(id);
        onClose();
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>ユーザ検索</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>ユーザID</Th>
                                        <Th>ユーザ名</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.map((e, i) => {
                                        console.log(e.completed);
                                        return (
                                                <Tr key={i} onClick={onClickRow} data-key={i} data-id={e.id}>
                                                    <Td>{e.id}</Td>
                                                    <Td>{e.name}</Td>
                                                </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={onClickSet}>設定</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}