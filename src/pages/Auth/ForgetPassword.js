import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hook/useHttp";

//MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

//components
import Toaster from "../../elements/Toaster";

const ForgetPassword = () => {
  const { error, sendRequest } = useHttp();
  const enteredEmailRef = useRef();
  const[ enteredEmail, setEnteredEmail] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const history = useHistory();

  const handleOpenSnackbar = (message) => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };



  const changePasshandler = async (event) => {
    event.preventDefault();
    if(enteredEmail.trim().length === 0){
      handleOpenSnackbar();
      return;
    }
    const passObj = {
      requestType: "PASSWORD_RESET",
      email: enteredEmail,
    };
    try {
      const resdata = () => {
        alert("Password reset link successfully send to your given email");
        history.replace("/");
      };

      sendRequest(
        {
          request:'post',
          url: "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
          body: passObj,
          header: { "Content-Type": "application/json" },
        },
        resdata
      );
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };


  const inputChangeHandler = (e, type)=>{
    try{
      const val = e?.target?.value
      switch (type) {
        case "email":
          setEnteredEmail(val);
          break;
        default:
          break;
      }

    }catch(e){
      console.log(e);
    }
  }

  return (
    <>
      <Toaster open={openSnackbar} onClose={handleCloseSnackbar} toasterMessage = {"Enter email"} />
      <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "50vw",
          margin: "10% auto",
          border: "1px solid grey",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            width: "50%",
            padding: "0% , 50%",
            margin: "10% auto",
          }}
        >
          <>
            <Typography variant="h6" gutterBottom>
            Enter the registered email.
            </Typography>
          </>
          <>
            <TextField
              required
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e)=>inputChangeHandler(e,'email')}
              sx={{
                width: "100%",
              }}
            />
          </>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Button
              sx={{
                width: "100%",
              }}
              variant="contained"
              onClick={changePasshandler}
            >
              {" "}
              Submit
            </Button>
          </Box>
  
        </Box>
      </Box>
      </>
    </>
  );
};
export default ForgetPassword;
