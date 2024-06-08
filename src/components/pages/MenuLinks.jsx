import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, UnorderedList, ListItem, Container } from '@chakra-ui/react'

export function MenuLinks() {
    return (
        <>
            <Container>
                <UnorderedList>
                    <ListItem color='teal.500'>
                        <ChakraLink as={ReactRouterLink} color='teal.500' to="/todo_list">
                            TODO一覧
                        </ChakraLink>
                    </ListItem>
                    <ListItem color='teal.500'>
                        <ChakraLink  color='teal.500'>
                            ユーザ一覧
                        </ChakraLink>
                    </ListItem>
                </UnorderedList>
            </Container>

        </>
    );
}