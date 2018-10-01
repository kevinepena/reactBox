import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNavKey: "/"
    };
  }

  componentDidMount() {
    // this.checkPage();
    window.addEventListener("hashchange", () => {
      this.setState({ selectedNavKey: document.location.hash || "/" });
    });
  }

  // checkPage() {
  //   const homeLocation = "/";
  //   const location = document.location.pathname;

  //   if (location !== homeLocation) {
  //     console.log(`This is your Route location: ${location}`);
  //   } else {
  //     console.log(`this is the home route --> ${homeLocation}`);
  //   }
  // }

  render() {
    const loggedIn = this.props.auth.isAuthenticated();
    const admin = this.props.auth.userHasScopes(["scope:admin"]);
    const homeLocation = "/";
    const location = document.location.pathname;

    return (

      <nav className="nav navbar">
        <img className="slogo" src="assets/images/surrealitylogo.png" alt="logo" />
        <ul className="navbar-nav ml-auto">
          <li className="nav-item nav-link">
            {location === homeLocation ? (
              ""
            ) : (
                <Link to="/">
                  <button className="btn">
                    Home
                    </button>
                </Link>
              )}


            {/* {loggedIn && !admin ? (
              <Link to="/box">
                <button className="btn">Upload Files</button>
              </Link>
            ) : (
                ""
              )} */}

            {loggedIn && admin ? (
              <Link to="/admin">
                <button className="btn">Manage</button>
              </Link>
            ) : ""}

            {loggedIn ?
              <Link to="/profile">
                <button className="btn">Profile&nbsp;</button>
              </Link> : ""}


            {!loggedIn ? (
              <button className="btn btn-login" onClick={this.props.auth.login}>
                Log In
                  </button>
            ) : (
                <button className="btn" onClick={this.props.auth.logout}>
                  Log Off
                  </button>
              )}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
