import { Todo } from "../../domain/entities/todo";

export interface TodoModel extends Todo {
 
}export function fromDto(dto: any): TodoModel {
  return {
    id: dto.id,
    todo: dto.todo,
    completed: dto.completed,
    userId: dto.userId,
    isDeleted: dto.isDeleted,
    deletedOn: dto.deletedOn
  };
}