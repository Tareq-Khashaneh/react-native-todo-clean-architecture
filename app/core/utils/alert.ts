import { Alert } from "react-native";

type Button = {
  text: string;
  style?: "default" | "cancel" | "destructive";
  onPress?: () => void | Promise<void>;
};

export function showAlert(
  title: string,
  message: string,
  buttons: Button[] = [{ text: "OK", style: "default" }]
) {
  Alert.alert(
    title,
    message,
    buttons.map(btn => ({
      text: btn.text,
      style: btn.style,
      onPress: btn.onPress,
    }))
  );
}
