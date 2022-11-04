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
import Footer from "./Layout/Footer";
function App() {
  console.log('inside app function')
  const isLogin = useSelector((state) => state.auth.token);
  const theme=useSelector((state=>state.theme.theme))
  const premium=useSelector((state)=>state.expense.premiumButton)
  return (
    <React.Fragment>
      <main style={{background:premium && theme && isLogin?'grey':'white'}}>
        <Header />
        <Switch>
          <Route path="/" exact>
            {!isLogin && <Auth />}
            {isLogin && <Redirect to='/welcome'/>}
          </Route>
          <Route path="/welcome">
            {isLogin && <Welcome />}
            {!isLogin && <Redirect to='/'/>}
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
        <Footer/>
      </main>
    </React.Fragment>
  );
}

export default App;
