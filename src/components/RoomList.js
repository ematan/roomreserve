import React, { Component } from "react";
import Page from "./Page";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import roomIcon from "../img/room.png";
import { db } from "../firebase";
import { Link } from "react-router-dom";

import "./RoomList.scss";

const theme = createMuiTheme({
  typography: {
    // Making the List accept our font
    fontFamily: "Open Sans",
    useNextVariants: true
  }
});

class RoomList extends Component {
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
    const { location, match } = this.props;
    return (
      <Page className="rpage">
        <h1 className="h1">
          {this.state.buildings &&
            this.state.buildings[match.params.buildingid].name}
        </h1>
        <p className="address">
          {this.state.buildings &&
            this.state.buildings[match.params.buildingid].address}
        </p>
        <MuiThemeProvider theme={theme}>
          <List dense className="list">
            {location.state &&
              location.state.map(key => (
                <ListItem
                  key={key.name + key.building}
                  button
                  component={props => (
                    <Link
                      {...props}
                      to={{
                        pathname:
                          "/buildings/" +
                          match.params.buildingid +
                          "/" +
                          key.id,
                        state: key
                      }}
                    />
                  )}
                >
                  <Avatar alt="room icon" src={roomIcon} className="avtr" />
                  <ListItemText
                    className="liText"
                    primary={key.name}
                    secondary={key.floor + ". floor"}
                  />
                  <ListItemSecondaryAction>
                    <ListItemText
                      className="liTextS"
                      primary={" \u2441  " + key.capacity}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </MuiThemeProvider>
      </Page>
    );
  }
}

export default RoomList;
