import React, { Component } from 'react';
import axios from "axios";

export default class Box extends Component {

    constructor(props) {
        super(props);
        this.getFiles = this.getFiles.bind(this);
    }

    getFiles() {
        const headers = { 'Authorization': `Bearer ${this.props.auth.getAccessToken()}` };

        console.log(headers);

        axios.post(`api/box/${this.props.ID}`, this.state.filesSent, { headers })
            .then(resp => {
                console.log(resp);
            })
            .catch(err => console.log(err));

    }


    render() {
        return (
            <section>

            </section>
        )
    }
}