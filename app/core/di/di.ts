import { TodoRemoteDataSource } from "@/app/modules/todos/data/datasources/remoteDataSource";
import { TodoRepositoryImpl } from "@/app/modules/todos/data/repositories/todoRepositoryImpl";
import { AddTodo } from "@/app/modules/todos/domain/usecases/add_usecase";
import { DeleteTodo } from "@/app/modules/todos/domain/usecases/delete_usecase";
import { GetTodos } from "@/app/modules/todos/domain/usecases/get_todo_usecase";
import { UpdateTodo } from "@/app/modules/todos/domain/usecases/update_usecase";

// Step 1: Create Remote Data Source
export const todoRemoteDataSource = new TodoRemoteDataSource();

// Step 2: Create Repository Implementation
export const todoRepository = new TodoRepositoryImpl(todoRemoteDataSource);

// Step 3: Create Use Case
export const getTodosUseCase = new GetTodos(todoRepository);
export const deleteTodoUseCase = new DeleteTodo(todoRepository);
export const updateTodoUseCase = new UpdateTodo(todoRepository);
export const addedTodoUseCase = new AddTodo(todoRepository);
