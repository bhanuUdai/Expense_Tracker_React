import React, { useRef, useState, useEffect } from "react";
import Expenses from "./Expenses";

import useHttp from "../../hook/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../store/expense-reducer";
import { themeAction } from "../../store/theme-reducer";

import ExpensePieChart from "./ExpensePieChart";
import { categoryList } from "../../helper/ExpenseHelper";
import ExpenseDetails from "./ExpenseDetails";

//MUI
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


import Toaster from "../../elements/Toaster";
const ExpensesForm = () => {
  const expenseArr = useSelector((state) => state.expense.expenses);
  const [isEditId, setIsEditId] = useState(null);
  const { error, sendRequest } = useHttp();
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toasterMessage, setToasterMessage] = useState(false);

  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("grocery");
  const location = useLocation();
  const projectId = location?.pathname?.split("/").pop();

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    try {
      const resData = (res) => {
        let arr = [];
        for (const prop of res?.data?.res) {
          arr.push({
            Id: prop?.id,
            amount: prop?.amount,
            category: prop?.category,
            description: prop?.description,
          });
        }
        dispatch(expenseAction.updateExpense(arr));
      };

      let payLoad = {
        project_id: projectId,
      };

      console.log("payLoad==>", payLoad);
      sendRequest(
        {
          request: "get",
          url: `http://localhost:8080/expense_tracker/get_expenses/`,
          body: payLoad,
          header: { "Content-Type": "application/json " },
        },
        resData
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleOpenSnackbar = (message) => {
    setOpenSnackbar(true);
    setToasterMessage(message);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const editButtonHandler = (data) => {
    console.log("editButtonHandler==>", data);
    dispatch(expenseAction.edditingExpense(data.Id));
    setAmount(data.amount);
    setDescription(data.description);
    setCategory(data.category);
    setIsEditId(data.Id);
  };

  const deleteButtonHandler = (data) => {
    const resData = () => {
      dispatch(expenseAction.edditingExpense(data));
    };

    console.log("Data==>", data);

    let payLoad = {
      id: data,
      project_id: projectId,
    };
    sendRequest(
      {
        request: "delete",
        url: `http://localhost:8080/expense_tracker/delete_expense/`,
        body: payLoad,
        header: { "Content-Type": "application/json " },
      },
      resData
    );
  };

  const addExpenseHandler = async (event) => {
    try {
      console.log("addExpenseHandler==>", isEditId);
      event.preventDefault();
      const enteredAmount = amount;
      const enteredDes = description;
      const enteredCat = category;

      const expenseObj = {
        amount: enteredAmount,
        description: enteredDes,
        category: enteredCat,
      };

      if (
        !(
          enteredAmount > 0 &&
          enteredDes.trim().length > 0 &&
          enteredCat.trim().length > 0
        )
      ) {
        console.log("CLICKED!!", expenseObj);
        handleOpenSnackbar("Fill all inputs before submit");
      } else {
        if (isEditId === null) {
          console.log("post");
          const resData = (res) => {
            if (res?.data?.error) {
              handleOpenSnackbar("Something went wrong, please retry");
            } else {
              getExpenses();
            }
          };

          let payLoad = {
            ...expenseObj,
            project_id: projectId,
          };

          sendRequest(
            {
              request: "post",
              url: `http://localhost:8080/expense_tracker/add_expense/`,
              body: payLoad,
              header: { "Content-Type": "application/json " },
            },
            resData
          );
        } else {
          const resEditData = (data) => {
            console.log(data, "put data");
            getExpenses();
            setIsEditId(null);
          };

          console.log("expenseObj==>", expenseObj);
          let payLoad = {
            ...expenseObj,
            id: isEditId,
            project_id: projectId,
          };

          console.log("payLoad==>", payLoad);

          sendRequest(
            {
              request: "put",
              url: `http://localhost:8080/expense_tracker/edit_expense/`,
              body: payLoad,
              header: { "Content-Type": "application/json " },
            },
            resEditData
          );
        }
      }

      setAmount(0);
      setDescription("");
      setCategory("grocery");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (error) {
      handleOpenSnackbar(error);
    }
  }, [error]);

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
    arr1.unshift(["AMOUNT", "CATEGORY", "DESCRIPTION"]);
    return arr1.join("\n");
  }

  const blob = new Blob([makeCSV(expenseArr)]);

  return (
    <Box
      sx={{
        padding: "20px",
        minHeight: "calc(100vh - 104px)",
      }}
    >
      {/* {error && <h1 className={classes.error_heading}>{`${error}!!! :(`}</h1>} */}
      <Toaster
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        toasterMessage={toasterMessage}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
         
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            margin: "0px auto auto auto",
            width: "80vw",
          }}
        >
          <Typography variant="h5" fontWeight="bold" >
            Expense Form
          </Typography>

          <FormControl fullWidth sx={{ m: 0 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              onChange={(e) => setAmount(e.target.value)}
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
              value={amount}
            />
          </FormControl>

          <TextField
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            value={description}
          />

          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            label="Select category"
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            // helperText="Please select your currency"
          >
            {categoryList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Box
            sx={{
              "& button": { m: 0 },
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={addExpenseHandler}
              variant="contained"
              size="small"
            >
              Submit
            </Button>
          </Box>
        </Box>
        {expenseArr && expenseArr.length > 0 && <ExpenseDetails
          expenseArr={expenseArr}
          editButtonHandler={editButtonHandler}
          deleteButtonHandler={deleteButtonHandler}
        />}
      </Box>

      {expenseArr.length > 0 && <ExpensePieChart expenseArr={expenseArr} />}
    </Box>
  );
};
export default ExpensesForm;
