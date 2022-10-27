import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hook/useHttp";

const ForgetPassword = () => {
  const { error, sendRequest } = useHttp();
  const enteredEmailRef = useRef();
  const history = useHistory();
  const changePasshandler = async (event) => {
    event.preventDefault();
    const passObj = {
      requestType: "PASSWORD_RESET",
      email: enteredEmailRef.current.value,
    };
    try {
      const resdata = () => {
        alert("Password reset link successfully send to your given email");
        history.replace("/");
      };

      sendRequest(
        {
          request:'post',
          url: "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
          body: passObj,
          header: { "Content-Type": "application/json" },
        },
        resdata
      );
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
      {error && <h3>{`${error}!!!`}</h3>}
    </form>
  );
};
export default ForgetPassword;
