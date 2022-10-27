import React, { useRef, useState, useEffect } from "react";
import Expenses from "./Expenses";
import classes from "./ExpensesForm.module.css";
import useHttp from "../../hook/useHttp";
const ExpensesForm = () => {
  const [initArr, setArr] = useState([]);
  const [isEditId, setIsEditId] = useState(null);
  const enteredAmountRef = useRef();
  const enteredDesRef = useRef();
  const enteredCatRef = useRef();
  const { error, sendRequest } = useHttp();

  useEffect(() => {
    const resData = (res) => {
      let arr = [];
      for (const prop in res.data) {
        arr.push({
          Id: prop,
          amount: res.data[prop].amount,
          category: res.data[prop].category,
          description: res.data[prop].description,
        });
      }
      setArr(arr);
    };
    sendRequest(
      {
        request: "get",
        url: "https://react-expense-tracker-8cc99-default-rtdb.firebaseio.com/expense.json",
        header: { "Content-Type": "application/json " },
      },
      resData
    );
  }, [sendRequest]);

  const editButtonHandler = (data) => {
    let filteredArr = initArr.filter((arr) => arr.Id !== data.Id);
    setArr(filteredArr);
    enteredAmountRef.current.value = data.amount;
    enteredDesRef.current.value = data.description;
    enteredCatRef.current.value = data.category;
    setIsEditId(data.Id);
  };

  const deleteButtonHandler = (data) => {
    console.log(data);
    const resData = () => {
      let filteredArr = initArr.filter((arr) => arr.Id !== data);
      setArr(filteredArr);
    };

    sendRequest(
      {
        request: "delete",
        url: `https://react-expense-tracker-8cc99-default-rtdb.firebaseio.com/expense/${data}.json`,
        header: { "Content-Type": "application/json " },
      },
      resData
    );
  };

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
      if (isEditId === null) {
        console.log("post");
        const resData = (res) => {
          const expenseObjWithId = { ...expenseObj, Id: res.data.name };
          setArr([...initArr, expenseObjWithId]);
        };

        sendRequest(
          {
            request: "post",
            url: "https://react-expense-tracker-8cc99-default-rtdb.firebaseio.com/expense.json",
            body: expenseObj,
            header: { "Content-Type": "application/json " },
          },
          resData
        );
      } else {
        const resEditData = (data) => {
          console.log(data, "put data");
          setArr([...initArr, data.data]);
          setIsEditId(null);
        };

        sendRequest(
          {
            request: "put",
            url: `https://react-expense-tracker-8cc99-default-rtdb.firebaseio.com/expense/${isEditId}.json`,
            body: expenseObj,
            header: { "Content-Type": "application/json " },
          },
          resEditData
        );
      }
    }

    enteredAmountRef.current.value = "";
    enteredDesRef.current.value = "";
    enteredCatRef.current.value = "";
  };

  return (
    <React.Fragment>
      {error && <h1 className={classes.error_heading}>{`${error}!!! :(`}</h1>}
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
            return (
              <Expenses
                key={Math.random()}
                items={obj}
                editButtonClicked={editButtonHandler}
                deleteButtonClicked={deleteButtonHandler}
              />
            );
          })}
      </section>
    </React.Fragment>
  );
};
export default ExpensesForm;
