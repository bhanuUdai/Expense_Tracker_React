import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { combinedExpenses } from '../../helper/ExpenseHelper';

export default function ExpensePieChart({expenseArr}) {
  return (
    <PieChart
      series={[
        {
          data: combinedExpenses(expenseArr)
        },
      ]}
      width={400}
      height={200}
    />
  );
}
