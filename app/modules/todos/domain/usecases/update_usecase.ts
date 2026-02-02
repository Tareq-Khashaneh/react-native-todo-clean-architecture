import { Todo } from "../entities/todo";
import { TodoRepository } from "../repositories/todoRepository";

export class UpdateTodo {
  constructor(private todoRepository: TodoRepository) {}

  async execute(todo: Todo): Promise<{ todo: Todo }> {
    const updatedTodo = await this.todoRepository.updateTodo(todo);
    return updatedTodo;
  }
}
