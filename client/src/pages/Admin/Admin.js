import React, { Component } from "react";
import axios from "axios";

class Admin extends Component {

    state = {
        token: "",
    }
    constructor(props) {
        super(props);
        this.securedPing = this.securedPing.bind(this);
    }

    componentWillMount() {

        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });
                console.log(profile);
            });
        } else {
            this.setState({ profile: userProfile });
        }

        this.securedPing();
    }

    securedPing() {

        const { getAccessToken } = this.props.auth;
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        console.log(headers)
        axios.get(`api/auth`, { headers }, { cancelToken: this.source.token })
            .then(response => {
                this.setState({ token: JSON.parse(response.data) });
                console.log(this.state.token);
            })
            .catch(err => 
                    this.setState({ message: err.message }));

    }

    render() {
        const { profile } = this.state;

        return (
            <div>
                <div className="customers">

                </div>
                {/* <img src={profile.picture} /><span>{profile.name}</span> */}
            </div>
        )
    }
}

export default Admin;
