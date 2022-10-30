import React,{useContext, useEffect, useState} from "react";
import ExpenseContext from "../store/expense-context";
import ContactDetails from "./ContactDetails/ContactDetails";
import SavedContact from "./SavedContact/SavedContact";
import axios from "axios";
import { useSelector } from "react-redux";
const Contact =()=>
{
    const [contactPage,setContactPage]=useState(null)
    const token=useSelector(state=>state.auth.token)
    const expctx=useContext(ExpenseContext)
    const tokenObj = {
        idToken: token,
      };
    
      useEffect(() => {
        async function getData() {
          try {
            const res = await axios.post(
              "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
              tokenObj,
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            try {
                
              console.log(res.data.users[0]);
                const details=res.data.users[0]
                expctx.userDetails({name:details.displayName,url:details.photoUrl})
                if(details.displayName && details.photoUrl )
                {
                  setContactPage(false)
                }
                else{
                  setContactPage(true)
                }
        
            } catch (err) {
              console.log(err);
            }
          } catch (err) {
            console.log(err);
          }
        }
        getData();
      }, []);

      const editButtonhandler=()=>
      {
        setContactPage(true)
      }


    return(<React.Fragment>
      {contactPage===true && <ContactDetails  />}
      { contactPage===false && <SavedContact editButton={editButtonhandler} />}
    </React.Fragment>)
}
export default Contact