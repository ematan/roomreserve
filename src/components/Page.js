import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Page.scss";
import cn from "classnames";

class Page extends Component {
  static propTypes = {
    children: PropTypes.node,
    centered: PropTypes.bool,
    className: PropTypes.string
  };

  render() {
    return (
      <div className={cn("pageLayout", this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
