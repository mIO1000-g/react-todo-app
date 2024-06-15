import axios from "axios";

export async function getAllTodos() {
    return await axios.get("https://jsonplaceholder.typicode.com/todos");
}

export async function getTodosByWhere(userId, isNotCompleted, isCompleted) {
    // TODO:検索条件指定
    return await axios.get("https://jsonplaceholder.typicode.com/todos");
}

export async function postTodo(todo) {
    return axios
    .post("https://jsonplaceholder.typicode.com/todos",
        {
            id: todo.id,
            userId: todo.userId,
            title: todo.title,
        }
    );
}