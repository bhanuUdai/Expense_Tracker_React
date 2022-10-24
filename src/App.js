import React from "react";
import Header from "./Layout/Header";
import Auth from "./pages/Auth/Auth";
import Welcome from "./pages/Welcome/Welcome";
import { Switch, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import VerifyLinkSend from "./pages/Auth/VerifyLinkSend";
function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Route path="/welcome">
          <Welcome/>
        </Route>
        <Route path='/contact'>
          <Contact/>
        </Route>
        <Route path='/verifymail'>
          <VerifyEmail/>
        </Route>
        <Route path='/linksend'>
          <VerifyLinkSend/>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
