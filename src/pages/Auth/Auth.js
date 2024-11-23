import React, { useRef, useState , useEffect} from "react";
import classes from "./Auth.module.css";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
import useHttp from "../../hook/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth-reducer";

//MUI
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

//components
import Toaster from "../../elements/Toaster";


const Auth = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const [isLogin, setIsLogin] = useState(true);
  // const enteredConfPassRef = useRef();
  const[ enteredEmail, setEnteredEmail] = useState('');
  const[ enteredPass, setEnteredPass] = useState('');
  const[ enteredConfPass, setEnteredConfPass] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [toasterMessage, setToasterMessage] = useState(false);
  const projectId = useSelector((state) => state.auth.projectId);

  const history = useHistory();
  const { error, sendRequest } = useHttp();
  const dispatch = useDispatch();


useEffect(()=>{
  if(projectId){
    history.replace(`/welcome/${projectId}`);
  }
},[projectId])

  const toggleAuthHandler = (event) => {
    event.preventDefault();
    setIsLogin(!isLogin);
  };

  const handleOpenSnackbar = (message) => {
    setOpenSnackbar(true);
    setToasterMessage(message);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const inputChangeHandler = (e, type)=>{
    try{
      const val = e?.target?.value
      switch (type) {
        case "email":
          setEnteredEmail(val);
          break;
        case "password":
          setEnteredPass(val);
          break;
        case "confirmPassword":
          setEnteredConfPass(val);
          break;
        default:
          break;
      }

    }catch(e){
      console.log(e);
    }
  }

  const registerUser = async(fire,email)=>{
    try{

      const resData = (response)=>{
        console.log("res==>",response?.data?.res?.id)
        dispatch(authAction.getExpenseToken(fire.data.idToken));
        dispatch(authAction.setUserEmail(response?.data?.res?.email));
        dispatch(authAction.setProjectId(response?.data?.res?.id))
        setEnteredEmail('');
        setEnteredPass('');
      }

    let payLoad = {
      firebase_uid : fire.data.localId,
      email : email
    }
      sendRequest(
        {
          request: "post",
          url: `http://localhost:8080/expense_tracker/user_login/`,
          body: payLoad,
          header : {
            Authorization: `Bearer ${fire.data.idToken}`,
            'Content-Type': 'application/json'
          }
        },
        resData
      );

    }catch(e){
      console.log(e);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if(!(enteredEmail.trim().length >  0 && enteredPass.trim().length > 0) ){
        handleOpenSnackbar("Enter email and password");
      }
      const authObj = {
        email: enteredEmail,
        password: enteredPass,
        returnSecureToken: true,
      };

      console.log("authObj==>",authObj);

      if (isLogin) {
        const resData = (res) => {
          // dispatch(authAction.getExpenseToken(res.data.idToken));
          registerUser(res,enteredEmail);
          // dispatch(authAction.setUserEmail(enteredEmail));
          // history.replace("/welcome");
          // setEnteredEmail('');
          // setEnteredPass('');
        };

        sendRequest(
          {
            request: "post",
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
            body: authObj,
            header: { "Content-Type": "application/json" },
            type : "auth"
          },
          resData
        );
      } else {
        if (
          enteredEmail.trim().length === 0 ||
          enteredPass.trim().length === 0 ||
          enteredConfPass.trim().length === 0
        ) {
          handleOpenSnackbar("All fields are mandatory");
          // alert("All fields are mandatory");
        } else if (enteredPass !== enteredConfPass) {
          handleOpenSnackbar("password does not match");
        } else if (
          enteredPass === enteredConfPass &&
          enteredEmail.trim().length > 0 &&
          enteredPass.trim().length > 0 &&
          enteredConfPass.trim().length > 0
        ) {
          const resData = (res) => {
            console.log(res);
            setEnteredEmail('');
            setEnteredPass('');
            setEnteredConfPass('');
            handleOpenSnackbar("New Account created successfully");
            setIsLogin(true);
          };

          sendRequest(
            {
              request: "post",
              url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
              body: authObj,
              header: { "Content-Type": "application/json" },
              type : "auth"
            },
            resData
          );
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(()=>{
    if(error){
      handleOpenSnackbar(error);
    }
  },[error])

  const forgetpasswordhandler = (event) => {
    event.preventDefault();
    history.push("/forget_pass");
  };
  <Route path="/forget_pass">
    <ForgetPassword />
  </Route>;

  return (
    <React.Fragment>
      {/* {error && <Alert severity="error">This is an error Alert.</Alert>} */}
    <Toaster open={openSnackbar} onClose={handleCloseSnackbar} toasterMessage = {toasterMessage}/>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          // width: "50vw",
          margin: "10% auto",
          border: "1px solid grey",
          borderRadius: "10px",
          width: {
            xs: "100vw", // 100vw for extra-small screens (mobile)
            sm: "80vw",  // 80vw for small screens (tablets)
            md: "60vw",  // 60vw for medium screens (small laptops)
            lg: "50vw",  // 50vw for large screens (desktops)
            xl: "40vw",  // 40vw for extra-large screens (large desktops)
          },
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
            <Typography variant="h3" gutterBottom>
              {isLogin ? "Login" : "Sign Up"}
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
            <FormControl
              sx={{
                width: "100%",
              }}
              variant="outlined"
            >
              <InputLabel
                required
                htmlFor="outlined-adornment-password"
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e)=>inputChangeHandler(e,'password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {!isLogin && <FormControl
              sx={{
                width: "100%",
              }}
              variant="outlined"
            >
              <InputLabel required htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e)=>inputChangeHandler(e,'confirmPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label=" Confirm Password"
              />
            </FormControl>}
          </>
          <Box
            sx={{
              "& button": { m: 0 },
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button onClick={forgetpasswordhandler} size="small">
              Forget password?
            </Button>
          </Box>
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
              onClick={submitHandler}
            >
              {" "}
              {isLogin ? "Login" : "Sign Up"}{" "}
            </Button>
          </Box>
          <Box
            sx={{
              "& button": { m: 0 },
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button onClick={toggleAuthHandler} size="small">
              {" "}
              {isLogin ? "Create new account" : "Already have account?"}
            </Button>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};
export default Auth;
