import React, { useRef, useState, useEffect } from "react";
import Expenses from "./Expenses";
import classes from "./ExpensesForm.module.css";
import useHttp from "../../hook/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../store/expense-reducer";
import { themeAction } from "../../store/theme-reducer";
const ExpensesForm = () => {
  const expenseArr = useSelector((state) => state.expense.expenses);
  const premiumButton = useSelector((state) => state.expense.premiumButton);
  const premium = useSelector((state) => state.theme.onPremium);
  const [isEditId, setIsEditId] = useState(null);
  const enteredAmountRef = useRef();
  const enteredDesRef = useRef();
  const enteredCatRef = useRef();
  const { error, sendRequest } = useHttp();
  const dispatch = useDispatch();
  const userMail=useSelector(state=>state.auth.useremail)

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
      console.log(arr);
      dispatch(expenseAction.updateExpense(arr));
    };
    sendRequest(
      {
        request: "get",
        url: `https://react-expense-tracker-8cc99-default-rtdb.firebaseio.com/${userMail}.json`,
        header: { "Content-Type": "application/json " },
      },
      resData
    );
  }, [sendRequest, dispatch]);

  const editButtonHandler = (data) => {
    dispatch(expenseAction.edditingExpense(data.Id));
    enteredAmountRef.current.value = data.amount;
    enteredDesRef.current.value = data.description;
    enteredCatRef.current.value = data.category;
    setIsEditId(data.Id);
  };

  const deleteButtonHandler = (data) => {
    console.log(data);
    const resData = () => {
      dispatch(expenseAction.edditingExpense(data));
    };

    sendRequest(
      {
        request: "delete",
        url: `https://react-expense-tracker-8cc99-default-rtdb.firebaseio.com/${userMail}/${data}.json`,
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
          dispatch(expenseAction.addingNewExpense(expenseObjWithId));
        };

        sendRequest(
          {
            request: "post",
            url: `https://react-expense-tracker-8cc99-default-rtdb.firebaseio.com/${userMail}.json`,
            body: expenseObj,
            header: { "Content-Type": "application/json " },
          },
          resData
        );
      } else {
        const resEditData = (data) => {
          console.log(data, "put data");
          dispatch(expenseAction.addingNewExpense(data.data));
          setIsEditId(null);
        };

        sendRequest(
          {
            request: "put",
            url: `https://react-expense-tracker-8cc99-default-rtdb.firebaseio.com/${userMail}/${isEditId}.json`,
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

  useEffect(() => {
    if (expenseArr.length > 0) {
      let totalAmount = expenseArr.reduce((prev, current) => {
        return prev + Number(current.amount);
      }, 0);

      if (totalAmount > 1000) {
        dispatch(expenseAction.setPremiumButton());
      } else {
        dispatch(expenseAction.unSetPremiumButton());
        dispatch(themeAction.offTheme());
        dispatch(themeAction.offPremium());
      }
    }
  }, [expenseArr, dispatch]);

  const premiumHAndler = (event) => {
    event.preventDefault();
    dispatch(themeAction.onTheme());
    dispatch(themeAction.onPremium());
  };


  function makeCSV(data) {
    let arr1 = data.map((obj) => {
      let arr2 = [obj.amount, obj.category, obj.description];
      return arr2.join();
    });
    arr1.unshift(['AMOUNT','CATEGORY','DESCRIPTION'])
    return arr1.join("\n");
  }

  const blob = new Blob([makeCSV(expenseArr)]);

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
        <button className={classes.submit_button} onClick={addExpenseHandler}>
          Submit
        </button>
        {premiumButton && (
          <button onClick={premiumHAndler} className={classes.premium_button}>
            {premium
              ? "you subscribe to premium"
              : "Expense Amount exceed $1000, click here for premium"}
          </button>
        )}
       {expenseArr.length>0 && premium && <a className={classes.anchor} href={URL.createObjectURL(blob)}  download="file.csv">
          Download Expense
        </a>}
      </form>
      <section className={classes.section}>
        <h2 className={classes.heading}>Your Expenses</h2>
        {expenseArr.length > 0 &&
          expenseArr.map((obj) => {
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
