import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="/assets/images/pophealth-logo-3x.png" width="100"/>
          </Link>

          <ul className="nav navbar-nav">
            <li><Link to="/">Homes</Link></li>
            <li><Link to="/users/sign_in">Sign In</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}
