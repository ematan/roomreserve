import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { SignUpLink } from "./SignUp";
import { auth } from "../firebase";
import * as routes from "../constants/routes";
import cn from "classnames";

import Page from "./Page";

import "./SignIn.scss";

const SignInPage = ({ history }) => (
  <Page className="sipage">
    <div className="signInCont">
      <h1>Sign In</h1>
      <SignInForm history={history} />
      <SignUpLink />
    </div>
  </Page>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.LANDING);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit} className="signInForm">
        <input
          value={email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event =>
            this.setState(byPropKey("password", event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <button
          className={cn("btn", { disabled: isInvalid })}
          disabled={isInvalid}
          type="submit"
        >
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
