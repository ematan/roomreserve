import React, { Component } from "react";
import { Calendar } from 'react-native-calendars';

class Cal extends Component {
	constructor(proReps) {
		super(props)


	}

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

	render() {
		return (
			<Page>
				<Calendar
					onDayPress = { this.onDayPress }
					hideExtraDays
					//markedDates = {{[this.state.selected]: {selected: true}}}

				/>
			</Page>
		);
	}
}

export default Cal;