import React, { Component }from 'react';
import { withFirebase } from '../../firebase'
import AuthUserContext from "../Session/AuthUserContext";
import dateFns from "date-fns";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


const jsonData = {
	"slots" : {
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
			reservationDate: this.props.location.state.selectedDay,
			reservationMonth: this.props.location.state.selectedMonth,
			room:this.props.location.state.room,
			building: this.props.location.state.building,
			users: null,
			slots: null,
			
			
		}
	}

	componentDidMount() {
		const month = this.state.reservationMonth
		const date = this.state.reservationDate
		const room = "r-" + this.state.room
		
		this.props.firebase.db.ref('rooms').child(room)
		.child("reservations")
		.child(month)
		.child(date)
		.once("value")
		.then(snapshot => this.setState({slots:snapshot.val()}));
  }

	

	onPressBack() {
		const { goBack } = this.props.navigation
		goBack()
	}

	checkStatus(key,user){
		return !this.state.slots[key]

		
	}

	reserveSlot(status, key, value, user) {
		const month = this.state.reservationMonth
		const date = this.state.reservationDate
		const room = "r-" + this.state.room
		//const user = this.props.authUser
		const uid = user.uid
		let userDataJson = {}
		if(status)
			userDataJson[key] = uid
		else
			userDataJson[key] = null

		this.props.firebase.db.ref('rooms').child(room)
		.child("reservations")
		.child(month)
		.child(date)
		.update(userDataJson)
	}

	renderSlots() {
		let _this = this
		const slots = jsonData.slots
		const arraySlots = Object.keys(slots).map( function(k) {
      return (
      	<AuthUserContext.Consumer>
      	{authUser => authUser && _this.state.slots && _this.checkStatus(k, authUser) 
      	 ? (<div key={k} style={{margin:5}}>
      	{k} : {slots[k]}
        <div
        	onClick={(status) => {
        		console.log("Click!");
        		_this.reserveSlot(status,k,slots[k], authUser) }} 
        >	
          "Varaa tästä!"
        </div>
      	
        </div>)
      	 :<div> Errorteksti tai varattu jo </div>
        }
    	</AuthUserContext.Consumer>
      )
    });
		return arraySlots;
	}

	render() {
		return (
    	<div>
    	 
    	
		    	
		    	<div>
		    	<h1>MOI</h1>
		    	<button onClick= {() => this.onPressBack()} 
		    	  text="return" />
		    	{ this.renderSlots() }</div>

    		
    	</div>
    );

	}
}

export default withFirebase(TimeSlot);