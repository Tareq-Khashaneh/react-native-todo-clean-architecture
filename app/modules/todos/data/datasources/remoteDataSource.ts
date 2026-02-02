import { apiClient } from "@/app/core/api/apiClient";
import { Todo } from "../../domain/entities/todo";
import { fromDto, TodoModel } from "../models/todomodel";

export class TodoRemoteDataSource {
  async getTodos(): Promise<TodoModel[]> {
    const res = await apiClient.get<{ todos: any[] }>("/todos");
    const todos: TodoModel[] = res.data.todos.map(fromDto);
    return todos;
  }
  async deleteTodo(id: number): Promise<{ todo: TodoModel }> {
    const res = await apiClient.delete<Todo>(`/todos/${id}`);
    const todo: TodoModel = fromDto(res.data);
    return { todo };
  }
  async updateTodo(todoParm: TodoModel): Promise<{ todo: TodoModel }> {
    const res = await apiClient.put<Todo>(`/todos/${todoParm.id}`, {
      todo: todoParm.todo, // updated text
      completed: todoParm.completed, // updated completed status
      userId: todoParm.userId, // if needed
    });
    const todo: TodoModel = fromDto(res.data);
    return { todo };
  }
  async addTodo(todoParm: TodoModel): Promise<TodoModel> {
    const res = await apiClient.post<Todo>(`/todos/add`, {
      todo: todoParm.todo, // updated text
      completed: todoParm.completed, // updated completed status
      userId: todoParm.userId, // if needed
    });
    const todo: TodoModel = fromDto(res.data);
    return todo;
  }
}
