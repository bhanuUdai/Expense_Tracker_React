import React,{useContext, useEffect, useState} from "react";
import ExpenseContext from "../store/expense-context";
import ContactDetails from "./ContactDetails/ContactDetails";
import SavedContact from "./SavedContact/SavedContact";
import axios from "axios";
import { useSelector } from "react-redux";
import useHttp from "../hook/useHttp";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Contact =()=>
{
    const { error, sendRequest } = useHttp();
    const [contactPage,setContactPage]=useState(null)
    const token=useSelector(state=>state.auth.token)
    const expctx=useContext(ExpenseContext)
    const location = useLocation();
    const projectId = location?.pathname?.split('/').pop();

    const tokenObj = {
        idToken: token,
      };

    const resData = (res)=>{
      console.log(res);
      res = res?.data
      if(!res?.error && res?.res.length>0){
        setContactPage(res?.res)
      }else{
        setContactPage(false)
      }

    }
    
      useEffect(() => {
        async function getData() {
          try {
            let payLoad = {
              project_id :projectId
            }
            sendRequest(
              {
                request: 'get',
                url: `http://localhost:8080/expense_tracker/check_user_profile/`,
                body: payLoad,
                header: { "Content-Type": "application/json" },
              },
              resData
            );
            // try {
                
            //   console.log(res.data.users[0]);
            //     const details=res.data.users[0]
            //     expctx.userDetails({name:details.displayName,url:details.photoUrl})
            //     if(details.displayName && details.photoUrl )
            //     {
            //       setContactPage(false)
            //     }
            //     else{
            //       setContactPage(true)
            //     }
        
            // } catch (err) {
            //   console.log(err);
            // }
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
      {contactPage===false && <ContactDetails  />}
      { contactPage && <SavedContact editButton={editButtonhandler} contactPageDetails = {contactPage} />}
    </React.Fragment>)
}
export default Contact