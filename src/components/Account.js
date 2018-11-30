import React, { Component } from "react";
import Page from "./Page";

import { withFirebase } from "../firebase";
import AuthUserContext from "./Session/AuthUserContext";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import withAuthorization from './Session/withAuthorization';

import "./Account.scss";

const jsonData = {
  slot1: "8.00 - 10:00",
  slot2: "10.00 - 12:00",
  slot3: "12.00 - 14:00",
  slot4: "14.00 - 16:00",
  slot5: "16.00 - 18:00",
  slot6: "18.00 - 20:00"
};

const ProfileView = ({ curUser, reservations }) => (
  <div>
    <h1>Account</h1>
    <p>username: {curUser.username}</p>
    <p>email: {curUser.email}</p>
  </div>
);

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      uid: null,
      user: null,
      rooms: null,
      reservations: null
    };
  }

  componentDidMount() {
    this.props.firebase
      .onceGetUsers()
      .then(snapshot => this.setState({ users: snapshot.val() }));
    this.props.firebase.onceGetRooms().then(snapshot =>
      this.setState({
        rooms: snapshot.val(),
        reservations: this.collectReservations(snapshot.val())
      })
    );
  }

  collectReservations(rooms) {
    let fullList = {};
    if (rooms) {
      Object.entries(rooms).forEach(r => {
        const reservations = r[1].reservations;

        if (reservations) {
          const roomOnly = r[1];
          delete roomOnly.reservations;
          Object.entries(reservations).forEach(m => {
            const months = m[1];
            if (months) {
              Object.entries(months).forEach(d => {
                const days = d[1];
                if (days) {
                  Object.entries(days).forEach(slot => {
                    let data = [];
                    if (!fullList[slot[1]]) {
                      fullList[slot[1]] = data;
                    }
                    const res = {
                      room: roomOnly,
                      month: m[0],
                      day: d[0],
                      slot: slot[0]
                    };
                    fullList[slot[1]].push(res);
                  });
                }
              });
            }
          });
        }
      });
    }

    return fullList;
  }

  render() {
    const { users, authUser, rooms, reservations } = this.state;
    const _this = this;
    const times = jsonData;

    return (
      <Page className="profPage">
        <AuthUserContext.Consumer>
          {authUser =>
            authUser && users && rooms ? (
              <div className="prof">
                <ProfileView curUser={users[authUser.uid]} />
                <h3>Your reservations</h3>
                {reservations &&
                  reservations[authUser.uid] &&
                  reservations[authUser.uid].map(key => (
                    <ListItem
                      key={key.room.name + key.month + key.day + key.slot}
                      component={props => (
                        <Link
                          {...props}
                          to={{
                            pathname: "/cancel",
                            state: key
                          }}
                        />
                      )}
                    >
                      <p className="rslot">
                        {key.room.name}: {key.day}.{key.month}. /{" "}
                        {times[key.slot]}
                      </p>
                    </ListItem>
                  ))}
              </div>
            ) : (
              <h1>No Access</h1>
            )
          }
        </AuthUserContext.Consumer>
      </Page>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
