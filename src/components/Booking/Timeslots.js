import React, { Component } from "react";
import { withFirebase } from "../../firebase";
import AuthUserContext from "../Session/AuthUserContext";
import Page from "../Page";
import arrowBackBlack from "../../img/arrow-back.png";
import "./Timeslots.scss";

const jsonData = {
  slots: {
    slot1: "8.00 - 10:00",
    slot2: "10.00 - 12:00",
    slot3: "12.00 - 14:00",
    slot4: "14.00 - 16:00",
    slot5: "16.00 - 18:00",
    slot6: "18.00 - 20:00"
  }
};

const jsonDataDefaults = {
  slot1: null,
  slot2: null,
  slot3: null,
  slot4: null,
  slot5: null,
  slot6: null
};

class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationDate: this.props.location.state.selectedDay,
      reservationMonth: this.props.location.state.selectedMonth,
      room: this.props.location.state.room,
      building: this.props.location.state.building,
      users: null,
      slots: null,
      buttonToggle: {
        slot1: true,
        slot2: true,
        slot3: true,
        slot4: true,
        slot5: true,
        slot6: true
      }
    };
    this.back = this.back.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  back(e) {
    e.stopPropagation();
    this.props.history.goBack();
  }

  componentDidMount() {
    const month = this.state.reservationMonth;
    const date = this.state.reservationDate;
    const room = "r-" + this.state.room;

    this.props.firebase.db
      .ref("rooms")
      .child(room)
      .child("reservations")
      .child(month)
      .child(date)
      .once("value")
      .then(snapshot => this.setState({ slots: snapshot.val() }));
  }

  onPressBack() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  checkStatus(key, user) {
    return !this.state.slots || !this.state.slots[key];
  }

  checkIfOwned(key, user) {
    return this.state.slots[key] === user.uid;
  }

  reserveSlot(status, key, value, user) {
    const month = this.state.reservationMonth;
    const date = this.state.reservationDate;
    const room = "r-" + this.state.room;
    //const user = this.props.authUser
    const uid = user.uid;
    let userDataJson = {};
    if (status) userDataJson[key] = uid;
    else userDataJson[key] = null;

    this.props.firebase.db
      .ref("rooms")
      .child(room)
      .child("reservations")
      .child(month)
      .child(date)
      .update(userDataJson);

    this.props.firebase.db
      .ref("rooms")
      .child(room)
      .child("reservations")
      .child(month)
      .child(date)
      .once("value")
      .then(snapshot => this.setState({ slots: snapshot.val() }));
  }

  handleClick(slot) {
    console.log(slot)
    const room = "r-" + this.state.room;
    const date = this.state.reservationDate;
    const month = this.state.reservationMonth;
    this.props.firebase.cancelReservation(room, month, date, slot)
    let buttonToggle = Object.assign({}, this.state.buttonToggle); 
    buttonToggle[slot] = !buttonToggle[slot];
    this.setState({buttonToggle});
  }

  renderSlots() {
    let _this = this;
    const slots = jsonData.slots;
    const arraySlots = Object.keys(slots).map(function(k) {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            authUser && _this.checkStatus(k, authUser) ? (
              <div
                key={k}
                style={{ margin: 5 }}
                onClick={status => {
                  _this.reserveSlot(status, k, slots[k], authUser);
                }}
                className="slot free"
              >
                <p>
                  <b>{slots[k]}</b>
                </p>
                <p>Reserve this slot!</p>
              </div>
            ) : (
              <div key={k} className="slot reserved">
                <p>
                  <b>{slots[k]}</b>
                </p>
                <p>
                  <b>
                    {_this.state.slots && _this.checkIfOwned(k, authUser) && _this.state.buttonToggle[k]? (
                      <span>Reserved for you <button type="button" onClick={() => _this.handleClick(k)}>Cancel</button></span>

                    ) : (
                      "Reserved"
                    )}
                  </b>
                </p>
              </div>
            )
          }
        </AuthUserContext.Consumer>
      );
    });
    return arraySlots;
  }

  render() {
    const { location } = this.props;
    return (
      <Page className="tsPage">
        <div className="backbtn">
          <button type="button" onClick={this.back}>
            <img className="arrow" src={arrowBackBlack} alt="arrow back" />
            <p>Back</p>
          </button>
        </div>
        <div>
          <br />
          <br />
          <h1>
            Available slots for {location.state.selectedDay}.
            {location.state.selectedMonth}.
          </h1>
          {this.renderSlots()}
        </div>
      </Page>
    );
  }
}

export default withFirebase(TimeSlot);
