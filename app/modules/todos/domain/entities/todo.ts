export interface Todo {
  id?: number;
  todo: string;
  completed: boolean;
  userId: number;
  isDeleted?: boolean; // only for delete
  deletedOn?: string;
}
