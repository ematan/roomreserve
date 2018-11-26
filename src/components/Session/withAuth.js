import React from "react";
import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';

const withAuth = (Component) => 
	class WithAuth extends React.Component {
		constructor(props) {
		    super(props);

		    this.state = {
		      authUser: null,
		    };
		}

		componentDidMount() {
		    this.listener = firebase.auth.onAuthStateChanged(authUser => {
		      authUser
		        ? this.setState({ authUser })
		        : this.setState({ authUser: null });
		    });
		}

		componentWillUnmount() {
		    this.listener();
		}

		render() {
			const { authUser } = this.state;
			//console.log(authUser);
			return (
				<AuthUserContext.Provider value={authUser}>
					<Component {...this.props} />
				</AuthUserContext.Provider>
			);
		}
	}



export default withAuth;