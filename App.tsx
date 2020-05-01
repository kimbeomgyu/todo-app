import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
  AsyncStorage,
} from "react-native";
import Todo from "./Todo";
import { AppLoading } from "expo";
import uuid from "uuid-random";
const { width } = Dimensions.get("window");

interface ITodo {
  id: string;
  text: string;
  isCompleted: boolean;
  date: number;
}

interface ITodos {
  [ID: string]: ITodo;
}

export default function App() {
  const [newTodo, setNewTodo] = useState("");
  const [loadedTodos, setLoadedTodos] = useState(false);
  const [todos, setTodos] = useState({} as ITodos);

  const addTodo = useCallback(() => {
    if (newTodo !== "") {
      const ID = uuid();
      const todo = {
        [ID]: {
          id: ID,
          text: newTodo,
          isCompleted: false,
          date: Date.now(),
        },
      };
      setTodos((todos) => {
        const newTodos = { ...todos, ...todo };
        saveTodos(newTodos);
        return newTodos;
      });
      setNewTodo("");
    }
  }, [newTodo]);

  const removeTodo = useCallback((id) => {
    setTodos((todos) => {
      const newTodos = { ...todos };
      delete newTodos[id];
      saveTodos(newTodos);
      return newTodos;
    });
  }, []);

  const uncompleteTodo = useCallback((id) => {
    setTodos((todos) => {
      const newTodos = {
        ...todos,
        [id]: {
          ...todos[id],
          isCompleted: false,
        },
      };
      saveTodos(newTodos);
      return newTodos;
    });
  }, []);

  const completeTodo = useCallback((id) => {
    setTodos((todos) => {
      const newTodos = {
        ...todos,
        [id]: {
          ...todos[id],
          isCompleted: true,
        },
      };
      saveTodos(newTodos);
      return newTodos;
    });
  }, []);

  const updateTodo = useCallback((id, text) => {
    setTodos((todos) => {
      const newTodos = {
        ...todos,
        [id]: {
          ...todos[id],
          text: text,
        },
      };
      saveTodos(newTodos);
      return newTodos;
    });
  }, []);

  const loadTodos = useCallback(async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      if (typeof todos === "string") {
        setTodos(JSON.parse(todos));
        // console.log(todos); // 로딩
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadTodos().then(() => {
      setLoadedTodos(true);
    });
  }, []);

  if (!loadedTodos) {
    <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Kawai To do</Text>
      <View style={styles.card}>
        <TextInput
          value={newTodo}
          onChangeText={setNewTodo}
          style={styles.input}
          placeholder={"New To Do"}
          returnKeyType={"done"}
          autoCorrect={false}
          onSubmitEditing={addTodo}
        />
        <ScrollView contentContainerStyle={styles.todos}>
          {Object.values(todos).map((todo) => (
            <Todo
              key={todo.id}
              {...todo}
              removeTodo={removeTodo}
              uncompleteTodo={uncompleteTodo}
              completeTodo={completeTodo}
              updateTodo={updateTodo}
            />
          ))}
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

function saveTodos(newTodos: ITodos) {
  // console.log(JSON.stringify(newTodos)); // 저장
  AsyncStorage.setItem("todos", JSON.stringify(newTodos));
}
