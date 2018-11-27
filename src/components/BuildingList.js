import React, { Component } from "react";
import { withFirebase } from "../firebase";
import Page from "./Page";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import buildingIcon from "../img/building.png";
import filterIcon from "../img/filter.png";
import "./BuildingList.scss";
import { Link } from "react-router-dom";
import Popper from "@material-ui/core/Popper";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/lab/Slider";

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
      buildings: null,
      open: false,
      anchorEl: null,
      size: 2,
      floor: 12
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFloorChange = this.handleFloorChange.bind(this);
  }

  componentDidMount() {
    this.props.firebase
      .onceGetBuildings()
      .then(snapshot => this.setState({ buildings: snapshot.val() }));
    this.props.firebase
      .onceGetRooms()
      .then(snapshot => this.setState({ rooms: snapshot.val() }));
  }

  handleClick(event) {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open
    }));
  }

  handleChange(event, value) {
    this.setState({ size: value });
  }

  handleFloorChange(event, value) {
    this.setState({ floor: value });
  }

  static containsRooms = (floormax, capacityMin) => address => {
    const rooms = address.rooms || [];
    const filtered = rooms.filter(
      room => room.capacity >= capacityMin && room.floor <= floormax
    );
    if (filtered.length > 0) {
      return Object.assign({}, address, { rooms: filtered });
    }
    return false;
  };

  render() {
    const { buildings, rooms, anchorEl, open, size, floor } = this.state;
    const id = open ? "simple-popper" : null;
    if (buildings && rooms && !buildings["b-001"].rooms) {
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

    const reducedBuildings = buildings
      ? Object.entries(buildings).reduce((acc, cur) => {
          const filtered = BuildingList.containsRooms(floor, size)(cur[1]);
          if (filtered) {
            return Object.assign(acc, { [cur[0]]: filtered });
          }
          return acc;
        }, {})
      : {};

    return (
      <Page className="bpage">
        <div>
          <Button className="filterbtn" onClick={this.handleClick}>
            <img src={filterIcon} className="filter" alt="filter icon" />
          </Button>
          <MuiThemeProvider theme={theme}>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <div className="popperContent">
                      <p>Min room size: {size}</p>
                      <Slider
                        value={size}
                        min={2}
                        max={19}
                        step={1}
                        onChange={this.handleChange}
                      />
                      <p>Max floor: {floor}</p>
                      <Slider
                        value={floor}
                        min={0}
                        max={12}
                        step={1}
                        onChange={this.handleFloorChange}
                      />
                      <Button className="filterbtn" onClick={this.handleClick}>
                        Done
                      </Button>
                    </div>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </MuiThemeProvider>
        </div>
        <h1>Buildings</h1>
        <MuiThemeProvider theme={theme}>
          <List dense className="list">
            {Object.keys(reducedBuildings || {}).map(key => (
              <ListItem
                key={key}
                button
                component={props => (
                  <Link
                    {...props}
                    to={{
                      pathname: "/buildings/" + key,
                      state: reducedBuildings[key].rooms
                    }}
                  />
                )}
              >
                <Avatar alt="building" src={buildingIcon} className="avtr" />
                <ListItemText
                  className="liText"
                  primary={reducedBuildings[key].name}
                  secondary={reducedBuildings[key].address}
                />
                <ListItemSecondaryAction>
                  <ListItemText
                    className="liTextS"
                    primary={
                      reducedBuildings[key].rooms
                        ? reducedBuildings[key].rooms.length
                        : 0
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

export default withFirebase(BuildingList);
