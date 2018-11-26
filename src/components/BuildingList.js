import React, { Component } from "react";
import { db } from "../firebase";
import Page from "./Page";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import buildingIcon from "../img/building.png";
import "./BuildingList.scss";
import { Link } from "react-router-dom";

const theme = createMuiTheme({
  typography: {
    // Making the List accept our font
    fontFamily: "Open Sans",
    useNextVariants: true
  }
});

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
    db.onceGetRooms().then(snapshot =>
      this.setState({ rooms: snapshot.val() })
    );
  }

  render() {
    const { buildings, rooms } = this.state;
    if (buildings && rooms) {
      // adding list of rooms to each building
      Object.values(rooms).forEach(i => {
        const building = i.building;
        if (building && buildings[building]) {
          if (buildings[i.building].rooms) {
            buildings[i.building].rooms.push(i);
          } else {
            buildings[i.building].rooms = [i];
          }
        }
      });
    }

    return (
      <Page className="bpage">
        <h1>Buildings</h1>
        <MuiThemeProvider theme={theme}>
          <List dense className="list">
            {Object.keys(buildings || {}).map(key => (
              <ListItem
                key={key}
                button
                component={props => (
                  <Link
                    {...props}
                    to={{
                      pathname: "/buildings/" + key,
                      state: buildings[key].rooms
                    }}
                  />
                )}
              >
                <Avatar alt="building" src={buildingIcon} className="avtr" />
                <ListItemText
                  className="liText"
                  primary={buildings[key].name}
                  secondary={buildings[key].address}
                />
                <ListItemSecondaryAction>
                  <ListItemText
                    className="liTextS"
                    primary={
                      buildings[key].rooms ? buildings[key].rooms.length : 0
                    }
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

export default BuildingList;
