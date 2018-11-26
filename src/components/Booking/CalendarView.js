import React, { Component } from "react";
import { Calendar } from 'react-native-calendars';

class Cal extends Component {
	constructor(props) {
		super(props)
		this.state = {};
	    //this.onDayPress = this.onDayPress.bind(this);

	}
/*
	onDayPress(day) {
		this.setState({
			selected: day.dateString
		});
		this.props.navigation
			.navigate('Timeslot', { reservationDate : day })
	}

	onPressBack(){
		const { goBack } = this.props.navigation
		goBack()
	}
*/
	render() {
		return (
			<div>
			Moi
				<Calendar
					//onDayPress = { this.onDayPress }
					hideExtraDays
					//markedDates = {{[this.state.selected]: {selected: true}}}

				/>
			</div>
		);
	}
}

export default Cal;