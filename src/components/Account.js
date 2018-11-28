import React, { Component } from "react";
import Page from "./Page";

import { withFirebase } from "../firebase";
import AuthUserContext from "./Session/AuthUserContext";

import "./Account.scss";

const ProfileView = ({ curUser }) => (
  <Page className="profPage">
    <div className="prof">
      <h1>Account</h1>
      <p>username: {curUser.username}</p>
      <p>email: {curUser.email}</p>
    </div>
  </Page>
);

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      uid: null,
      user: null
    };
  }

  componentDidMount() {
    this.props.firebase
      .onceGetUsers()
      .then(snapshot => this.setState({ users: snapshot.val() }));
  }

  render() {
    const { users, authUser } = this.state;

    return (
      <Page>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser && users ? (
              <ProfileView curUser={users[authUser.uid]} />
            ) : (
              <h1>No Access</h1>
            )
          }
        </AuthUserContext.Consumer>
      </Page>
    );
  }
}

export default withFirebase(Account);
