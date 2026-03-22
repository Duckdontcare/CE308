import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addItem, removeItem, clearCart, CartItem } from '../redux/cartSlice';

const CartScreen = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const handleAddItem = () => {
    if (name && quantity && price) {
      const newItem: CartItem = {
        id: Math.random().toString(),
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      };
      dispatch(addItem(newItem));
      setName('');
      setQuantity('');
      setPrice('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workshop 10.1: Shopping Cart</Text>
      <TextInput
        style={styles.input}
        placeholder="ชื่อสินค้า"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="จำนวน"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="ราคา"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="เพิ่มลงตะกร้า" onPress={handleAddItem} />

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} x{item.quantity} ราคาต่อจำนวน {item.price} บาท</Text>
            <TouchableOpacity onPress={() => dispatch(removeItem(item.id))} style={styles.deleteButton}>
              <Text style={{ color: 'white' }}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>ยอดรวม: {totalAmount} บาท</Text>
        <Button title="ล้างตะกร้า" onPress={() => dispatch(clearCart())} />
      </View>
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
  deleteButton: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 3,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CartScreen;
