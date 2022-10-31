import React from "react";
import classes from "./Header.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { authAction } from "../store/auth-reducer";
const Header = () => {
  const isLogin=useSelector(state=>state.auth.token)
  const premium=useSelector((state)=>state.expense.premium)
  const dispatch=useDispatch()
  const history = useHistory();
  const userlogOuthandler = () => {
    dispatch(authAction.removeExpenseToken())
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
            <NavLink className={classes.expense_link} activeClassName={classes.expense_active} to="/expenses">Expenses</NavLink>
          </li>
          <li>
            {isLogin && <button
              onClick={userlogOuthandler}
              className={classes.logout_button}
            >
              Log Out
            </button>}
          </li>
          <li>
            <button>{premium ? 'light mode':"dark mode"}</button>
          </li>
        </ul>
      </header>
    </React.Fragment>
  );
};
export default Header;
