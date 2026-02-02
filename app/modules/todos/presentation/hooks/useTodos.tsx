// shared/hooks/useTodos.ts
import { getTodosUseCase } from "@/app/core/di/di";
import { useCallback, useEffect, useState } from "react";
import { Todo } from "../../domain/entities/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTodosUseCase.execute();
      setTodos(data);
    } catch (error) {
      console.log("Error fetching todos", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, setTodos };
}
