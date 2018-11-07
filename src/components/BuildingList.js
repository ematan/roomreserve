import React, { Component } from "react";
import { db } from "../firebase";
import Page from "./Page";

class BuildingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: null
    };
  }

  componentDidMount() {
    db.onceGetBuildings().then(snapshot =>
      this.setState({ buildings: snapshot.val() })
    );
  }

  render() {
    const { buildings } = this.state;

    return (
      <Page>
        <h1>Buildings</h1>
        {!!buildings && <BList buildings={buildings} />}
      </Page>
    );
  }
}

const BList = ({ buildings }) => (
  <ul>
    {Object.keys(buildings).map(key => (
      <li key={key}>
        {buildings[key].name}, jonka osoite on: {buildings[key].address}
      </li>
    ))}
  </ul>
);

export default BuildingList;
