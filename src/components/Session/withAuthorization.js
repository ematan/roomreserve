import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../../firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
	class WithAuthorization extends Component {
		componentDidMount() {
			this.listener = this.props.firebase.auth.onAuthStateChanged(
				authUser =>{
					if(!condition(authUser)) {
						this.props.history.push(ROUTES.LANDING);
					}
				},
				);
		}

		componentWillUnmount() {
			this.listener();
		}

		render() {
			return (<Component {...this.props} />);
		}
	}
	return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;