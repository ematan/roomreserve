import React from "react";
import { auth } from "../firebase";
import logout from "../img/logout.png";
import "./SignOut.scss";

const SignOut = () => (
  <button type="button" onClick={auth.doSignOut}>
    <img className="logo-icon" src={logout} alt="logo" />
  </button>
);

export default SignOut;
