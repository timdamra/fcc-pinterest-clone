import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { LogOutAction } from '../actions';

const NavMenu = props => {
  const logout = e => {
    e.preventDefault();
    props.LogOutAction(props.history);
  };
  if (!props.auth) {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="grey darken-4 nav-wrapper">
            <Link to="/" className="brand-logo">
              PinClone
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
  if (props.auth) {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="grey darken-4 nav-wrapper">
            <Link to="/" className="brand-logo">
              PinClone
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/mypins">My Pins</Link>
              </li>
              <li>
                <a onClick={logout}>Log Out</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    auth: state.auth.auth
  };
}

export default withRouter(connect(mapStateToProps, { LogOutAction })(NavMenu));
