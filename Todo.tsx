import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Todo() {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleCompleted = useCallback(
    () => setIsCompleted((isCompleted) => !isCompleted),
    []
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCompleted}>
        <View
          style={[
            styles.circle,
            isCompleted ? styles.completedCircle : styles.uncompletedCircle,
          ]}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Hello world To Do</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 3,
    marginRight: 20,
    marginVertical: 17,
  },
  completedCircle: {
    borderColor: "#bbb",
  },
  uncompletedCircle: {
    borderColor: "#F23657",
  },
});
