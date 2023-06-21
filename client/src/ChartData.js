import {  useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import useTransactions from './useTransactions';
import 'chart.js/auto'; // ADD THIS

export const ChartData= ({title}) => {
  const ref = useRef();
    const x = useTransactions(title);

  const data = x.chartData; 

  return <Doughnut ref={ref} data={data} />
};