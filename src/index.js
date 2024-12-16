import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ContextProvier from "./store/ContextProvider";
import { Provider } from "react-redux";
import store from "./store/index";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <BrowserRouter>
      <Provider store={store}>
        <ContextProvier>
          {/* <ThemeProvider theme={theme} > */}
          <App />
          {/* </ThemeProvider> */}
        </ContextProvier>
      </Provider>
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
