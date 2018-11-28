import React, { Component } from "react";
import Page from "./Page";
import locIcon from "../img/location.png";
import numPeople from "../img/numPeople.png";
import availableIcon from "../img/available.png";
import arrowBack from "../img/arrow-back-white.png";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";

import "./Room.scss";

class Room extends Component {
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
  }

  back(e) {
    e.stopPropagation();
    this.props.history.goBack();
  }

  render() {
    const roomid = this.props.location.state.id
    const building = this.props.location.state.building
    return (
      <Page className="room">
        <div className="back">
          <button type="button" onClick={this.back}>
            <img className="arrow" src={arrowBack} alt="arrow back" />
            <p>Back</p>
          </button>
        </div>
        <div className="header">
          <h1 className="h1">{this.props.location.state.name}</h1>
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
              <a href="/calenda">Book this room</a>
              <ListItem
                  key={building + "/" + roomid}
                  button
                  component={props => (
                    <Link
                      {...props}
                      to={{
                        pathname: "/calendar/" + building + "/" + roomid, 
                        state: this.props.location.state.name
                      }}
                    />
                  )}
                >
                </ListItem>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default Room;
