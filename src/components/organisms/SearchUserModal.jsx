import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * ユーザ検索補助モーダル
 * @param {*} props 
 * @returns JSX
 */
export function SearchUserModal(props) {
    const { isOpen, onClose, setSelectedUserId } = props;

    // 明細データ
    const [data, setData] = useState([]);
    // 選択したユーザID
    const [id, setId] = useState("");
    
    // 初期表示時
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

    // 前回選択した行情報
    const [prevClickRow, setPrevClickRow] = useState(null);

    // 行クリック時
    const onClickRow = (e) => {
        console.log(e.currentTarget);
        const bgColor = "rgb(255, 255, 0)";
        if (prevClickRow) {
            // 前回選択した行のスタイルをリセット
            prevClickRow.style.backgroundColor = "#ffffff";
            setId("");
        }
        if (!prevClickRow || prevClickRow.dataset.key !== e.currentTarget.dataset.key) {
            // 前回選択した行がない または 前回選択した行と異なる場合、ハイライト
            e.currentTarget.style.backgroundColor = bgColor;
            setId(e.currentTarget.dataset.id);
            setPrevClickRow(e.currentTarget);
        }
    };

    // 設定ボタン押下時
    const onClickSet = () => {
        // 親画面にユーザIDを返す
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
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="teal" onClick={onClickSet}>設定</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}