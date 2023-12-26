import React, { useEffect, useState, memo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Chart from '../Chart/Chart';
import { useGlobalContext } from '../../context/GlobalContext';
import History from '../History/History';

function Dashboard({ userId }) {
  // let incomes = [
  //   {
  //     _id: '6575ae29a40828ba78d3992f',
  //     userId: '6568725a8a9a931890ee1f5b',
  //     title: 'Nowy testowy przychód',
  //     amount: 250,
  //     category: 'stocks',
  //     description: 'Testowy',
  //     date: '2023-12-04T23:00:00.000Z',
  //     createdAt: '2023-12-10T12:25:13.997Z',
  //     updatedAt: '2023-12-10T12:25:13.997Z',
  //   },
  //   {
  //     _id: '6575ae29a40828ba78d3992f',
  //     userId: '6568725a8a9a931890ee1f5b',
  //     title: 'Nowy inny przychód',
  //     amount: 300,
  //     category: 'stocks',
  //     description: 'Testowy',
  //     date: '2023-11-01T23:00:00.000Z',
  //     createdAt: '2023-12-10T12:25:13.997Z',
  //     updatedAt: '2023-12-10T12:25:13.997Z',
  //   },
  //   {
  //     _id: '6575ae29a40828ba78d3992f',
  //     userId: '6568725a8a9a931890ee1f5b',
  //     title: 'Nowy testowy 2222',
  //     amount: 100,
  //     category: 'stocks',
  //     description: 'Testowy',
  //     date: '2023-10-10T23:00:00.000Z',
  //     createdAt: '2023-12-10T12:25:13.997Z',
  //     updatedAt: '2023-12-10T12:25:13.997Z',
  //   },
  // ];
  // let expenses = [
  //   {
  //     _id: '6575ae6aa40828ba78d39934',
  //     userId: '6568725a8a9a931890ee1f5b',
  //     title: 'Nowy testowy dodatek',
  //     amount: 115,
  //     category: 'takeaways',
  //     description: 'Testowy wydatek',
  //     date: '2023-12-04T23:00:00.000Z',
  //     createdAt: '2023-12-10T12:26:18.624Z',
  //     updatedAt: '2023-12-10T12:26:18.624Z',
  //   },
  //   {
  //     _id: '6575ad89a40828ba78d39919',
  //     userId: '6568725a8a9a931890ee1f5b',
  //     title: 'Akcesoria muzyczne',
  //     amount: 560,
  //     category: 'groceries',
  //     description: 'Akcesoria',
  //     date: '2023-12-04T23:00:00.000Z',
  //     createdAt: '2023-12-10T12:22:33.993Z',
  //     updatedAt: '2023-12-10T12:22:33.993Z',
  //   },
  //   {
  //     _id: '6575ad5fa40828ba78d39908',
  //     userId: '6568725a8a9a931890ee1f5b',
  //     title: 'Telewizor',
  //     amount: 1250,
  //     category: 'groceries',
  //     description: 'TV',
  //     date: '2023-11-15T23:00:00.000Z',
  //     createdAt: '2023-12-10T12:21:51.919Z',
  //     updatedAt: '2023-12-10T12:21:51.919Z',
  //   },
  // ];

  const { incomes, expenses, historicalData } = useGlobalContext();
  const ChartMemoized = React.memo(Chart);
  const HistoryMemoized = React.memo(History);

  const totalIncome = () => {
    return incomes.reduce((acc, curr) => acc + curr.amount, 0);
  };

  const totalExpenses = () => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.historyContainer}>
        {historicalData && historicalData.length > 0 && (
          <HistoryMemoized transactionHistory={historicalData} />
        )}

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>All transactions</Text>
          {<ChartMemoized incomes={incomes} expenses={expenses} />}
        </View>
        <View style={styles.minMaxContainer}>
          <View style={styles.salaryItemContainer}>
            <View style={styles.salaryTitle}>
              <Text style={styles.salarySpan}>Min</Text>
              <Text style={styles.salarySpan}>Income</Text>
              <Text style={styles.salarySpan}>Max</Text>
            </View>
            <View style={styles.salaryItem}>
              <Text style={styles.salaryAmount}>
                ${Math.min(...incomes.map((item) => item.amount))}
              </Text>
              <Text style={styles.salaryAmount}>
                ${Math.max(...incomes.map((item) => item.amount))}
              </Text>
            </View>
          </View>
          <View style={styles.salaryItemContainer}>
            <View style={styles.salaryTitle}>
              <Text style={styles.salarySpan}>Min</Text>
              <Text style={styles.salarySpan}>Expense</Text>
              <Text style={styles.salarySpan}>Max</Text>
            </View>
            <View style={styles.salaryItem}>
              <Text style={styles.salaryAmount}>
                ${Math.min(...expenses.map((item) => item.amount))}
              </Text>
              <Text style={styles.salaryAmount}>
                ${Math.max(...expenses.map((item) => item.amount))}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.amountStackContainer}>
        <Text style={styles.sectionTitle}>Total Amounts</Text>

        <View style={styles.amountBlock}>
          <Text style={styles.amountTitle}>Total Income</Text>
          <Text style={styles.amountValue}>${totalIncome()}</Text>
        </View>
        <View style={styles.amountBlock}>
          <Text style={styles.amountTitle}>Total Expense</Text>
          <Text style={styles.amountValue}>${totalExpenses()}</Text>
        </View>
        <View style={styles.amountBlock}>
          <Text style={styles.amountTitle}>Total Balance</Text>
          <Text style={styles.amountValue}>${totalBalance()}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 12,
    // backgroundColor: '#fff',
  },
  chartContainer: {
    marginVertical: 20,
    // backgroundColor: '#fff',
    // padding: 12,
  },
  historyContainer: {
    marginBottom: 20,
  },
  minMaxContainer: {
    marginTop: 20,
  },
  salaryTitle: {
    fontSize: 14,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  salarySpan: {
    fontSize: 18,
    fontWeight: '600',
    color: '#002032',
  },
  salaryItem: {
    backgroundColor: '#fefefe',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  salaryAmount: {
    fontWeight: '600',
    fontSize: 20,
    color: '#444',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  balance: {
    backgroundColor: '#fefefe',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  amountTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#002032',
  },
  amountValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2ecc71', // Adjust the color as needed
  },
  salaryItemContainer: {
    alignItems: 'center', // Center the title and amounts
  },
  amountStackContainer: {
    marginVertical: 20,
  },
  amountBlock: {
    backgroundColor: '#fefefe',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center', // Center the text for each block
    marginBottom: 10, // Add space between each block
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#002032',
  },
});

export default Dashboard;
