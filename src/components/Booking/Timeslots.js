import React, { Component }from 'react';
import { withFirebase } from '../../firebase'
import AuthUserContext from "../Session/AuthUserContext";
import dateFns from "date-fns";


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
			reservationDate: this.props.navigation.state.params.reservationDate,
			key: 1
		}
	}

	onPressBack() {
		const { goBack } = this.props.navigation
		goBack()
	}

	reserveSlot(status, key, value) {
		const month = this.state.reservationDate.month
		const date = this.state.reservationDate.day
		const user = this.props.authUser
		const uid = user.uid
		let userDataJson = {}
		if(status)
			userDataJson[key] = uid
		else
			userDataJson[key] = null

		this.props.firebase.db.ref('users').child(uid)
		.child("reservations")
		.child(month)
		.child(date)
		.update(userDataJson)
	}

	render() {
		let _this = this
		const slots = jsonData.slots
		const arraySlots = Object.keys(slots).map( function(k) {
      return (  
      	<div key={k} style={{margin:5}}>
          <button onPress={(status) => _this.reserveslot(status,k,slots[k]) } text={slots[k]} />
        </div>
      )
    });

    return (
    	<div>
    	MOI
    	<button onPress= {() => this.onPressBack()} text="return" />
    	<div>{ arraySlots }</div>
    	</div>
    );

	}
}

export default TimeSlot;