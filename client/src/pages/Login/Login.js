import React, { Component } from "react";
import axios from "axios";
import "./Login.css";

export default class Login extends Component {

    state = {
        email: "",
        pass: "",
        invalidM: false,
        invalidP: false
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { email, pass } = this.state;

        let dirty = email;


        if ((!dirty.includes('@')) || (!dirty.includes('.'))) {
            this.setState({ invalidM: true });
        } else {
            this.setState({ invalidM: false });
        }

        if (!this.state.pass) {
            this.setState({ invalidP: true });
        } else {
            this.setState({ invalidP: false });
        }

        if (!(this.state.invalidM) && !(this.state.invalidP)) {
            this.setState({ disable: true });
            this.props.auth.login(dirty, pass, ((err, result) => {
                if (err) {
                    this.setState({ error: err.description, disable: false });
                };
            }));
        }

    }


    render() {
        return (
            <section className="container fluid">

                <div id="login" className={this.state.error ? "col-sm-12 col-md-12 col-lg-6 hi2" : "col-sm-12 col-md-12 col-lg-6"}>
                    <h2>Login Form</h2>
                    <form className="login">

                        <div className="col frm username">
                            <label className={this.state.email ? "noselect slide" : "noselect hide"} htmlFor="email">{this.state.invalidM ? "Please Enter Valid Email" : "Email address"}</label>
                            <input id="email" type="text" className={(this.state.invalidM) ? "hi2" : ""} onChange={this.handleChange} name="email" value={this.state.email} />
                        </div>

                        <div className="col frm username">
                            <label className={this.state.pass ? "noselect slide" : "noselect hide"} htmlFor="password">Password</label>
                            <input id="password" type="password" className={(this.state.invalidP) ? "hi2" : ""} onChange={this.handleChange} name="pass" value={this.state.pass} />
                        </div>

                        <div className="col frm">
                            {this.state.error ? (<p className="alert-text">{this.state.error}</p>) : ""}
                            {this.state.disable ? (<button disabled id="loginsubmit" onClick={this.handleSubmit} className="btn btn-default">Login</button>) : (<button id="loginsubmit" onClick={this.handleSubmit} className="btn btn-default">Login</button>)}
                        </div>
                        
                    </form>
                    <br />
                </div>
            </section>
        )
    }
}