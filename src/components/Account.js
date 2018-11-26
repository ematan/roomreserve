import React, { Component } from "react";
import Page from "./Page";

import { withFirebase } from "../firebase";
import AuthUserContext from './Session/AuthUserContext';

import "./Account.scss";

const ProfileView = ({curUser}) => (
	<Page className="profPage">
		<h1>Account</h1>
    <ul>
      <li>username: {curUser}</li>
      <li>email: </li>
    </ul>		
	</Page>

);
const ProfileView1 = ({curUser}) => (
  <div>
    <h1>Accounttttt</h1>
    <ul>
      <li>username: {curUser}</li>
      <li>email: </li>
    </ul>   
  </div>
);


class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      uid: null,
      user: null,
    };
  }

  componentDidMount() {
    this.props.firebase.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
    
    
  }


  render() {
  	
  	const { users, authUser } = this.state;
    const curUser = null
    //const { uid } = this.props.authUser.uid
    
  	if (authUser) {
      //uid = user.uid;
      const curUser = users[authUser.uid];
      //console.log(uid);
      //console.log(curUser);
  	} 
      //uid =null;
   
  
  	return(
  		<Page>
        
  			<AuthUserContext.Consumer>
      		{authUser => authUser && users
  					? <ProfileView curUser={authUser.uid} />
  					: <h1>No Access</h1>

  	  		}
  			</AuthUserContext.Consumer>
        
  		</Page>
  		//<ProfileView users={users} />


  	);
	}
}


export default withFirebase(Account);
