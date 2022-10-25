import React, { useContext } from "react";
import Header from "./Layout/Header";
import Auth from "./pages/Auth/Auth";
import Welcome from "./pages/Welcome/Welcome";
import { Switch, Route,Redirect } from "react-router-dom";
import Contact from "./pages/Contact";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import VerifyLinkSend from "./pages/Auth/VerifyLinkSend";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ExpenseContext from "./store/expense-context";
import ExpensesForm from "./pages/Expenses/ExpensesForm";
function App() {
  const expctx=useContext(ExpenseContext)
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Route path="/welcome">
          <Welcome/>
        </Route>
        <Route path='/contact'>
          <Contact/>
        </Route>
        <Route path='/verifymail'>
          <VerifyEmail/>
        </Route>
        <Route path='/linksend'>
          <VerifyLinkSend/>
        </Route>
        <Route path='/forget_pass'>
          <ForgetPassword/>
        </Route>
         <Route path="/expenses">
         {expctx.ExpenseToken && <ExpensesForm/>}
         {!expctx.ExpenseToken && <Redirect to="/" />}
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
