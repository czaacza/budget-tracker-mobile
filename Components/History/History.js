// History.js (React Native)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';

const History = ({ transactionHistory }) => {
  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Recent History</Text>
      {transactionHistory.slice(0, 3).map((item, index) => {
        const { _id, title, amount, type } = item;
        return (
          <View key={_id} style={styles.historyItem}>
            <Text style={styles.historyItemText}>{title}</Text>
            <Text
              style={[
                styles.historyItemAmount,
                type === 'expense' ? styles.expense : styles.income,
              ]}
            >
              {type === 'expense' ? `-${amount}` : `+${amount}`}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: {
    // Add styles for the container
  },
  historyContainer: {
    marginVertical: 20,
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#002032',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  historyItemText: {
    fontSize: 18,
  },
  historyItemAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  income: {
    color: 'green',
  },
  expense: {
    color: 'red',
  },
});

export default History;
