import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

import { MenuLinks } from "../components/pages/MenuLinks"
import { TodoList } from "../components/pages/TodoList";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<MenuLinks />}/>
            <Route path="/todo_list" element={<TodoList />}/>
        </>
    ),
    {
        basename: "/my_todo"
    }
);