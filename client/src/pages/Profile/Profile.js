import React, { Component } from "react";
import Box from "../../components/Box";
import axios from "axios";
import Upload from "../../components/Upload"
import "./Profile.css";


class Profile extends Component {

  state = {
    files: "",
    profile: {},
    ID: "",
    token: this.props.auth.getAccessToken()
  }

  constructor(props) {
    super(props);
    this.securedPing = this.securedPing.bind(this);
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
  }

  componentDidMount() {
    this.securedPing();
  }

  securedPing() {
    const { getAccessToken } = this.props.auth;
    const API_URL = '/api';
    const headers = { 'Authorization': `Bearer ${getAccessToken()}` }
    console.log(headers)
    console.log(this.state.ID)
    axios.get(`${API_URL}/box/${this.state.ID}`, { headers })
      .then(response => {
        console.log(response)
        this.setState({ files: (response.data) });
        console.log(this.state.files);
      })
      .catch(error => this.setState({ message: error.message }));
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }


  render() {
    const { profile } = this.state;
    // const { nickname, username } = profile;
    console.log(profile);

    return (
      <section className="container fluid">
        <div id='profile' className="col-sm-12 col-md-12 col-lg-8">
          {/* <img src={profile.picture} alt="" /> */}
          {/* <h1>{profile.nickname}</h1> */}
          {/* {profile.nickname ? profile.nickname.charAt(0).toUpperCase() + profile.nickname.slice(1) : profile.username.charAt(0).toUpperCase() + profile.username.slice(1)} */}

          <Box ID={this.state.ID} auth={this.props.auth} />
          <Upload auth={this.props.auth} />
        </div>
      </section>
    )
  }
}

export default Profile;
