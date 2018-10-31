import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Page.scss";

class Page extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="page">
        {this.props.children}
      </div>
  )}
}

export default Page;
