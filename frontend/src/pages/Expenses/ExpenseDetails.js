import React from 'react'
import Expenses from './Expenses'
import { Typography } from "@mui/material";


const ExpenseDetails = ({expenseArr, editButtonHandler, deleteButtonHandler}) => {
  return (
    <section>
    <Typography variant='h5' fontWeight="bold" mb="20px" textAlign="center" > Breakdown </Typography>
    {expenseArr.length > 0 && (
      <Expenses
        expenseArr={expenseArr}
        key={Math.random()}
        editButtonHandler={editButtonHandler}
        deleteButtonHandler={deleteButtonHandler}
      />
    )}
  </section>
  )
}

export default ExpenseDetails