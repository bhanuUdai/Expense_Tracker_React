import React from "react";
import classes from './Welcome.module.css';
import { NavLink } from "react-router-dom";
const Welcome=()=>
{
    return(<React.Fragment>
        <main className={classes.main}>
        <h1 className={classes.heading} >Welcome to expense tracker!!</h1>
        <div>
            <span>Your profile is incomplete. </span>
            <NavLink className={classes.link} to='/contact'>Complete now</NavLink>
        </div>
        <div>
            <span>Have you verified your Email ? if not click </span>
            <NavLink className={classes.link} to='/verifymail'>here</NavLink>
        </div>
        </main>
    </React.Fragment>)
}
export default Welcome;