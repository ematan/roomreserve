import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { SignUpLink } from "./SignUp";
import { withFirebase } from "../firebase";
import * as routes from "../constants/routes";
import cn from "classnames";

import Page from "./Page";

import "./SignIn.scss";

const SignInPage = ({ history }) => (
  <Page className="sipage">
    <div className="signInCont">
      <h1>Sign In</h1>
      <SignInForm /*history={history}*/ />
      <SignUpLink />
    </div>
  </Page>
);

/*const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});*/


const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    //const { history } = this.props;

    //auth
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(routes.LANDING);
      })
      .catch(error => {
        this.setState({error});
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit} className="signInForm">
        <input
          value={email}
          name="email"
          /*onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }*/
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          name="password"
          /*onChange={event =>
            this.setState(byPropKey("password", event.target.value))
          */
          onChange={this.onChange}
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

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };
