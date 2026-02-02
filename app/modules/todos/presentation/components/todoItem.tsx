import { deleteTodoUseCase, updateTodoUseCase } from "@/app/core/di/di";
import { showAlert } from "@/app/core/utils/alert";
import useTheme from "@/app/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Todo } from "../../domain/entities/todo";

interface Props {
  todo: Todo;

  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoItem({ todo, setTodos }: Props) {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const isEditing = editingId === todo.id;
  const handleToggleTodo = async () => {
    try {
      await toggleTodo();
    } catch (error) {
      console.log("Error toggling todo", error);
      Alert.alert("Error", "Failed to toggle todo");
    }
  };
  const toggleTodo = async () => {
    try {
      const updatedTodo: Todo = {
        ...todo,
        completed: !todo.completed,
      };
      const savedTodo = await updateTodoUseCase.execute(updatedTodo);
      setTodos((prev) =>
        prev.map((t) => (t.id === savedTodo.todo.id ? savedTodo.todo : t)),
      );
    } catch (e) {
      showAlert("Error", "Failed to update todo");
    }
  };
  const handleDeleteTodo = (id: number) => {
    showAlert("Delete Todo", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const deletedTodo = await deleteTodoUseCase.execute(id);

            // Update the todos state

            setTodos((prev) => prev.filter((t) => t.id !== id));
          } catch (error) {
            console.log("Error deleting todo", error);
            Alert.alert("Error", "Failed to delete todo");
          }
        },
      },
    ]);
  };
  const handleSaveEdit = async () => {
    if (!editText.trim()) return;

    try {
      const updatedTodo: Todo = {
        ...todo,
        todo: editText.trim(),
      };

      const savedTodo = await updateTodoUseCase.execute(updatedTodo);

      setTodos((prev) =>
        prev.map((t) => (t.id === savedTodo.todo.id ? savedTodo.todo : t)),
      );

      setEditText("");
      setEditingId(null);
    } catch (error) {
      console.log("Error updating todo", error);
      showAlert("Error", "Failed to update todo");
    }
  };
  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.todo);
    setEditingId(todo.id);
  };
  const handleCancelEdit = () => {
    setEditText("");
    setEditingId(null);
  };
  return (
    <View style={homeStyles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={homeStyles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={homeStyles.checkbox}
          activeOpacity={0.7}
          onPress={() => handleToggleTodo()}
        >
          <LinearGradient
            colors={
              todo.completed ? colors.gradients.success : colors.gradients.muted
            }
            style={[
              homeStyles.checkboxInner,
              { borderColor: todo.completed ? "transparent" : colors.border },
            ]}
          >
            {todo.completed && (
              <Ionicons name="checkmark" size={18} color="#fff" />
            )}
          </LinearGradient>
        </TouchableOpacity>

        {isEditing ? (
          <View style={homeStyles.editContainer}>
            <TextInput
              style={homeStyles.editInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus
              multiline
              placeholder="Edit your todo..."
              placeholderTextColor={colors.textMuted}
            />
            <View style={homeStyles.editButtons}>
              <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.success}
                  style={homeStyles.editButton}
                >
                  <Ionicons name="checkmark" size={16} color="#fff" />
                  <Text style={homeStyles.editButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.muted}
                  style={homeStyles.editButton}
                >
                  <Ionicons name="close" size={16} color="#fff" />
                  <Text style={homeStyles.editButtonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={homeStyles.todoTextContainer}>
            <Text
              style={[
                homeStyles.todoText,

                todo.completed && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
              numberOfLines={2} // أقصى عدد سطرين
              ellipsizeMode="tail"
            >
              {todo.todo}
            </Text>

            <View style={homeStyles.todoActions}>
              <TouchableOpacity
                onPress={() => handleEditTodo(todo)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteTodo(todo.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}
