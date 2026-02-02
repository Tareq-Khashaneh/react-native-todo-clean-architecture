import useTheme from "@/app/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, FlatList, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import TodoInput from "../components/todoInput";
import TodoItem from "../components/todoItem";
import { useTodos } from "../hooks/useTodos";

export default function TodoScreen() {
  const { todos, loading, setTodos } = useTodos();
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  // ✅ 1. Handle loading BEFORE JSX
  if (loading) {
    return (
      <View style={homeStyles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ✅ 2. Return JSX
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <View style={homeStyles.container}>
          <Header todos={todos} />
          <TodoInput setTodos={setTodos} />
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id!.toString()}
            renderItem={({ item }) => (
              <TodoItem todo={item} setTodos={setTodos} />
            )}
            contentContainerStyle={homeStyles.todoListContent}
            style={homeStyles.todoList}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
