import React from "react";
//import { withRouter } from "react-router-dom";
//import { auth } from "../firebase";
import { withFirebase } from "../firebase";
//import * as routes from "../constants/routes";
import logout from "../img/logout.png";
import "./SignOut.scss";

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    <img className="logo-icon" src={logout} alt="logo" />
  </button>
);

const condition = authUser => !!authUser;

export default withFirebase(SignOutButton);

/*const SignOut = ({history}) => (
  //<button type="button" onClick={auth.doSignOut().then(()=> history.push(routes.LANDING))}>
  //  <img className="logo-icon" src={logout} alt="logo" />
  //</button>
 // <SignOutButton history={history} />
//);
/*
class SignOutButton extends Component {
  onClick = event => {
    const { history } = this.props;

    auth.doSignOut().then(() => {
      history.push(routes.LANDING);
    });
  };

  render() {
    return (
      <button type="button" onClick={this.onClick}>
        <img className="logo-icon" src={logout} alt="logo" />
      </button>
    );
  }
}

//export default withRouter(SignOut);

export { SignOutButton };*/
