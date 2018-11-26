import React, { Component } from "react";
import Page from "./Page";
import { auth, db } from "../firebase";
import AuthUserContext from './Session/AuthUserContext';

/*const Account1 = () => (
	<Page>
  	<AuthUserContext.Consumer>
      {authUser => authUser 
  		? <ProfileView authUser={authUser} /> 
  		: <h1>No Access</h1>
  	  }
  	</AuthUserContext.Consumer>
  	<ul>
			<li>username: {authUser}</li>
			<li>email: {authUser.email}</li>
		</ul>
  </Page>
);
*/

const ProfileView = ({authUser, users}) => (
	<div>
		<h1>Account</h1>
		
		
	</div>
);


class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
    
  }

  render() {
  	
  	const { users } = this.state;
  	console.log(AuthUserContext)
  	console.log(users);
  	
  	console.log(AuthUserContext.Consumer);
  	return(
  		<Page>
  			<AuthUserContext.Consumer>
      		{authUser => authUser
  					? <ProfileView authUser={authUser} users={users}/> 
  					: <h1>No Access</h1>
  	  		}
  			</AuthUserContext.Consumer>
  		</Page>
  		//<ProfileView users={users} />


  	);
	}
}


export default Account;
