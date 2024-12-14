import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

//MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloseIcon from "@mui/icons-material/Close";
import useHttp from "../../hook/useHttp";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Toaster from "../../elements/Toaster";
import Backdrop from "@mui/material/Backdrop";

import GradientCircularBar from "../../elements/GradientCircularBar";

const ContactDetails = ({ getProfileDetails }) => {
  const history = useHistory();

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toasterMessage, setToasterMessage] = useState(false);
  const location = useLocation();
  const { error, sendRequest, loading } = useHttp();

  console.log("Loading==>", loading);

  const projectId = location?.pathname?.split("/").pop();

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Only the first file is selected
    setSelectedImage(file);
    if (file) {
      setSelectedImageUrl(URL.createObjectURL(file));
    }
  };

  const imageUploadHandler = async () => {
    try {
      const resData = (res) => {
        if (!res?.data?.error) {
          handleOpenSnackbar("Profile updated successfully.");
          getProfileDetails();
        } else {
          handleOpenSnackbar("Failed to upload, please retry");
        }
      };

      const formData = new FormData();
      formData.append("image", selectedImage); // Add the image file
      formData.append("project_id", projectId); // Add project ID
      formData.append("userName", userName); // Add user name

      // Send the request with FormData. Do not manually set the Content-Type header.
      sendRequest(
        {
          request: "post",
          url: `http://localhost:8080/expense_tracker/upload_image/`,
          body: formData, // Send the FormData as the body
        },
        resData
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenSnackbar = (message) => {
    setOpenSnackbar(true);
    setToasterMessage(message);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          margin: "auto auto auto auto",
          width: "80vw",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Personal Details
        </Typography>

        <TextField
          
          fullWidth
          sx={{ m: 0 }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-button"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="upload-button">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<FileUploadIcon />}
            >
              Upload Profile Photo
            </Button>
          </label>
          {selectedImageUrl && (
            <div style={{ marginTop: 16, position: "relative" }}>
              <img
                src={selectedImageUrl}
                alt="Selected"
                style={{ width: "100%", maxWidth: "300px" }}
              />
              <CloseIcon
                sx={{
                  position: "absolute",
                  left: "289px",
                  top: "-11px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedImageUrl(null);
                  setSelectedImage(null);
                }}
              />
            </div>
          )}
        </div>
      </Box>
      {userName && (
        <Box
          sx={{
            "& button": { m: 0 },
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => {
              imageUploadHandler();
            }}
            variant="contained"
            size="large"
          >
            Submit
          </Button>
        </Box>
      )}
      <Toaster
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        toasterMessage={toasterMessage}
      />
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <GradientCircularBar />
      </Backdrop>
    </React.Fragment>
  );
};
export default ContactDetails;
