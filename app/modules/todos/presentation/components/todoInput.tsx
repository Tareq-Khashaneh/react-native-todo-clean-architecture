import { addedTodoUseCase } from "@/app/core/di/di";
import useTheme from "@/app/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import { Todo } from "../../domain/entities/todo";

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoInput = ({ setTodos }: Props) => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      // 1️⃣ Create entity (without id – server will generate it)
      const todoToAdd: Todo = {
        todo: newTodo.trim(),
        completed: false,
        userId: 5,
      };

      // 2️⃣ Call use case
      const savedTodo = await addedTodoUseCase.execute(todoToAdd);

      // 3️⃣ Update UI locally (append)
      setTodos((prev) => [savedTodo, ...prev]);

      // 4️⃣ Reset input
      setNewTodo("");
    } catch (error) {
      console.log("Error adding todo", error);
      Alert.alert("Error", "Failed to add todo");
    }
  };

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={homeStyles.input}
          placeholder="What needs to be done?"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={colors.textMuted}
        />

        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <LinearGradient
            colors={
              newTodo.trim() ? colors.gradients.primary : colors.gradients.muted
            }
            style={[
              homeStyles.addButton,
              !newTodo.trim() && homeStyles.addButtonDisabled,
            ]}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
