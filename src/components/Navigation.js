import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";
import logo from "../img/logo.png";
import loginIcon from "../img/login.png";
import accountIcon from "../img/account.png";
import buildingIcon from "../img/building.png";

import * as routes from "../constants/routes";
import SignOutButton from "./SignOut";

import AuthUserContext from "./Session/AuthUserContext";

const Navigation = () => (
  <div id="navbar">
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationLoggedIn /> : <NavigationLoggedOut />
      }
    </AuthUserContext.Consumer>
  </div>
);


/*const Navigation = ({authUser}) => (
  <div id="navbar">
   
      {authUser 
        ? <NavigationLoggedIn /> 
        : <NavigationLoggedOut />
      }

  </div>
);*/

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
      <li className="fl-right">
        <Link to={routes.BUILDINGS}>
          <img className="logo-icon" src={buildingIcon} alt="building icon" />
        </Link>
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
