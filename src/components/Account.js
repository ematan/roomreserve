import React from "react";
import Page from "./Page";
import AuthUserContext from './Session/AuthUserContext';

const Account = () => (
  	<AuthUserContext.Consumer>
      {authUser => authUser 
  		? <Page><h1>Account</h1></Page> 
  		: <Page><h1>No Access</h1></Page> 
  	  }
  	</AuthUserContext.Consumer>
);

export default Account;
