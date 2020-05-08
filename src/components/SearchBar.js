"use strict";

import React from "react";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      ada: false,
      unisex: false,
      changingTable: false,
    };
  }

  handleInputValueChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  getFilterBtnClass(filter) {
    let className = "button";

    if (filter === "ada" && this.state.ada) className += " is-info";

    if (filter === "unisex" && this.state.unisex) className += " is-info";

    if (filter === "changingTable" && this.state.changingTable)
      className += " is-info";

    return className;
  }

  toggleFilter(filter) {
    if (filter === "ada") this.setState({ ada: !this.state.ada });
    if (filter === "unisex") this.setState({ unisex: !this.state.unisex });
    if (filter === "changingTable")
      this.setState({ changingTable: !this.state.changingTable });
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-three-fifths is-offset-one-fifth">
              <div className="box">
                <div className="field is-grouped">
                  <div className="control is-expanded">
                    <input
                      className="input"
                      type="text"
                      placeholder="Find your restroom..."
                      required="required"
                      onChange={(e) => this.handleInputValueChange(e)}
                      onKeyUp={(e) =>
                        e.keyCode === 13 &&
                        this.props.searchHandler("TEXT", { ...this.state })
                      }
                    />
                  </div>

                  <div className="control">
                    <button
                      className="button is-info"
                      disabled={this.props.isLoading}
                      onClick={(e) =>
                        this.props.searchHandler("TEXT", { ...this.state })
                      }
                    >
                      <span className="tooltiptext">Search</span>
                      <i className="fas fa-search"></i>
                    </button>
                  </div>

                  <div className="control">
                    <button
                      className="button is-info"
                      disabled={this.props.isLoading}
                      onClick={(e) =>
                        this.props.searchHandler("LOCATION", { ...this.state })
                      }
                    >
                      <span className="tooltiptext">Current Location</span>
                      <i className="fas fa-location-arrow"></i>
                    </button>
                  </div>
                </div>

                <div className="field is-grouped has-addons has-addons-centered">
                  <div className="control">
                    <button
                      className={this.getFilterBtnClass("unisex")}
                      onClick={() => this.toggleFilter("unisex")}
                    >
                      <span className="icon">
                        <span className="tooltiptext">Unisex</span>
                        <i className="fas fa-restroom"></i>
                      </span>
                    </button>
                  </div>

                  <div className="control">
                    <button
                      className={this.getFilterBtnClass("ada")}
                      onClick={() => this.toggleFilter("ada")}
                    >
                      <span className="icon">
                        <span className="tooltiptext">Accessible</span>
                        <i className="fas fa-wheelchair"></i>
                      </span>
                    </button>
                  </div>

                  <div className="control">
                    <button
                      className={this.getFilterBtnClass("changingTable")}
                      onClick={() => this.toggleFilter("changingTable")}
                    >
                      <span className="icon">
                        <span className="tooltiptext">Changing Table</span>
                        <i className="fas fa-baby"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
