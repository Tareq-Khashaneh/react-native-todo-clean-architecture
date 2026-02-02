import { Todo } from "../../domain/entities/todo";
import { TodoRepository } from "../../domain/repositories/todoRepository";
import { TodoRemoteDataSource } from "../datasources/remoteDataSource";
import { TodoModel } from "../models/todomodel";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private remoteDataSource: TodoRemoteDataSource) {}
  async addTodo(todoEntity: Todo): Promise<Todo> {
    try {
      const todoModel: TodoModel = { ...todoEntity };
      const addedTodo = await this.remoteDataSource.addTodo(todoModel);
      return addedTodo;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error; // propagate error to UseCase or UI
    }
  }

  async updateTodo(todoEntity: Todo): Promise<{ todo: Todo }> {
    try {
      const todoModel: TodoModel = { ...todoEntity };
      const updatedDto = await this.remoteDataSource.updateTodo(todoModel);
      return updatedDto;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error; // propagate error to UseCase or UI
    }
  }
  async deleteTodo(id: number): Promise<{ todo: Todo }> {
    try {
      const todo = await this.remoteDataSource.deleteTodo(id);
      return todo;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error; // propagate error to UseCase or UI
    }
  }
  async getTodos(): Promise<Todo[]> {
    try {
      const todos = await this.remoteDataSource.getTodos();
      // TodoModel extends Todo, so we can return directly
      return todos;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error; // propagate error to UseCase or UI
    }
  }
}
