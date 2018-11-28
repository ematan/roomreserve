import React, { Component } from "react";
import { withFirebase } from "../../firebase";

class Cancellation extends Component {
	constructor(props) {
		super(props) 
		this.state = {
			room:this.props.location.state.room,
			roomId: "r-" + this.props.location.state.room.id,
			month: this.props.location.state.month,
			day: this.props.location.state.day,
			slot: this.props.location.state.slot,
			status:false
			

		} 
	}
	isReserved(){
		let status = this.props.firebase.db.ref("rooms")
		.child(this.state.roomId)
		.child(this.state.month)
		.child(this.state.day)
		.child(this.state.slot).once("value").then(snapshot => status=snapshot.val())
		console.log(status)
		return status
	}
	

	cancelReservation(){
		console.log("kliksuti")
		if(this.state.room && this.isReserved()){
			console.log("kliksutinnnn")
			this.props
			.firebase
			.cancelReservation(this.state.roomId, this.state.month, this.state.day, this.state.slot)

			this.state.status=true
		}
	}

	render(){
		const {room, month, day, slot} = this.state
		const _this = this
		return (
			<div> 
				<h2>Do you want to cancel?</h2>

				<div onClick={(t) => _this.cancelReservation()}>
				{this.isReserved
					?<p>{room.name}: {day}.{month} -- {slot}</p>
				    :<p>The resrvation was cancelled.</p>
				}
				</div>
			</div>
			)

	}

}

export default withFirebase(Cancellation);