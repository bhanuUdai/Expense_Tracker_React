import React from "react";
import Header from "./Layout/Header";
import Auth from "./pages/Auth/Auth";
import Welcome from "./pages/Welcome/Welcome";
import ContactDetails from "./pages/ContactDetails/ContactDetails";
import { Switch, Route } from "react-router-dom";
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
          <ContactDetails/>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
