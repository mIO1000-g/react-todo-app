import { Checkbox, Input, InputGroup, InputRightElement, Switch, TableContainer, Table, Thead, Tbody, Tr, Td, Th } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

export function TodoList() {

    const data = [
        { id: 1, userId: 100, title: "aaaaaa", completed: true },
        { id: 2, userId: 200, title: "aaaaaa", completed: true },
        { id: 3, userId: 300, title: "aaaaaa", completed: false },
        { id: 4, userId: 400, title: "aaaaaa", completed: false },
        { id: 5, userId: 500, title: "aaaaaa", completed: false },
        { id: 6, userId: 600, title: "aaaaaa", completed: true },
        { id: 7, userId: 700, title: "aaaaaa", completed: true },
    ];

    return (
        <>
            <div>

            </div>
            <div>
                <InputGroup w={200}>
                    <Input placeholder="ユーザID"></Input>
                    <InputRightElement children={<SearchIcon />} />
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
                                <Th>ステータス</Th>
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
                                        <Td><ToggleStatus isCompleted={e.completed}/></Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

function ToggleStatus(props) {
    const { isCompleted } = props;
    const handleStatus = (e) => {
        e.target.checked = !e.target.checked;
    };
    return (
        <Switch size='lg' defaultChecked={isCompleted} onChange={handleStatus}/>
    );
}
