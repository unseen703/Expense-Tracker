import { useContext } from 'react';
import { GlobalContext } from './context/GlobalState'


import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';

const useTransactions = (title) => {
  resetCategories();
  const { transactions } = useContext(GlobalContext);
  // console.log(transactions);
  const rightTransactions = transactions.filter((t) => t.type === title);
  const total = rightTransactions.reduce((acc, currVal) => acc += currVal.amount, 0);
  const categories = (title === 'Income') ? incomeCategories : expenseCategories;

  rightTransactions.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);

    if (category) category.amount += t.amount;
  });

  const filteredCategories = categories.filter((sc) => sc.amount > 0);
  // console.log(filteredCategories);

  const chartData = {

    labels: filteredCategories.map((c) => c.type),
    datasets: [{
      label: 'categoryWise datasets',
      data: filteredCategories.map((c) => c.amount),
      backgroundColor: filteredCategories.map((c) => c.color),
    }],
  };

  return {  total, chartData };
};

export default useTransactions;