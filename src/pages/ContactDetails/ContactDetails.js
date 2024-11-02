import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

//MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';

const ContactDetails = () => {
  const history = useHistory();

  const [selectedImage, setSelectedImage] = useState(null);
  const [userName, setUserName] = useState("");

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Only the first file is selected
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const detailSubmithandler = async (event) => {
    event.preventDefault();
    try {
      const userProfile = ""

      const contactObj = {
        idToken: localStorage.getItem("ExpenseToken"),
        displayName: userName,
        photoUrl: userProfile,
        returnSecureToken: true,
      };

      if (userName.trim().length > 0 && userProfile.trim().length > 0) {
        const res = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
          contactObj,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        try {
          console.log(res);
          // userNameRef.current.value = "";
          // userProfileUrlRef.current.value = "";
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Fill all the fields");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.push("/welcome");
  };

  return (
    <React.Fragment>
      {/* <form>
        <h4>Contact Details</h4>
        <label htmlFor="name">Full Name</label>
        <input  ref={userNameRef} type="text" id="name"></input>
        <label htmlFor="url_">Profile Photo URL</label>
        <input  ref={userProfileUrlRef} type="url" id="url_"></input>
        <div className={classes.button_div}>
          <button onClick={detailSubmithandler} className={classes.update_btn}>update</button>
          <button onClick={cancelHandler} className={classes.cancel_button}>cancel</button>
        </div>
      </form> */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          margin: "80px auto auto auto",
          width: "80vw",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Personal Details
        </Typography>

        <TextField
          l
          fullWidth
          sx={{ m: 0 }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e)=>{
            setUserName(e.target.value)
          }}
          value={userName}
        />
        <div style={{
          width : "100%",
          display : "flex",
          flexDirection : "column"
        }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-button"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="upload-button">
            <Button variant="contained" color="primary" component="span" startIcon={<FileUploadIcon />}>
              Upload Profile Photo
            </Button>
          </label>
          {selectedImage && (
            <div style={{ marginTop: 16,  position : "relative" }}>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ width: "100%", maxWidth: "300px" }}
              />
              <CloseIcon sx={{
                position : "absolute",
                left : "289px",
                top : "-11px",
                cursor : 'pointer'
              }}
              onClick = {()=>{
                setSelectedImage(null);
              }}
              />
            </div>
          )}
        </div>
      </Box>
  {userName && <Box
          sx={{
            "& button": { m: 0 },
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button  variant="contained" size="large">
            Submit
          </Button>
        </Box>}
    </React.Fragment>
  );
};
export default ContactDetails;
