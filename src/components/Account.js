import React, { Component } from "react";
import Page from "./Page";

import { withFirebase } from "../firebase";
import AuthUserContext from "./Session/AuthUserContext";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";


import "./Account.scss";

const jsonData = {
    "slot1": "8.00 to 10:00",
    "slot2": "10.00 to 12:00",
    "slot3": "12.00 to 14:00",
    "slot4": "14.00 to 16:00",
    "slot5": "16.00 to 18:00",
    "slot6": "18.00 to 20:00"  
}

const ProfileView = ({ curUser , reservations}) => (
  <Page className="profPage">
    <div className="prof">
      <h1>Account</h1>
      <p>username: {curUser.username}</p>
      <p>email: {curUser.email}</p>
      

    </div>
  </Page>
);

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      uid: null,
      user: null,
      rooms: null,
      reservations: null,
    };
  }

  componentDidMount() {
    this.props.firebase
      .onceGetUsers()
      .then(snapshot => this.setState({ users: snapshot.val() }));
    this.props.firebase
      .onceGetRooms()
      .then(snapshot => this.setState({ rooms: snapshot.val(), 
                                        reservations: this.collectReservations(snapshot.val())  }));
    
  }

  collectReservations(rooms) {
    let testi = "moi"
    let fullList = {}
    if (rooms) {

      Object.entries(rooms).forEach(r => {
        
        const reservations = r[1].reservations;
        
        
        if (reservations) {
          const roomOnly = r[1];
          delete roomOnly.reservations;
           
          Object.entries(reservations).forEach(m => {
            const months = m[1]
            if (months){
              
              Object.entries(months).forEach(d => {
                const days = d[1]
                
                
                if(days){
                  Object.entries(days).forEach(slot => {
                    //console.log(slot[0])
                    //if (slot[1] == authUser.uid){
                      let data = []
                      if (!fullList[slot[1]]){
                        fullList[slot[1]] = data
                      }
                      const res = {
                        room: roomOnly, 
                        month: m[0], 
                        day: d[0], 
                        slot: slot[0]
                      }
                      fullList[slot[1]].push(res)

                  })
                }
              })
            }
          
          })
            
         
        }
      });
    }
    
    console.log(fullList)
     
    
    return fullList
  }

  render() {
    const { users, authUser, rooms, reservations } = this.state;
    const _this = this
    console.log(this.state.reservations)
    const times = jsonData

    

    return (
      <Page>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser && users && rooms? (
              <div>
              <ProfileView 
                curUser={users[authUser.uid]} 
               />
                <div>
                {reservations && reservations[authUser.uid] && reservations[authUser.uid].map(key =>(
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
                        )

                      }
                    >
                      {key.room.name}:{key.day}.{key.month} -- {times[key.slot]}

                    </ListItem>





                  )
                    



                )}
                </div>
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

export default withFirebase(Account);
