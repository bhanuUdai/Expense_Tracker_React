import axios from "axios";
import React, { useContext } from "react";
import ExpenseContext from "../../store/expense-context";
import { useHistory } from "react-router-dom";
import classes from "./VerifyEmail.module.css"
const VerifyEmail=()=>
{
    const expctx=useContext(ExpenseContext);
    const history=useHistory()
    const verifyMailHandler=async(event)=>
    {
        event.preventDefault();
        try{


            const verifyObj={
                requestType:'VERIFY_EMAIL',
                idToken:expctx.ExpenseToken
            }

        let res =await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY',verifyObj,{
            headers:{'Content-Type': 'X-Firebase'-'Locale',
            }
        })
        try{
            console.log(res)
            history.push('/linksend')
        }
        catch(err)
        {
            console.log(err)
            alert('Something Went wrong.Try to relogin your account')
        }
        }
        catch(err)
        {
            console.log(err)
            alert('Something Went wrong.Try to relogin your account')
        }
    }


    return(<React.Fragment>
        <form>
            <h2>Verify your email</h2>
            <button className={classes.verify_button} onClick={verifyMailHandler}>Click here</button>
        </form>
    </React.Fragment>)
}
export default VerifyEmail