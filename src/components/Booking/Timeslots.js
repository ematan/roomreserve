import React, { Component }from 'react';
import * as firebase from '../../firebase'
import AuthUserContext from "../Session/AuthUserContext";


const jsonData = {
	"timeslots" : {
		"slot1": "8.00 to 10:00",
		"slot2": "10.00 to 12:00",
		"slot3": "12.00 to 14:00",
		"slot4": "14.00 to 16:00",
		"slot5": "16.00 to 18:00",
		"slot6": "18.00 to 20:00"
	}
}

class TimeSlot extends Component {
	constructor(props) {
		super(props)
		this.state = {
			reservationDate: this.props.navigation.state.params.reservationDate
		}
	}

	onPressBack() {
		const { goBack } = this.props.navigation
		goBack()
	}

	reserveSlot(status, key, value) {
		const month = this.state.reservationDate.month
		const date = this.state.reservationDate.day
		const user = firebase.auth()
	}
}

export default Timeslot;