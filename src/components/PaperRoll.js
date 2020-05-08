"use strict";

import React from "react";
import "./PaperRoll.css";

export default class PaperRoll extends React.Component {
  constructor(props) {
    super(props);
    this.intervalId = null;
    this.state = {
      className: "",
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.state.className === "") this.setState({ className: "switch" });
      else this.setState({ className: "" });
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <section className="section kt_paper_roll">
        <div id="ui" className={this.state.className}>
          <div className="roll">
            <div className="body"></div>
            <div className="side"></div>
            <div className="front">
              <div className="jiguzagu_wrapper">
                <div className="jiguzagu"></div>
                <div className="jiguzagu"></div>
                <div className="jiguzagu"></div>
                <div className="jiguzagu"></div>
                <div className="jiguzagu"></div>
              </div>
            </div>
            <div className="drop_paper_wrapper">
              <div className="drop_paper">
                <div className="jiguzagu_wrapper top">
                  <div className="jiguzagu"></div>
                  <div className="jiguzagu"></div>
                  <div className="jiguzagu"></div>
                  <div className="jiguzagu"></div>
                  <div className="jiguzagu"></div>
                </div>
                <div className="jiguzagu_wrapper bottom">
                  <div className="jiguzagu"></div>
                  <div className="jiguzagu"></div>
                  <div className="jiguzagu"></div>
                  <div className="jiguzagu"></div>
                  <div className="jiguzagu"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
