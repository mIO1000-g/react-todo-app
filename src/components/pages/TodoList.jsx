import { SearchIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Input, InputGroup, InputRightElement, Switch, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchUserModal } from "../organisms/SearchUserModal";
import { TodoEditModal } from "../organisms/TodoEditModal";
import { getAllTodos, getTodosByWhere } from "../../api/todos";

/**
 * TODOリストコンポーネント
 * @returns JSX
 */
export function TodoList() {

    // フォーム
    const [form, setForm] = useState({
        userId: "",
        isNotCompleted: false,
        isCompleted: false,
    });
    const handleForm = (e) => {
        console.log(e.target.name);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // 明細データ
    const [data, setData] = useState([]);

    // 初期表示
    useEffect(() => {
        (async () => {
            await getAllTodos()
                .then((result) => {
                    console.log("getAllTodos");
                    console.log(result);
                    setData(result.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        })();
    }, []);

    // 検索ボタン押下
    const [isLoadingSeach, setIsLoadingSearch] = useState(false);
    const onClickSearch = async () => {
        console.log("onClickSearch");
        console.log("useId=" + form.userId);
        console.log("isNotCompleted=" + form.isNotCompleted);
        console.log("isCompleted=" + form.isNotCompleted);
        setIsLoadingSearch(true);
        await getTodosByWhere(form.userId, form.isNotCompleted, form.isCompleted)
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoadingSearch(false);
            });
    };

    // ユーザ検索補助モーダル
    const modal1 = useDisclosure();
    // TODO編集モーダル
    const modal2 = useDisclosure();

    // モーダル受け渡し用ユーザID設定関数
    const setUserId = (userId) => {
        console.log(userId);
        setForm({
            ...form,
            userId: userId
        });
    };

    // TODO編集モーダル　閉じるボタン押下時
    const onCloseModal2 = async () => {
        console.log("onCloseModal2");
        modal2.onClose();
        await getTodosByWhere(form.userId, form.isNotCompleted, form.isCompleted)
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoadingSearch(false);
            });
    };

    return (
        <>
            <div>

            </div>
            <div>
                <InputGroup w={200}>
                    <Input placeholder="ユーザID" name="userId" onChange={handleForm} value={form.userId}></Input>
                    <InputRightElement children={<SearchIcon />} onClick={modal1.onOpen} />
                </InputGroup>
                <Checkbox name="isNotCompleted" onChange={handleForm} checked={form.isNotCompleted} defaultChecked>未完了</Checkbox>
                <Checkbox name="isCompleted" onChange={handleForm} checked={form.isCompleted}>完了</Checkbox>
                <Button colorScheme="teal" isLoading={isLoadingSeach} onClick={onClickSearch}>検索</Button>
                <Button colorScheme="teal" isLoading={false} onClick={modal2.onOpen}>登録</Button>
            </div>
            <div>
                <TableContainer>
                    <Table variant="simple">
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
                                //console.log(e.completed);
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
            <SearchUserModal isOpen={modal1.isOpen} onClose={modal1.onClose} setSelectedUserId={setUserId}></SearchUserModal>
            <TodoEditModal isOpen={modal2.isOpen} onClose={onCloseModal2}></TodoEditModal>
        </>
    );
}

// ステータストグル
function ToggleStatus(props) {
    const { isCompleted } = props;
    const handleStatus = (e) => {
        e.target.checked = !e.target.checked;
    };
    return (
        <Switch size='lg' defaultChecked={isCompleted} onChange={handleStatus} />
    );
}
