import { SearchIcon } from "@chakra-ui/icons";
import { Checkbox, Input, InputGroup, InputRightElement, Modal, Switch, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SearchUserModal } from "../organisms/SearchUserModal";

export function TodoList() {

    // const data = [
    //     { id: 1, userId: 100, title: "aaaaaa", completed: true },
    //     { id: 2, userId: 200, title: "aaaaaa", completed: true },
    //     { id: 3, userId: 300, title: "aaaaaa", completed: false },
    //     { id: 4, userId: 400, title: "aaaaaa", completed: false },
    //     { id: 5, userId: 500, title: "aaaaaa", completed: false },
    //     { id: 6, userId: 600, title: "aaaaaa", completed: true },
    //     { id: 7, userId: 700, title: "aaaaaa", completed: true },
    // ];
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedUserId, setSelectedUserId] = useState("");

    return (
        <>
            <div>

            </div>
            <div>
                <InputGroup w={200}>
                    <Input placeholder="ユーザID" value={selectedUserId}></Input>
                    <InputRightElement children={<SearchIcon />} onClick={onOpen} />
                </InputGroup>
                <Checkbox defaultChecked>未完了</Checkbox>
                <Checkbox >完了</Checkbox>
            </div>
            <div>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>ユーザID</Th>
                                <Th>タイトル</Th>
                                <Th>完了</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((e, i) => {
                                console.log(e.completed);
                                return (
                                    <Tr key={i}>
                                        <Td>{e.id}</Td>
                                        <Td>{e.userId}</Td>
                                        <Td>{e.title}</Td>
                                        <Td><ToggleStatus isCompleted={e.completed} /></Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
            <SearchUserModal isOpen={isOpen} onClose={onClose} setSelectedUserId={setSelectedUserId}></SearchUserModal>
        </>
    );
}

function ToggleStatus(props) {
    const { isCompleted } = props;
    const handleStatus = (e) => {
        e.target.checked = !e.target.checked;
    };
    return (
        <Switch size='lg' defaultChecked={isCompleted} onChange={handleStatus} />
    );
}
