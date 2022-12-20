import React,{Suspense} from "react";
 import Header from "./Layout/Header";
// import Auth from "./pages/Auth/Auth";
//import Welcome from "./pages/Welcome/Welcome";
import { Switch, Route, Redirect } from "react-router-dom";
// import Contact from "./pages/Contact";
// import VerifyEmail from "./pages/Auth/VerifyEmail";
// import VerifyLinkSend from "./pages/Auth/VerifyLinkSend";
// import ForgetPassword from "./pages/Auth/ForgetPassword";
// import ExpensesForm from "./pages/Expenses/ExpensesForm";
import { useSelector } from "react-redux";
import Footer from "./Layout/Footer";
import Loading from "./pages/UI/Loading";

//const Header =React.lazy(()=>import("./Layout/Header"));
const Auth =React.lazy(()=>import ("./pages/Auth/Auth"));
const Welcome=React.lazy(()=>import ("./pages/Welcome/Welcome"));
const Contact=React.lazy(()=>import("./pages/Contact"));
const VerifyEmail=React.lazy(()=>import("./pages/Auth/VerifyEmail"));
const VerifyLinkSend=React.lazy(()=>import("./pages/Auth/VerifyLinkSend"));
const ForgetPassword=React.lazy(()=>import("./pages/Auth/ForgetPassword"));
const ExpensesForm=React.lazy(()=>import("./pages/Expenses/ExpensesForm"));
//const Footer=React.lazy(()=>import("./Layout/Footer"))

function App() {
  console.log('inside app function')
  const isLogin = useSelector((state) => state.auth.token);
  const theme=useSelector((state=>state.theme.theme))
  const premium=useSelector((state)=>state.expense.premiumButton)
  return (
    <React.Fragment>
      <main style={{background:premium && theme && isLogin?'grey':'white'}}>
        <Header />
        <Suspense fallback={<Loading>Loading...</Loading>} >
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
        </Suspense>
        <Footer/>
      </main>
    </React.Fragment>
  );
}

export default App;
