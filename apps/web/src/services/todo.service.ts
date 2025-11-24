import { ITodo } from "@/types";
import axios from "axios";

export async function readTodos(): Promise<ITodo[]> {
    const apiResponse = await axios.get<ITodo[]>("/todos")
    return apiResponse.data
}

export async function readTodoById(id: string): Promise<ITodo> {
    const apiResponse = await axios.get<ITodo>(`/todos/${id}`)
    return apiResponse.data
}

export async function createTodo(todo: Partial<ITodo>): Promise<ITodo> {
    const apiResponse = await axios.post<ITodo>("/todos", todo)
    return apiResponse.data
}

export async function updateTodo(id: string, todo: Partial<ITodo>): Promise<ITodo> {
    const apiResponse = await axios.put<ITodo>(`/todos/${id}`, todo)
    return apiResponse.data
}

export async function deleteTodo(id: string): Promise<void> {
    await axios.delete(`/todos/${id}`)
}

