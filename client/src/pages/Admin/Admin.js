import React, { Component } from "react";
import axios from "axios";
import "./Admin.css"
const cryptoRandomString = require('crypto-random-string');

class Admin extends Component {

    state = {
        token: "",
        profile: {},
        users: [],
        createUser: false,
        newUser: {
            connection: "Username-Password-Authentication",
            email: "",
            username: "",
            password: "",
            phone_number: "",
            roles: "User",
            // permissions: ""
        },
    }
    constructor(props) {
        super(props);
        this.securedPing = this.securedPing.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.getFiles = this.getFiles.bind(this);
        this.createUser = this.createUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => {
                var ID = profile.sub.replace("auth0|", "");
                this.setState({
                    profile,
                    ID: ID
                });
            });
        } else {
            var ID = userProfile.sub.replace("auth0|", "");
            console.log(ID)
            this.setState({
                profile: userProfile,
                ID: ID
            });
        }
        this.securedPing();
    }

    componentDidMount() {
        console.log(document.cookie);
        // this.getUsers;
    }

    securedPing() {
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }

        axios.get(`api/auth`, { headers })
            .then(response => {
                console.log(response.data)
                this.getUsers();
            })
            .catch(err => { console.log(err.message) });

    }

    getUsers() {
        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        console.log(headers);
        axios.get("api/auth/getusers", { headers })
            .then(res => {
                console.log(res.data);
                this.setState({ users: res.data })
            })
            .catch(err => console.log(err));
    }

    createUser() {

        if(!this.state.createUser) return alert("return");

        const { newUser } = this.state;

        let body = newUser;



        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }

        // const body = this.state.newUser;
        body = JSON.parse(JSON.stringify(this.state.newUser));


        let authUser = {
            connection: "Username-Password-Authentication",
            email: body.email,
            username: body.username,
            password: body.password,
            app_metadata: { authorization: { roles: [body.roles], permissions: [] } },
            user_metadata: { phone_number: body.phone_number }
        };

        axios.post("api/auth/createuser", { authUser }, { headers })
            .then(res => {
                let arr = [...this.state.users, res.data];
                this.setState({ users: arr })
            })
            .catch(err => console.log(err));


        this.setState({
            newUser: {
                connection: "Username-Password-Authentication",
                email: "",
                username: "",
                password: "",
                phone_number: "",
                roles: "User",
                // permissions: ""
            }
        })
    }

    getFiles(e) {

        var ID = e.target.value.replace("auth0|", "");
        console.log(ID);


    }

    handleChange(e) {

        const { name, value } = e.target;

        let userCopy = JSON.parse(JSON.stringify(this.state.newUser));

        userCopy[name] = value;



        this.setState({ newUser: userCopy });

    }

    handleSubmit(e) {
        e.preventDefault();

        let { newUser } = this.state;

        newUser = JSON.parse(JSON.stringify(this.state.newUser));



        for (var key in newUser) {

            if (key === "username") {

                if (newUser[key].length === 0) {
                    this.setState({ invalidU: true, createUser: false });
                } else {
                    this.setState({ invalidU: false, createUser: true });
                }
            }

            if (key === "email") {



                if ((!newUser[key].includes('@')) || (!newUser[key].includes('.'))) {
                    this.setState({ invalidE: true, createUser: false });
                } else {
                    this.setState({ invalidE: false, createUser: true });
                }
            }

            if (key === "phone_number") {

                let dirty = newUser[key];

                dirty = dirty.replace(/\)/g, '');
                dirty = dirty.replace(/\(/g, '');
                dirty = dirty.replace(/\-/g, '');
                dirty = dirty.replace(/\s/g, '');


                newUser[key] = dirty;

                this.setState({ newUser });


                if (!(dirty.length === 10) || !(parseInt(dirty))) {
                    this.setState({ invalidN: true, createUser: false });

                } else {
                    this.setState({ invalidN: false, createUser: true });
                }
            }

            if (key === "password") {
                let hasNumber = /\d/;
                if (newUser[key].length < 8) {
                    this.setState({ invalidP: true, createUser: false});
                } else if (newUser[key] == (newUser[key].toLowerCase())) {
                    this.setState({ invalidP: true, createUser: false });
                } else if (newUser[key] == newUser[key].toUpperCase()) {
                    this.setState({ invalidP: true, createUser: false });
                } else if (!hasNumber.test(newUser[key])) {
                    this.setState({ invalidP: true, createUser: false });
                } else {
                    this.setState({ invalidP: false, createUser: true });
                }
            }
        }

        this.createUser();

    }




    render() {
        const { newUser, profile, users } = this.state;

        const { email, username, password, phone_number, roles, permissions } = newUser;

        let usersArr = null;

        let filler = [];

        console.log(profile);


        if (users[0]) {
            users.forEach((user, index) => {

                let { app_metadata, email, nickname, username, user_id } = user;

                let card = (<li className="item " key={index}>

                    <span>{app_metadata.authorization.roles[0] ? app_metadata.authorization.roles[0] : "User"}</span>

                    <span className="nameString"> {nickname ? nickname.charAt(0).toUpperCase() + nickname.slice(1) : username.charAt(0).toUpperCase() + username.slice(1)} </span>

                    <a className="email" href={`mailto:${email}`} >Email</a>

                    {/* {user_id} */}

                    <button className="btn right" onClick={this.getFiles} value={user_id}> View Files </button>
                </li>);

                filler.push(card);
            })

            usersArr = filler;

        } else {

            usersArr = (<p style={{ margin: "15px" }}> Loading </p>);

        }

        return (
            <div className="container fluid">

                <div className="row">

                    <div className="col-sm-12 col-md-12 col-lg-8" style={{ margin: "0 auto" }}>

                        <div className="row" id="admin">

                            <div className="col-sm-12 col-md-3 col-lg-3">
                                <img src={profile.picture} style={{ margin: "15px", borderRadius: "100px" }} />
                            </div>
                            <div className="col-sm-12 col-md-9 col-lg-9">
                                <form autoComplete="new-password" style={{ padding: "5px 0 15px 0" }}>
                                    <h1>
                                        Create User
                                </h1>

                                    <input type='hidden' value='something' />


                                    <div className="form-row">

                                        <div className="col frm username">
                                            <label className={this.state.newUser.username ? "noselect slide" : "noselect hide"} htmlFor="username">{this.state.invalidU ? "Enter Username" : "Username"}</label>
                                            <input autoComplete="new-password" id="username" className={this.state.invalidU ? "alert" : ""} type="text" value={username} name="username" placeholder="" onChange={this.handleChange} />
                                        </div>
                                        <div className="col frm">
                                            <label className={this.state.newUser.email ? "noselect slide" : "noselect hide"} htmlFor="email">{this.state.invalidE ? "Enter Valid Email" : "Email"}</label>
                                            <input id="email" className={this.state.invalidE ? "alert" : ""} type="text" value={email} name="email" placeholder="" onChange={this.handleChange} />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col frm password">
                                            <label className={this.state.newUser.password ? "noselect slide" : "noselect hide"} htmlFor="password">{this.state.invalidP ? "At least 8 characters, uppercase, lowercase & number" : "Password"}</label>
                                            <input autoComplete="new-password" id="password" className={this.state.invalidP ? "alert" : ""} type="password" value={password} name="password" placeholder="" onChange={this.handleChange} />
                                        </div>
                                        <div className="col frm phone_number">
                                            <label className={this.state.newUser.phone_number ? "noselect slide" : "noselect hide"} htmlFor="phone_number">{this.state.invalidN ? "Enter Valid Number" : "Phone Number"}</label>
                                            <input id="phone_number" className={this.state.invalidN ? "alert" : ""} type="text" value={phone_number} name="phone_number" placeholder="" onChange={this.handleChange} />
                                        </div>
                                    </div>

                                    <div className="form-row" style={{ marginTop: "15px" }}>
                                        <div className="col frm roles">
                                            <select value={roles} name="roles" onChange={this.handleChange} >
                                                <option value="User">User</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <button id="usersubmit" className="btn" onClick={this.handleSubmit}>
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div>


                            <div className="customers">

                                <ul>
                                    {usersArr}
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Admin;
