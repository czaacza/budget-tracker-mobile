import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const BASE_URL = 'http://localhost:3000/api/v1/';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useAuth(); // Assuming useAuth provides the logged-in user

  useEffect(() => {
    if (user) {
      getIncomes(user.id);
      getExpenses(user.id);
      console.log('useEffect');
    }
  }, [user]);

  useEffect(() => {
    if (incomes && expenses && incomes.length > 0 && expenses.length > 0) {
      transactionHistory();
    }
  }, [incomes, expenses]);

  //calculate incomes
  const addIncome = async (income, userId) => {
    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes(userId);
  };

  const getIncomes = async (userId) => {
    const response = await axios.get(
      `${BASE_URL}get-incomes-by-user/${userId}`
    );
    console.log('getincomes');

    setIncomes(response.data);
  };

  const deleteIncome = async (id, userId) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes(userId);
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (income, userId) => {
    const response = await axios
      .post(`${BASE_URL}add-expense`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses(userId);
  };

  const getExpenses = async (userId) => {
    const response = await axios.get(
      `${BASE_URL}get-expenses-by-user/${userId}`
    );
    console.log('getexpenses');

    setExpenses(response.data);
  };

  const deleteExpense = async (id, userId) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses(userId);
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const incomesWithType = incomes.map((income) => {
      return {
        ...income,
        type: 'income',
      };
    });
    const expensesWithType = expenses.map((expense) => {
      return {
        ...expense,
        type: 'expense',
      };
    });

    const history = [...incomesWithType, ...expensesWithType];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setHistoricalData(history.slice(0, 3));
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        historicalData,
        setHistoricalData,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
