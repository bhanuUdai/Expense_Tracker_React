import React from "react";
import classes from './Welcome.module.css'
const Welcome=()=>
{
    return(<React.Fragment>
        <h1 className={classes.heading} >Welcome to expense tracker!!</h1>
    </React.Fragment>)
}
export default Welcome;