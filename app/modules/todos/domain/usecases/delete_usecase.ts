import { Todo } from "../entities/todo";
import { TodoRepository } from "../repositories/todoRepository";

export class DeleteTodo {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: number): Promise<{ todo: Todo }> {
    const deletedTodo = await this.todoRepository.deleteTodo(id);
    console.log(deletedTodo.todo.isDeleted);
    // Optional: you can check if deletion succeeded
    if (!deletedTodo.todo.isDeleted) {
      throw new Error("Todo was not deleted");
    }

    return deletedTodo;
  }
}
