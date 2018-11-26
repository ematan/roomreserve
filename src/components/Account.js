import React from "react";
import Page from "./Page";
import AuthUserContext from "./Session/AuthUserContext";
import "./Account.scss";

const Account = () => (
  <Page className="profPage">
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <h1>{authUser.email}</h1> : <h1>No Access</h1>)}
    </AuthUserContext.Consumer>
  </Page>
);

export default Account;
