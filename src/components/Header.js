"use strict";

import React from "react";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHamburgerActive: false,
      isNavMenuActive: false,
    };
  }

  handleHamburgerClick() {
    this.setState({
      isHamburgerActive: !this.state.isHamburgerActive,
      isNavMenuActive: !this.state.isNavMenuActive,
    });
  }

  render() {
    return (
      <section className="section">
        <nav
          className="navbar kt_transparent"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item">
              <div className="kathe_borderoutline">
                <h1 className="title has-text-white">
                  <i className="fab fa-weebly "></i>
                  <i className="fab fa-contao"></i> -app
                </h1>
              </div>
            </a>

            <a
              role="button"
              className={
                this.state.isHamburgerActive
                  ? "navbar-burger is-active"
                  : "navbar-burger"
              }
              aria-label="menu"
              aria-expanded="false"
              onClick={() => this.handleHamburgerClick()}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            id="navMenu"
            className={
              this.state.isNavMenuActive
                ? "navbar-menu is-active"
                : "navbar-menu"
            }
          >
            <div className="navbar-end">
              <span className="navbar-item">
                <button
                  className="button is-white is-outlined"
                  href=""
                  onClick={() => this.props.handleClickOnNewRestroom()}
                >
                  <span className="icon">
                    <i className="fas fa-plus"></i>
                  </span>
                  <span>New Restroom</span>
                </button>
              </span>
            </div>
          </div>
        </nav>
      </section>
    );
  }
}
