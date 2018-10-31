import React, {Component} from 'react';
import "./LandingPage.scss";
import logo from "../img/logo.png";
import Page from "./Page";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
    this.calcNavHeight = this.calcNavHeight.bind(this);
  }

  componentDidMount() {
    this.calcNavHeight();
  }

  calcNavHeight() {
    const nav = document.getElementById("navbar");
    const winHeight = document.documentElement.clientHeight;
    // height of image - navheight
    if(nav) this.setState({ height: winHeight - nav.offsetHeight - 40 })
  }

  render() {
    return (
      <Page>
        <div className="frontpage" style={{height: this.state.height}}>
          <img className="logo" src={logo} alt="logo"/>
          <div className="link">
            <a href="/">See the buildings</a>
          </div>
        </div>
      </Page>
  )}
}

export default LandingPage;
