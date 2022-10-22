import axios from "axios";
import React, { useRef } from "react";
import classes from "./Auth.module.css";
const Auth = () => {
  const enteredEmailRef = useRef();
  const enteredPassRef = useRef();
  const enteredConfPassRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const enteredEmail = enteredEmailRef.current.value;
      const enteredPass = enteredPassRef.current.value;
      const enteredConfPass = enteredConfPassRef.current.value;

      const authObj = {
        email: enteredEmail,
        password: enteredPass,
        returnSecureToken: true,
      };

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
        let res = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
          authObj,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        try {
          console.log(res);
          enteredEmailRef.current.value = "";
          enteredPassRef.current.value = "";
          enteredConfPassRef.current.value = "";
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <React.Fragment>
      <form className={classes.form}>
        <h2>Sign Up</h2>
        <label htmlFor="mail">EMail</label>
        <input ref={enteredEmailRef} type="email" id="mail" required></input>
        <label htmlFor="password_">Password</label>
        <input
          ref={enteredPassRef}
          type="password"
          id="password_"
          required
        ></input>
        <label htmlFor="confirmpass">Confirm Password</label>
        <input
          ref={enteredConfPassRef}
          type="password"
          id="confirmpass"
          required
        ></input>
        <button onClick={submitHandler}>Sign up</button>
      </form>
    </React.Fragment>
  );
};
export default Auth;
