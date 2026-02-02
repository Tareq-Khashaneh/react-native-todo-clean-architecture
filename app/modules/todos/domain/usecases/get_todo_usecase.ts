import { Todo } from '../entities/todo';
import { TodoRepository } from '../repositories/todoRepository';


export class GetTodos {
  constructor(private todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.getTodos();
  }
}
