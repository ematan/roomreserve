import React, {Component} from 'react';
import "./Frontpage.scss";
import image from "./img/logo.png";

class Frontpage extends Component {
  render() {
    return (<div className="frontpage">
      <img className="logo" src={image} alt="logo"/>
      <div className="link">
        <a href="/">See the buildings</a>
      </div>
    </div>)
  }
}

export default Frontpage;
