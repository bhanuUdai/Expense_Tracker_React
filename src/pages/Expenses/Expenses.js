import React from "react";
import classes from "./Expenses.module.css";
const Expenses = (prop) => {

  console.log('inside expense')
  return (
    <React.Fragment>
      <main  className={classes.main}>
        <span>
          <h3>Amount :</h3>
          <h2 className={classes.items}>$ {prop.items.amount}</h2>
        </span>
        <span>
          <h3>Description :</h3>
          <h2 className={classes.items}>{prop.items.description}</h2>
        </span>
        <span>
          <h3>Category :</h3>
          <h2 className={classes.items}>{prop.items.category}</h2>
        </span>
        <button
          onClick={() => prop.editButtonClicked(prop.items)}
          className={classes.edit_button}
        >
          EDIT
        </button>
        <button
          onClick={() => prop.deleteButtonClicked(prop.items.Id)}
          className={classes.delete_button}
        >
          DELETE
        </button>
      </main>
    </React.Fragment>
  );
};
export default Expenses;
