import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./VerifyEmail.module.css";
import useHttp from "../../hook/useHttp";
import { useSelector } from "react-redux";
const VerifyEmail = () => {
  const { error, sendRequest } = useHttp();
  const token=useSelector(state=>state.auth.token)
  const history = useHistory();
  const verifyMailHandler = async (event) => {
    event.preventDefault();
    try {
      const verifyObj = {
        requestType: "VERIFY_EMAIL",
        idToken: token,
      };

      const resData = () => {
        history.push("/linksend");
      };

      sendRequest(
        {
          request:'post',
          url: "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
          body: verifyObj,
          header: { "Content-Type": "X-Firebase-Locale" },
        },
        resData
      );
    } catch (err) {
      console.log(err);
      alert("Something Went wrong.Try to relogin your account");
    }
  };

  return (
    <React.Fragment>
     
      <form>
        <h2>Verify your email</h2>
        <button className={classes.verify_button} onClick={verifyMailHandler}>
          Click here
        </button>
        {error && <h3 className={classes.error_tag}>{`${error} !!!`}</h3>}
      </form>
    </React.Fragment>
  );
};
export default VerifyEmail;
