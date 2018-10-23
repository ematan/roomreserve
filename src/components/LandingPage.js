import React, {Component} from 'react';
import "./LandingPage.scss";
import image from "../img/logo.png";

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
    // height of image
    if(nav) this.setState({ height: winHeight - nav.offsetHeight })
  }

  render() {
    return (
      <div className="frontpage" style={{height: this.state.height}}>
        <img className="logo" src={image} alt="logo"/>
        <div className="link">
          <a href="/">See the buildings</a>
        </div>
      </div>
  )}
}

export default LandingPage;
