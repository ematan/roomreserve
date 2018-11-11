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

const theme = createMuiTheme({
  typography: {
    // Making the List accept our font
    fontFamily: "Open Sans"
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
      // array with buildings and rooms that are in the buildings
      let buildingsWithRooms = buildings;
      Object.values(rooms).map(i => {
        console.log(JSON.stringify(i, null, 2));
        const building = i.building;
        if (!building || !buildingsWithRooms[building]) {
          console.log("missing building");
          console.log("building: ", building);
          console.log("keys: ", Object.keys(buildingsWithRooms));
          return buildingsWithRooms;
        }
        if (buildingsWithRooms[i.building].rooms) {
          buildingsWithRooms[i.building].rooms.push(i);
        } else {
          buildingsWithRooms[i.building].rooms = [i];
        }
        return buildingsWithRooms;
      });
      console.log(buildingsWithRooms);
    }

    return (
      <Page className="page">
        <h1>Buildings</h1>
        <MuiThemeProvider theme={theme}>
          <List dense className="list">
            {Object.keys(buildings || {}).map(key => (
              <ListItem
                key={key}
                button
                component="a"
                href={"buildings/" + key}
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
