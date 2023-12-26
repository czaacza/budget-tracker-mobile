// Chart.js
import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { dateFormat } from '../../utils/dateFormat';

const Chart = (props) => {
  const { incomes, expenses } = props;
  const labels = incomes.map((inc) => dateFormat(inc.date));
  const datasets = [
    {
      data: incomes.map((inc) => inc.amount),
      color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
    {
      data: expenses.map((exp) => exp.amount),
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ];

  const data = {
    labels: labels,
    datasets: datasets,
    legend: ['Income', 'Expenses'], // optional
  };

  const chartConfig = {
    backgroundGradientFrom: '#fefefe',
    backgroundGradientTo: '#fefefe',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return labels && datasets && labels.length > 0 && datasets.length > 0 ? (
    <View style={styles.chartContainer}>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 48} // Subtract the padding from the total width
        height={220}
        chartConfig={chartConfig}
        bezier // if you want the line to be curved
        style={styles.chartStyle}
      />
    </View>
  ) : (
    <View></View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center', // This will center the chart
    borderRadius: 18, // Rounded corners
    backgroundColor: '#ffffff', // White background or any color you like
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {
      width: 0,
      height: 3,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 4.65,
    elevation: 8, // Shadow for Android
    marginVertical: 5, // Add vertical spacing
  },
  chartStyle: {
    borderRadius: 18, // Match the container's borderRadius
  },
});

export default Chart;
