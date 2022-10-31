import React from "react";
import Header from "./Layout/Header";
import Auth from "./pages/Auth/Auth";
import Welcome from "./pages/Welcome/Welcome";
import { Switch, Route, Redirect } from "react-router-dom";
import Contact from "./pages/Contact";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import VerifyLinkSend from "./pages/Auth/VerifyLinkSend";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ExpensesForm from "./pages/Expenses/ExpensesForm";
import { useSelector } from "react-redux";
function App() {
  const isLogin = useSelector((state) => state.auth.token);
  const theme=useSelector((state=>state.theme.theme))
  const premium=useSelector((state)=>state.expense.premium)
  return (
    <React.Fragment>
      <div style={{backgroundColor:premium && theme && isLogin?'grey':'white'}}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Auth />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/verifymail">
            <VerifyEmail />
          </Route>
          <Route path="/linksend">
            <VerifyLinkSend />
          </Route>
          <Route path="/forget_pass">
            <ForgetPassword />
          </Route>
          <Route path="/expenses">
            {isLogin && <ExpensesForm />}
            {!isLogin && <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
