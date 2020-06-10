import React, { Component } from "react";

export class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "id",
      avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
      html_url: "https://github.com/mojombo",
      login: "Andri",
    };
  }

  render() {
    const { avatar_url, html_url, login } = this.props.user;
    return (
      <div className="card text-center">
        <img
          src={avatar_url}
          alt="avatar"
          className="round-img"
          style={{ width: "60px" }}
        />
        <h3>{login}</h3>
        <div>
          <a
            href={html_url}
            className="btn btn-dark btn-sm my-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            More
          </a>
        </div>
      </div>
    );
  }
}

export default UserItem;
