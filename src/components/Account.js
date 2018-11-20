import React from "react";
import Page from "./Page";

const Account = ({authUser}) => (
  <Page>
  	{authUser 
  		? <h1>Account</h1> 
  		: <h1>No Access</h1>
  	}
  </Page>
);

export default Account;
