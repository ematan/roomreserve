import React, { Component } from "react";
import Page from "./Page";
import locIcon from "../img/location.png";
import numPeople from "../img/numPeople.png";
import availableIcon from "../img/available.png";

import "./Room.scss";

class Room extends Component {
  render() {
    return (
      <div className="room">
        <div className="header">
          <h1>{this.props.location.state.name}</h1>
        </div>
        <div className="roomInfo">
          <div className="line">
            <img
              className="largeIcon"
              src={numPeople}
              alt="num of people icon"
            />
            <p>{this.props.location.state.capacity}</p>
          </div>
          <div className="line">
            <img className="largeIcon" src={locIcon} alt="location icon" />
            <p>Floor {this.props.location.state.floor}</p>
          </div>
          <div className="line">
            <img
              className="largeIcon"
              src={availableIcon}
              alt="location icon"
            />
            <p>Availability</p>
          </div>
          <div className="line">
            <div className="link">
              <a href="/">Book this room</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Room;
