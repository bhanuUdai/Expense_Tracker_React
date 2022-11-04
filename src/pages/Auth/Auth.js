import React, {  useRef, useState } from "react";
import classes from "./Auth.module.css";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
import useHttp from "../../hook/useHttp";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth-reducer";


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const enteredEmailRef = useRef();
  const enteredPassRef = useRef();
  const enteredConfPassRef = useRef();
  const history = useHistory();
  const { error, sendRequest } = useHttp();
  const dispatch=useDispatch()
  const toggleAuthHandler = (event) => {
    event.preventDefault();
    setIsLogin(!isLogin);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const enteredEmail = enteredEmailRef.current.value;
      const enteredPass = enteredPassRef.current.value;
      const enteredConfPass = !isLogin
        ? enteredConfPassRef.current.value
        : null;

      const authObj = {
        email: enteredEmail,
        password: enteredPass,
        returnSecureToken: true,
      };

      if (isLogin) {
        const resData = (res) => {
          dispatch(authAction.getExpenseToken(res.data.idToken))
          dispatch(authAction.setUserEmail(enteredEmail))
          history.replace("/welcome");
          enteredEmailRef.current.value = "";
          enteredPassRef.current.value = "";
        };

        sendRequest(
          {
            request: "post",
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
            body: authObj,
            header: { "Content-Type": "application/json" },
          },
          resData
        );
      } else {
        if (
          enteredEmail.trim().length === 0 ||
          enteredPass.trim().length === 0 ||
          enteredConfPass.trim().length === 0
        ) {
          alert("All fields are mandatory");
        } else if (enteredPass !== enteredConfPass) {
          alert("password doesnot match");
        } else if (
          enteredPass === enteredConfPass &&
          enteredEmail.trim().length > 0 &&
          enteredPass.trim().length > 0 &&
          enteredConfPass.trim().length > 0
        ) {
          const resData = (res) => {
            console.log(res);
            enteredEmailRef.current.value = "";
            enteredPassRef.current.value = "";
            enteredConfPassRef.current.value = "";
            alert("New Account created successfully");
            setIsLogin(true);
          };

          sendRequest(
            {
              request: "post",
              url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
              body: authObj,
              header: { "Content-Type": "application/json" },
            },
            resData
          );
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const forgetpasswordhandler = (event) => {
    event.preventDefault();
    history.push("/forget_pass");
  };
  <Route path="/forget_pass">
    <ForgetPassword />
  </Route>;

  return (
    <React.Fragment>
      {error && <h1 className={classes.error_tag}>{error}</h1>}
      <form className={classes.form}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <label htmlFor="mail">EMail</label>
        <input ref={enteredEmailRef} type="email" id="mail" required></input>
        <label htmlFor="password_">Password</label>
        <input
          ref={enteredPassRef}
          type="password"
          id="password_"
          required
        ></input>
        {!isLogin && <label htmlFor="confirmpass">Confirm Password</label>}
        {!isLogin && (
          <input
            ref={enteredConfPassRef}
            type="password"
            id="confirmpass"
            required
          ></input>
        )}
        <button onClick={submitHandler}>{isLogin ? "Login" : "Sign Up"}</button>
        {isLogin && (
          <button
            onClick={forgetpasswordhandler}
            className={classes.toggleButton}
          >
            Forget Your Password?{" "}
          </button>
        )}
        <button onClick={toggleAuthHandler} className={classes.toggleButton}>
          {isLogin ? "Create new account" : "Already have account?"}
        </button>
      </form>
    </React.Fragment>
  );
};
export default Auth;
