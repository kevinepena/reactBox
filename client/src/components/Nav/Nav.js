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
    // const homeLocation = "/";
    // const location = document.location.pathname;

    return (

      <nav className={this.props.nav ? "nav nav-on" : "nav"}>
        <Link to="/">
          <img className={this.props.nav ? "slogo slogo-on" : "slogo"} src="assets/images/surrealitylogoyellow.png" alt="logo" />
          <h1 id="logoname">urreality</h1>
        </Link>
        <ul className="navbar-nav ml-auto">
          {/* {location === homeLocation ? (
            ""
          ) : (
              <li className="li-item">
                <Link className="nav-item nav-link" to="/">

                  Home

              </Link>
              </li>
            )} */}


          {/* {loggedIn && !admin ? (
              <Link to="/box">
                <button className="btn">Upload Files</button>
              </Link>
            ) : (
                ""
              )} */}

          {loggedIn && admin ? (
            <li className="li-item">

              <Link className="nav-item nav-link" to="/admin">
                Manage
              </Link>
            </li>
          ) : ""}

          {loggedIn ?
            <li className="li-item">

              <Link className="nav-item nav-link" to="/profile">
                Profile
              </Link>
            </li>
            : ""}


          {!loggedIn ? (
            <li className="li-item">
              <Link to="/login" className="nav-item nav-link" >
                Log In
              </Link>
            </li>
          ) : (
              <li className="li-item" >

                <span className="nav-item nav-link" onClick={this.props.auth.logout}>
                  Log Off
                </span>
              </li>
            )}

        </ul>
      </nav>
    );
  }
}

export default Nav;
