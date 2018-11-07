import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";
import logo from "../img/logo.png";
import loginIcon from "../img/login.png";
import accountIcon from "../img/account.png";

import * as routes from "../constants/routes";
import SignOutButton from "./SignOut";

const Navigation = ({ authUser }) => (
  <div id="navbar">
    {authUser ? <NavigationLoggedIn /> : <NavigationLoggedOut />}
  </div>
);

const NavigationLoggedIn = () => (
  <div className="navContainer">
    <ul>
      <li className="fl-left">
        <Link to={routes.LANDING}>
          <img className="logo-icon" src={logo} alt="logo" />
        </Link>
      </li>
      <li className="fl-right">
        <SignOutButton />
      </li>
      <li className="fl-right">
        <Link to={routes.ACCOUNT}>
          <img className="logo-icon" src={accountIcon} alt="account icon" />
        </Link>
      </li>
      <li>
        <Link to={routes.BUILDINGS}>Buildings</Link>
      </li>
    </ul>
  </div>
);

const NavigationLoggedOut = () => (
  <div className="navContainer">
    <ul>
      <li className="fl-left">
        <Link to={routes.LANDING}>
          <img className="logo-icon" src={logo} alt="logo" />
        </Link>
      </li>
      <li className="fl-right">
        <Link to={routes.SIGN_IN}>
          <img className="login-icon" src={loginIcon} alt="login icon" />
        </Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
