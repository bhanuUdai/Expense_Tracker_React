import React, { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ForgetPassword = () => {
  const enteredEmailRef = useRef();
  const history=useHistory()
  const changePasshandler = async (event) => {
    event.preventDefault();
    const passObj = {
      requestType: "PASSWORD_RESET",
      email: enteredEmailRef.current.value,
    };
    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
        passObj,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      try {
        console.log(res);
        alert('Password reset link successfully send to your given email')
        history.replace('/')
      } catch (err) {
        alert(err);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <form>
      <h3 htmlFor="enter_email">
        Enter the email with wich you have registered
      </h3>
      <input ref={enteredEmailRef} type="email" id="enter_email"></input>
      <button onClick={changePasshandler}>Submit</button>
    </form>
  );
};
export default ForgetPassword;
