import React, { Suspense } from "react";
import Header from "./Layout/Header";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./Layout/Footer";
import Loading from "./pages/UI/Loading";
import Backdrop from "@mui/material/Backdrop";
import GradientCircularBar from "./elements/GradientCircularBar";
import {
  Box,
  Container,
  Stack,
  createTheme,
  ThemeProvider,
} from "@mui/material";

//const Header =React.lazy(()=>import("./Layout/Header"));
const Auth = React.lazy(() => import("./pages/Auth/Auth"));
const Welcome = React.lazy(() => import("./pages/Welcome/Welcome"));
const Contact = React.lazy(() => import("./pages/Contact"));
const VerifyEmail = React.lazy(() => import("./pages/Auth/VerifyEmail"));
const VerifyLinkSend = React.lazy(() => import("./pages/Auth/VerifyLinkSend"));
const ForgetPassword = React.lazy(() => import("./pages/Auth/ForgetPassword"));
const ExpensesForm = React.lazy(() => import("./pages/Expenses/ExpensesForm"));
//const Footer=React.lazy(()=>import("./Layout/Footer"))



function App() {
  // console.log('inside app function');
  const isLogin = useSelector((state) => state.auth.token);
  const theme = useSelector((state) => state.theme.theme);
  const premium = useSelector((state) => state.expense.premiumButton);
  // console.log("isLogin==>",isLogin);

  const darkTheme = createTheme({
    palette: {
      mode: theme ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
    <React.Fragment >
      <main
        style={{
          paddingTop: "64px",
          background: premium && theme && isLogin ? "grey" : "white",
        }}
      >
        <Header />
        <Suspense
          fallback={
            <Backdrop
              sx={(theme) => ({
                color: "#fff",
                zIndex: theme.zIndex.drawer + 1,
              })}
              open={true}
            >
              <GradientCircularBar />
            </Backdrop>
          }
        >
          <Switch>
            <Route path="/" exact>
              {<Auth />}
              {/* {isLogin && <Redirect to='/welcome'/>} */}
            </Route>
            <Route path="/welcome/:id">
              {isLogin && <Welcome />}
              {!isLogin && <Redirect to="/" />}
            </Route>
            <Route path="/contact/:id">
              <Contact />
            </Route>
            <Route path="/verifymail/:id">
              <VerifyEmail />
            </Route>
            <Route path="/linksend/:id">
              <VerifyLinkSend />
            </Route>
            <Route path="/forget_pass">
              <ForgetPassword />
            </Route>
            <Route path="/expenses/:id">
              {isLogin && <ExpensesForm />}
              {!isLogin && <Redirect to="/" />}
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </main>
    </React.Fragment>

    </ThemeProvider>
  );
}

export default App;
