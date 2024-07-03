import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    loadExpenses();
    loadBudget();
  }, []);

  const loadExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      if (storedExpenses !== null) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  const loadBudget = async () => {
    try {
      const storedBudget = await AsyncStorage.getItem('budget');
      if (storedBudget !== null) {
        setBudget(parseFloat(storedBudget));
      }
    } catch (error) {
      console.error('Error loading budget:', error);
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Finance Tracker</Text>
      <Text style={styles.budget}>Budget: ${budget.toFixed(2)}</Text>
      <Text style={styles.expenses}>Total Expenses: ${totalExpenses.toFixed(2)}</Text>
      <Button title="Add Expense" onPress={() => navigation.navigate('AddExpense')} />
      <Button title="Set Budget" onPress={() => navigation.navigate('Budget')} />
      <Button title="View Stats" onPress={() => navigation.navigate('Stats')} />
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>{item.description}: ${item.amount.toFixed(2)}</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  budget: {
    fontSize: 18,
    marginBottom: 10,
  },
  expenses: {
    fontSize: 18,
    marginBottom: 20,
  },
  expenseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;