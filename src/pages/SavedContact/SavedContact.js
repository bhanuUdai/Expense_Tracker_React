import React, { useContext } from "react";
import ExpenseContext from "../../store/expense-context";
import classes from './SavedContact.module.css'
const SavedContact = ({contactPageDetails,...prop}) => {

  const expctx = useContext(ExpenseContext);
  console.log("contactPageDetails==>",contactPageDetails);
  return (
    <React.Fragment>
      <h1 className={classes.title}>Your Profile</h1>
      <main className={classes.main} >
        <div className={classes.main_div}>
            <span className={classes.main_span}>Your Name : </span>
          <span className={classes.main_name}>{contactPageDetails[0]?.['name']}</span>
        </div>
        <div className={classes.photo_div}>
            <span>Your Profile photo</span>
          <img src={contactPageDetails[0]?.['profile_photo']} alt="UserPhoto"></img>
        </div>
        <button onClick={prop.editButton}  className={classes.edit_button}>EDIT</button>
      </main>
    </React.Fragment>
  );
};

export default SavedContact;
