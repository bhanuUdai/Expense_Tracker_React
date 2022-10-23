import React, { useContext } from "react";
import ExpenseContext from "../../store/expense-context";
import classes from './SavedContact.module.css'
const SavedContact = (prop) => {

  const expctx = useContext(ExpenseContext);
  return (
    <React.Fragment>
      <h1 className={classes.title}>Your Profile</h1>
      <main className={classes.main} >
        <div className={classes.main_div}>
            <span className={classes.main_span}>Your Name : </span>
          <span className={classes.main_name}>{expctx.userName}</span>
        </div>
        <div className={classes.photo_div}>
            <span>Your Profile photo</span>
          <img src={expctx.profileUrl} alt="UserPhoto"></img>
        </div>
        <button onClick={prop.editButton}  className={classes.edit_button}>EDIT</button>
      </main>
    </React.Fragment>
  );
};

export default SavedContact;
