import React, { Component } from "react";
import Page from "../Page";
import { withFirebase } from "../../firebase";
import "./Cancel.scss";
import cn from "classnames";

class Cancellation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: this.props.location.state.room,
      roomId: "r-" + this.props.location.state.room.id,
      month: this.props.location.state.month,
      day: this.props.location.state.day,
      slot: this.props.location.state.slot,
      status: false
    };
  }
  isReserved() {
    let status = this.props.firebase.db
      .ref("rooms")
      .child(this.state.roomId)
      .child(this.state.month)
      .child(this.state.day)
      .child(this.state.slot)
      .once("value")
      .then(snapshot => (status = snapshot.val()));
    return status;
  }

  cancelReservation() {
    if (this.state.room && this.isReserved()) {
      this.props.firebase
        .cancelReservation(
          this.state.roomId,
          this.state.month,
          this.state.day,
          this.state.slot
        )
        .then(() => {
          this.setState({ status: true });
          this.props.history.push("/account");
        });
    }
  }

  render() {
    const { room, month, day, slot } = this.state;
    const _this = this;
    const jsonData = {
      slot1: "8.00 - 10:00",
      slot2: "10.00 - 12:00",
      slot3: "12.00 - 14:00",
      slot4: "14.00 - 16:00",
      slot5: "16.00 - 18:00",
      slot6: "18.00 - 20:00"
    };

    return (
      <Page className="cancelPage">
        <div className="container">
          <h2>Do you want to cancel?</h2>
          <p>
            {room.name}: {day}.{month} / {jsonData[slot]}
          </p>
          <button
            className={cn("btn", { disabled: !this.isReserved })}
            onClick={() => _this.cancelReservation()}
          >
            {this.isReserved ? (
              <p>Cancel this reservation</p>
            ) : (
              <p>The resrvation was cancelled.</p>
            )}
          </button>
        </div>
      </Page>
    );
  }
}

export default withFirebase(Cancellation);
