import React from "react";
import Page from "./Page";
import AuthUserContext from './Session/AuthUserContext';

const Account = () => (
	<Page>
  	<AuthUserContext.Consumer>
      {authUser => authUser 
  		? <h1>Account: {authUser.email}</h1> 
  		: <h1>No Access</h1>
  	  }
  	</AuthUserContext.Consumer>
  </Page>
);

export default Account;
