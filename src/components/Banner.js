"use strict";

import React from "react";

export default class Banner extends React.Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-6 is-offset-3 ">
              <h1 className="title has-text-white is-size-2 is-spaced">
                Welcome to WC-app
              </h1>
              <h2 className="subtitle has-text-white has-text-weight-light is-size-4">
                Find the location of the nearest restroom and help your
                community by adding a new one
              </h2>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
