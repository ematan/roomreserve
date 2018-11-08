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
  }

  render() {
    const { buildings } = this.state;

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
                  <ListItemText className="liTextS" primary="#" />
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
