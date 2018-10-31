import React, {Component} from 'react';
import {db} from '../firebase';

class BuildingList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buildings: null,
		};
	}

	componentDidMount() {
		db.onceGetBuildings().then(snapshot =>
			this.setState({buildings: snapshot.val() })
		);
	}

	render() {
		const {buildings} = this.state;
		
		return(
		<div>
			<h1>Buildings</h1>
			{!!buildings && <BList buildings={buildings} /> }	
  		</div>
  		)

	}

}

const BList= ({buildings}) => 
	<div>
		{Object.keys(buildings).map(key =>
				<div key={key}>{buildings[key].name}, jonka osoite on: {buildings[key].address}</div>
		)}
	</div>



export default BuildingList;

