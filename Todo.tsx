import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  GestureResponderEvent,
} from "react-native";

interface ITodo {
  id: string;
  text: string;
  isCompleted: boolean;
  date: number;
}
interface IProps extends ITodo {
  updateTodo: (id: string, text: string) => void;
  removeTodo: (id: string) => void;
  completeTodo: (id: string) => void;
  uncompleteTodo: (id: string) => void;
}

const { width } = Dimensions.get("window");

export default function Todo({
  id,
  text,
  isCompleted,
  updateTodo,
  removeTodo,
  completeTodo,
  uncompleteTodo,
}: IProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [toDoValue, setToDoValue] = useState(text);
  const toggleCompleted = useCallback(
    (event: GestureResponderEvent) => {
      event.stopPropagation();

      if (isCompleted) {
        uncompleteTodo(id);
      } else {
        completeTodo(id);
      }
    },
    [isCompleted]
  );

  const startEditing = useCallback((event: GestureResponderEvent) => {
    event.stopPropagation();
    setIsEditing(true);
  }, []);

  const finishEditing = useCallback(
    (event: GestureResponderEvent) => {
      event.stopPropagation();
      updateTodo(id, toDoValue);
      setIsEditing(false);
    },
    [id, toDoValue]
  );

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <TouchableOpacity onPress={toggleCompleted}>
          <View
            style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.uncompletedCircle,
            ]}
          />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={[
              styles.input,
              styles.text,
              isCompleted ? styles.completedText : styles.uncompletedText,
            ]}
            value={toDoValue}
            multiline={true}
            onChangeText={setToDoValue}
            returnKeyType={"done"}
            autoCorrect={false}
          />
        ) : (
          <Text
            style={[
              styles.text,
              isCompleted ? styles.completedText : styles.uncompletedText,
            ]}
          >
            {text}
          </Text>
        )}
      </View>
      {isEditing ? (
        <View style={styles.actions}>
          <TouchableOpacity onPressOut={finishEditing}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>✅</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actions}>
          <TouchableOpacity onPressOut={startEditing}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>🖍</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPressOut={() => removeTodo(id)}>
            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>❌</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20,
    paddingVertical: 5,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 3,
    marginRight: 20,
    marginVertical: 20,
  },
  completedCircle: {
    borderColor: "#bbb",
  },
  uncompletedCircle: {
    borderColor: "#EE5050",
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  uncompletedText: {
    color: "#353539",
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2,
  },
  actions: {
    flexDirection: "row",
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  actionText: {},
  input: {
    marginVertical: 20,
    width: width / 2,
  },
});
