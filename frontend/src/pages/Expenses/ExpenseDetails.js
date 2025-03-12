import React from 'react';
import Expenses from './Expenses';
import { Typography } from "@mui/material"; // Removed Button import
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ExpenseDetails = ({ expenseArr, editButtonHandler, deleteButtonHandler }) => {

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense Breakdown", 20, 20);

    const tableColumn = ["Amount", "Description", "Category"];
    const tableRows = [];

    expenseArr.forEach(expense => {
      const expenseData = [
        expense.amount,
        expense.description,
        expense.category,
      ];
      tableRows.push(expenseData);
    });

    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 30 });
    doc.save("expenses.pdf");
  };

  return (
    <section>
      <Typography variant='h5' fontWeight="bold" mb="20px" textAlign="center" color='#1976d2'>Breakdown</Typography>
      {expenseArr.length > 0 && (
        <>
          {/* Removed Export to PDF Button */}
          <Expenses
            expenseArr={expenseArr}
            key={Math.random()}
            editButtonHandler={editButtonHandler}
            deleteButtonHandler={deleteButtonHandler}
          />
        </>
      )}
    </section>
  );
}

export default ExpenseDetails;