import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addTodo, toggleTodo, removeTodo, Todo } from '../redux/todoSlice';

const TodoScreen = () => {
  const [text, setText] = useState('');
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text) {
      const newTodo: Todo = {
        id: Math.random().toString(),
        text,
        completed: false,
      };
      dispatch(addTodo(newTodo));
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workshop 10.2: To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="เพิ่มงาน..."
        value={text}
        onChangeText={setText}
      />
      <Button title="เพิ่มงาน" onPress={handleAddTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))} style={styles.todoTextContainer}>
              <Text style={[styles.todoText, item.completed && styles.completed]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(removeTodo(item.id))} style={styles.deleteButton}>
              <Text style={{ color: 'white' }}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 3,
  },
});

export default TodoScreen;
