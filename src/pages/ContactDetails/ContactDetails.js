import axios from "axios";
import React, { useRef } from "react";
import classes from "./ContactDetails.module.css";
const ContactDetails = () => {
  const userNameRef = useRef();
  const userProfileUrlRef = useRef();

  const detailSubmithandler = async (event) => {
    event.preventDefault();
    try {
      const userName = userNameRef.current.value;
      const userProfile = userProfileUrlRef.current.value;

      const contactObj = {
        idToken: localStorage.getItem("ExpenseToken"),
        displayName: userName,
        photoUrl: userProfile,
        returnSecureToken: true,
      };

      if(userName.trim().length>0 && userProfile.trim().length>0)
      {
        const res = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
            contactObj,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          try {
            console.log(res);
            userNameRef.current.value='';
            userProfileUrlRef.current.value='';
          } catch (err) {
            console.log(err);
          }
      }
      else{
        alert('Fill all the fields')
      }

     
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <form>
        <h4>Contact Details</h4>
        <label htmlFor="name">Full Name</label>
        <input required ref={userNameRef} type="text" id="name"></input>
        <label htmlFor="url_">Profile Photo URL</label>
        <input required ref={userProfileUrlRef} type="url" id="url_"></input>
        <div className={classes.button_div}>
          <button onClick={detailSubmithandler} className={classes.update_btn}>update</button>
          <button className={classes.cancel_button}>cancel</button>
        </div>
      </form>
    </React.Fragment>
  );
};
export default ContactDetails;
