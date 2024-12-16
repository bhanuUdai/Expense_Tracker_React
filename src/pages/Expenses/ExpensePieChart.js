import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { combinedExpenses } from '../../helper/ExpenseHelper';
import Box from '@mui/material/Box';

export default function ExpensePieChart({expenseArr}) {
  return (
    <Box
        sx={{marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <PieChart
          series={[
            {
              data: combinedExpenses(expenseArr)
            },
          ]}
          width={400}
          height={200}
        />

    </Box>
  );
}
