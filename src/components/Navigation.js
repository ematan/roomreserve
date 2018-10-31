import React from 'react'
import {Link} from 'react-router-dom';
import "./Navigation.scss";
import logo from "../img/logo.png";
import loginIcon from "../img/login.png";

import * as routes from '../constants/routes';
import SignOutButton from './SignOut';

const Navigation = ({authUser}) =>
<div id="navbar">
  {authUser ? <NavigationLoggedIn/> : <NavigationLoggedOut/>}
</div>

const NavigationLoggedIn = () =>
<div>
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={routes.BUILDINGS}>Buildings</Link>
    </li>
    <li><SignOutButton/></li>
  </ul>
</div>

const NavigationLoggedOut = () =>
<div className="navContainer">
  <ul>
    <li className="home-btn">
      <Link to={routes.LANDING}><img className="logo-icon" src={logo} alt="logo"/></Link>
    </li>
    <li className="signin-btn">
      <Link to={routes.SIGN_IN}><img className="login-icon" src={loginIcon} alt="login icon"/></Link>
    </li>
  </ul>
</div>

export default Navigation;
