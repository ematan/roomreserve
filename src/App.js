import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import PasswordForgetPage from "./components/PasswordForget";
import Account from "./components/Account";
import BuildingList from "./components/BuildingList";
import RoomList from "./components/RoomList";
import Room from "./components/Room";
import Calendar from "./components/Booking/Calendar";
import TimeSlot from "./components/Booking/Timeslots";
import Cancellation from "./components/Booking/Cancel";

import * as routes from "./constants/routes";
//import { firebase } from "./firebase";

import withAuthentication from "./components/Session/withAuth";

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={routes.LANDING} component={LandingPage} />
      <Route exact path={routes.SIGN_UP} component={SignUpPage} />
      <Route exact path={routes.SIGN_IN} component={SignInPage} />
      <Route
        exact
        path={routes.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={routes.ACCOUNT} component={Account} />
      <Route exact path={routes.BUILDINGS} component={BuildingList} />
      <Route exact path={routes.BUILDING_ROOMS} component={RoomList} />
      <Route exact path={routes.ROOM} component={Room} />
      <Route exact path={routes.CALENDAR} component={Calendar} />
      <Route exact path={routes.SLOTS} component={TimeSlot} />
      <Route exact path={routes.CANCEL} component={Cancellation} />
    </div>
  </Router>
);

export default withAuthentication(App);
