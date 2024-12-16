import React, {useEffect, useState} from "react";
import { Box, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./Welcome.css"; 
import { useLocation, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useHttp from "../../hook/useHttp";
import Backdrop from "@mui/material/Backdrop";
import GradientCircularBar from "../../elements/GradientCircularBar";
import dummyProfile from "../../assets/images/userProfile.svg"




const Welcome = () => {
  const location = useLocation();
const history = useHistory();
const projectId = location.pathname.split('/').pop();
const { error, sendRequest, loading } = useHttp();
const [userDetails, setUserDetails] = useState([]);


const resData = (res)=>{
  res = res?.data
  if(!res?.error && res?.res.length>0){
    setUserDetails(res?.res)
  }else{
    setUserDetails(false)
  }
}

const getProfileDetails = () =>{
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
  } catch (err) {
    console.log(err);
  }
}

useEffect(()=>{
  getProfileDetails();
},[])
  return (
    <React.Fragment>
      <Box
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1723095469034-c3cf31e32730?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" gutterBottom color="white" fontWeight="bold" marginTop="20px">
          Welcome to Expense Tracker
        </Typography>
        <Typography variant="h4" gutterBottom color="white" fontWeight="bold">
          Track Your Spending. Master Your Money
        </Typography>
           {/* <h1 className="shiny-text">
          Welcome to Expense Tracker
        </h1>
        <h1 className="shiny-text">
          Track Your Spending. Master Your Money
        </h1> */}
        <Paper
          sx={{
            width: "25vw",
            height: "25vh",
            background: "transparent",
            position: "relative",
            marginTop: "15%",
          }}
          elevation={0}
        >
          <div className="profile-container">
            <img
              className="profile-image"
              src={(userDetails && userDetails.length > 0) ? userDetails?.[0]?.profile_photo : dummyProfile }
              alt="profile"
            />
            <EditIcon
              onClick = {()=>{
                history.push(`/contact/${projectId}`)
              }}
             className="edit-icon" />
          </div>
        </Paper>
      </Box>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <GradientCircularBar />
      </Backdrop>
    </React.Fragment>
  );
};

export default Welcome;
