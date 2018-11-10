// src/App.js
import React, { Component } from 'react';
import Auth from "./auth/Auth";
import { Router, Route, Redirect } from "react-router-dom";
import history from "./history";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Callback from "./pages/Callback";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import './App.css';


const auth = new Auth();


class App extends Component {

  state = {
    nav: false
  }

  constructor(props) {
    super(props);
    this.getScroll = this.getScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.getScroll);
  }

  getScroll() {
    const scrolly = window.scrollY;

    if (scrolly > 0) {
      this.setState({ nav: true })
    } else if (scrolly === 0) {
      this.setState({ nav: false })
    }
  }


  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Nav auth={auth} nav={this.state.nav} />

          {/* <Route exact path="/" component={Home} /> */}
          <Route
            exact
            path="/"
            render={props => {
              return <Home auth={auth} {...props} />;
            }}
          />

          <Route
            exact
            path="/login"
            render={props => {
              return auth.isAuthenticated() ? (
                <Redirect to="/" />
              ) : (
                  <Login auth={auth} {...props} />
                );
            }}
          />

          <Route
            exact
            path="/profile"
            render={props => {
              return auth.isAuthenticated() ? (
                <Profile auth={auth} {...props} />
              ) : (
                  <Redirect to="/" />
                );
            }}
          />

          <Route
            path="/admin"
            render={props => {
              return auth.isAuthenticated() &&
                auth.userHasScopes(["scope:admin"]) ? (
                  <Admin auth={auth} {...props} />
                ) : (
                  <Redirect to="/" />
                );
            }}
          />

          <Route
            path="/callback"
            render={props => {
              auth.handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </div>

      </Router>
    )
  }
}

export default App;