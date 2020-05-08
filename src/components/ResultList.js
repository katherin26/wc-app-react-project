"use strict";

import React from "react";
import {
  generateMapsUrl,
  getCurrentLocation,
  calculateDistance,
} from "../services/geolocation";

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: null,
    };
  }

  async componentDidMount() {
    const coordinates = await getCurrentLocation(navigator);
    this.setState({ currentLocation: coordinates });
  }

  getFilterBtnClass(isEnabled) {
    let className = "button is-outlined is-small";

    if (isEnabled) className += " is-info";

    return className;
  }

  computeRows() {
    const rows = this.props.records.map((record, idx) => (
      <tr key={idx}>
        <td width="5%">
          <i className="fas fa-toilet"></i>
        </td>
        <td width="65%">
          {record.name} <br />
          {record.street} <br />
          {this.state.currentLocation
            ? calculateDistance(this.state.currentLocation, record) +
              " miles away"
            : ""}
        </td>
        <td width="30%">
          <button className={this.getFilterBtnClass(record.unisex)} href="">
            <i className="fas fa-restroom"></i>
          </button>
          <button className={this.getFilterBtnClass(record.accessible)} href="">
            <i className="fas fa-wheelchair"></i>
          </button>
          <button
            className={this.getFilterBtnClass(record.changing_table)}
            href=""
          >
            <i className="fas fa-baby"></i>
          </button>
          <a
            className="button is-info is-small"
            href={generateMapsUrl(record.latitude, record.longitude)}
            target="_blank"
          >
            <span>
              {" "}
              <span className="tooltiptext">Map View</span>
              <i className="fas fa-map-marker-alt"></i>
            </span>
          </a>
        </td>
      </tr>
    ));

    return rows;
  }

  render() {
    return (
      <section className="section kathe_search_results">
        <div className="container">
          <div className="columns">
            <div className="column is-three-fifths is-offset-one-fifth has-text-centered">
              <div className="card-table">
                <div className="content">
                  <table className="table is-fullwidth is-striped">
                    <tbody>{this.computeRows()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
