import React, { Component } from "react"
import axios from "axios"

class Employee extends Component {

    state = {
        message: ""
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
        const API_URL = '/box';
        const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
        console.log(headers)
        axios.get(`${API_URL}/authMgmt`, { headers })
            .then(response => {
                this.setState({ message: (response.data) });
                console.log(this.state.message);
            })
            .catch(error => this.setState({ message: error.message }));
    }

    render() {
        const { profile } = this.state;
        console.log(profile)

        return (
            <div>
                {/* <img src={profile.picture} /><span>{profile.name}</span> */}
            </div>
        )
    }
}

export default Employee;
