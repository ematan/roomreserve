import React from "react";
import AuthUserContext from './AuthUserContext';
import { withFirebase } from '../../firebase';

const withAuth = (Component) => {
	class WithAuth extends React.Component {
		constructor(props) {
		    super(props);

		    this.state = {
		      authUser: JSON.parse(localStorage.getItem('authUser')),
		    };
		}

		componentDidMount() {
		    this.listener = this.props.firebase.onAuthUserListener(
		    	authUser => {
		    		localStorage.setItem('authUser', JSON.stringify(authUser));
          	this.setState({ authUser});
        	},
        	() => {
          localStorage.removeItem('authUser');
          	this.setState({ authUser: null });
        	},
		    );
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
	return withFirebase(WithAuth);
};



export default withAuth;