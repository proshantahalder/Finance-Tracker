import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BudgetScreen = ({ navigation }) => {
  const [budget, setBudget] = useState('');

  const saveBudget = async () => {
    if (budget) {
      try {
        await AsyncStorage.setItem('budget', budget);
        navigation.goBack();
      } catch (error) {
        console.error('Error saving budget:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Set monthly budget"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
      />
      <Button title="Save Budget" onPress={saveBudget} />
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

export default BudgetScreen;