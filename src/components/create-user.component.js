import React, { Component } from "react";
import axios from "axios";

const User = (props) => (
  <tr>
    <td>{props.username.username}</td>
    <button
      className="btn btn-danger mr-2"
      href="#"
      onClick={() => {
        props.deleteExercise(props.exercise._id);
      }}
    >
      delete
    </button>{" "}
  </tr>
);
class CreateUsers extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };
    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    this.setState({ username: "" });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div