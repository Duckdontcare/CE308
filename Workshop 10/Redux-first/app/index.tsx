import React, { useState } from 'react';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CartScreen from './screens/CartScreen';
import TodoScreen from './screens/TodoScreen';

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<'cart' | 'todo'>('cart');

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <View style={styles.nav}>
          <Button 
            title="Shopping Cart" 
            onPress={() => setCurrentScreen('cart')} 
            color={currentScreen === 'cart' ? '#007bff' : '#888'}
          />
          <Button 
            title="To-Do List" 
            onPress={() => setCurrentScreen('todo')} 
            color={currentScreen === 'todo' ? '#007bff' : '#888'}
          />
        </View>
        <View style={styles.content}>
          {currentScreen === 'cart' ? <CartScreen /> : <TodoScreen />}
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  content: {
    flex: 1,
  },
});
