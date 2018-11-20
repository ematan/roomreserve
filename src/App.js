import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import PasswordForgetPage from "./components/PasswordForget";
import AccountPage from "./components/Account";
import BuildingList from "./components/BuildingList";

import * as routes from "./constants/routes";
//import { firebase } from "./firebase";

import withAuthentication from './components/Session/withAuth';

const App = () => 
      <Router>
        <div>
          <Navigation />
          <hr />
          <Route exact path={routes.LANDING} component={LandingPage} />
          <Route exact path={routes.SIGN_UP} component={SignUpPage} />
          <Route exact path={routes.SIGN_IN} component={SignInPage} />
          <Route
            exact
            path={routes.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route exact path={routes.ACCOUNT} component={AccountPage} />
          <Route exact path={routes.BUILDINGS} component={BuildingList} />
        </div>
      </Router>


export default withAuthentication(App);
