import React, { Component } from "react";
import axios from "axios";
const User = (props) => (
  <tr>
    <td>{props.user.username}</td>
    <td>
      <button
        className="btn btn-danger mr-2"
        to="#"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Delete
      </button>{" "}
    </td>
  </tr>
);
class UserList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);
    this.state = { users: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUser(id) {
    axios
      .delete("http://localhost:5000/users/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      users: this.state.users.filter((el) => el._id !== id),
    });
  }

  userList() {
    return this.state.users.map((currentUser) => {
      return (
        <User
          user={currentUser}
          deleteUser={this.deleteUser}
          key={currentUser._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
