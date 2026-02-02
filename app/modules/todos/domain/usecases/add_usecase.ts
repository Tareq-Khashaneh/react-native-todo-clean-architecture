import { Todo } from "../entities/todo";
import { TodoRepository } from "../repositories/todoRepository";

export class AddTodo {
  constructor(private todoRepository: TodoRepository) {}

  async execute(todo: Todo): Promise<Todo> {
    return await this.todoRepository.addTodo(todo);
  }
}
