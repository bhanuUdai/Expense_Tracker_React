import React from "react";
import classes from "./Header.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { authAction } from "../store/auth-reducer";
import { themeAction } from "../store/theme-reducer";
const Header = () => {
  const isLogin=useSelector(state=>state.auth.token)
  const premium=useSelector((state)=>state.theme.onPremium)
  const theme=useSelector((state)=>state.theme.theme)
  const dispatch=useDispatch()
  const history = useHistory();
  const userlogOuthandler = () => {
    dispatch(authAction.removeExpenseToken())
    dispatch(authAction.removeUserEmail())
    history.replace("/");
  };


  const themeChangeHandler=()=>
  {
    dispatch(themeAction.toggleTheme())
  }


  return (
    <React.Fragment>
      <header className={classes.header}>
        <ul >
          <li>
          <NavLink className={classes.expense_link} activeClassName={classes.expense_active} to="/welcome">Home</NavLink>
          </li>
          <li >
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
            {premium &&isLogin && <button className={classes.logout_button} onClick={themeChangeHandler} >{theme ? 'light mode':"dark mode"}</button>}
          </li>
        </ul>
      </header>
    </React.Fragment>
  );
};
export default Header;
