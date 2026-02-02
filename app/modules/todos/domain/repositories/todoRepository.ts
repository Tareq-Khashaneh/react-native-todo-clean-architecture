import { Todo } from "../entities/todo";

export interface TodoRepository {
  addTodo(todo: Todo): Promise<Todo>;
  getTodos(): Promise<Todo[]>;
  deleteTodo(id: number): Promise<{ todo: Todo }>;
  updateTodo(todo: Todo): Promise<{ todo: Todo }>;
}
