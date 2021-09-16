import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { searchUsers } from "../actions/search";

class Navbar extends Component {
  logOut = () => {
    console.log("******8");
    localStorage.removeItem("token");
    this.props.dispatch(logout());
  };

  handleSearch = (e) => {
    const searchText = e.target.value;
    this.props.dispatch(searchUsers(searchText));
  };

  render() {
    const { auth, search } = this.props;
    const { results } = search;
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input placeholder="Search" onChange={this.handleSearch} />
          {results.length > 0 && (
            <div className="search-results">
              <ul>
                {results.map((user) => (
                  <li className="search-results-row" key={user._id}>
                    <Link to={`/users/${user._id}`}>
                      <img
                        src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                        alt="user-dp"
                      />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="right-nav">
          {auth.isLogin && (
            <div className="user">
              <Link to="/settings">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                  id="user-dp"
                />
              </Link>
              <span>{auth.user.name}</span>
            </div>
          )}

          <div className="nav-links">
            <ul>
              {!auth.isLogin && (
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              )}
              {auth.isLogin && (
                // <button >
                <li onClick={this.logOut}>Log out</li>
                // </button>
              )}
              {!auth.isLogin && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    search: state.search,
  };
}

export default connect(mapStateToProps)(Navbar);
