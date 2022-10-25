import React, { useRef, useState } from "react";
import Expenses from "./Expenses";
import classes from "./ExpensesForm.module.css";
const ExpensesForm = () => {
  const [initArr, setArr] = useState([]);

  const enteredAmountRef = useRef();
  const enteredDesRef = useRef();
  const enteredCatRef = useRef();

  const addExpenseHandler = (event) => {
    event.preventDefault();
    const enteredAmount = enteredAmountRef.current.value;
    const enteredDes = enteredDesRef.current.value;
    const enteredCat = enteredCatRef.current.value;

    const expenseObj = {
      amount: enteredAmount,
      description: enteredDes,
      category: enteredCat,
    };

    if (
      enteredAmount.trim().length === 0 ||
      enteredDes.trim().length === 0 ||
      enteredCat.trim().length === 0
    ) {
      alert("Fill all inputs before submit");
    } else {
      setArr([...initArr, expenseObj]);
    }

    enteredAmountRef.current.value = "";
    enteredDesRef.current.value = "";
    enteredCatRef.current.value = "";
  };
  console.log(initArr);

  return (
    <React.Fragment>
      <form>
        <h1>Expenses Form</h1>
        <label htmlFor="money">Amount</label>
        <input ref={enteredAmountRef} type="number" id="money"></input>
        <label htmlFor="description">Description</label>
        <input ref={enteredDesRef} type="text" id="description"></input>
        <label htmlFor="expenses">Category</label>
        <select className={classes.select} ref={enteredCatRef} id="category">
          <option value="grocery">Grocery</option>
          <option value="fuel">Fuel</option>
          <option value="medicine">Medicine</option>
          <option value="fruits">Fruits</option>
          <option value="vegitables">Vegitables</option>
        </select>
        <button onClick={addExpenseHandler}>Submit</button>
      </form>
      <section className={classes.section}>
        <h2 className={classes.heading}>Your Expenses</h2>
        {initArr.length > 0 &&
          initArr.map((obj) => {
            {
              console.log("hloo");
            }
            return <Expenses items={obj} />;
          })}
      </section>
    </React.Fragment>
  );
};
export default ExpensesForm;
