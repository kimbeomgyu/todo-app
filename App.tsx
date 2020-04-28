import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import Todo from "./Todo";

const { width } = Dimensions.get("window");

export default function App() {
  const [newTodo, setNewTodo] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Kwai To do</Text>
      <View style={styles.card}>
        <TextInput
          value={newTodo}
          onChangeText={setNewTodo}
          style={styles.input}
          placeholder={"New To Do"}
          returnKeyType={"done"}
          autoCorrect={false}
        />
        <ScrollView contentContainerStyle={styles.todos}>
          <Todo />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f23657",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(0,0,0)",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: { height: -1, width: 0 },
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,
  },
  todos: { alignItems: "center" },
});
