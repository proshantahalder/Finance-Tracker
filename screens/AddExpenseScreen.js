import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpenseScreen = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = async () => {
    if (description && amount) {
      const newExpense = { description, amount: parseFloat(amount) };
      try {
        const storedExpenses = await AsyncStorage.getItem('expenses');
        const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
        expenses.push(newExpense);
        await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
        navigation.goBack();
      } catch (error) {
        console.error('Error saving expense:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Add Expense" onPress={addExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddExpenseScreen;