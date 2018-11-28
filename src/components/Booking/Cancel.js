import React, { Component } from "react";

class Cancellation extends Component {
	constructor(props) {
		super(props) 
		this.state = {
			roomName:this.props.location.state.room.name,
			month: this.props.location.state.month,
			day: this.props.location.state.day,
			slot: this.props.location.state.slot
		} 
	}


	render(){
		const {roomName, month, day, slot} = this.state
		return (
			<div> 
				<h2>Do you want to cancel?</h2>
				<p>{roomName}: {day}.{month} -- {slot}</p>






			</div>
			)

	}

}

export default Cancellation;