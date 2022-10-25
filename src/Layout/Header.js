import React, { useContext } from "react";
import classes from "./Header.module.css";
import ExpenseContext from "../store/expense-context";
import { NavLink, useHistory } from "react-router-dom";
const Header = () => {
  const expctx = useContext(ExpenseContext);
  const history = useHistory();
  const userlogOuthandler = () => {
    expctx.logOut();
    history.replace("/");
  };

  return (
    <React.Fragment>
      <header className={classes.header}>
        <ul>
          <li>
            <p>Home</p>
          </li>
          <li className={classes.expense} >
            <NavLink className={classes.expense_link} to="/expenses">Expenses</NavLink>
          </li>
          <li>
            {expctx.ExpenseToken && <button
              onClick={userlogOuthandler}
              className={classes.logout_button}
            >
              Log Out
            </button>}
          </li>
        </ul>
      </header>
    </React.Fragment>
  );
};
export default Header;
