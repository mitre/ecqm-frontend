import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { fetchUserInfo } from '../actions/index';
import { connect } from 'react-redux';

class Header extends Component {
  componentDidMount() {
    this.props.fetchUserInfo();
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header col-lg-4">
            <Link className="logo" to="/">
              <img alt="Pophealth logo small trans" src="/assets/images/popHealth-logo-3x.png" width="100" />
            </Link>
          </div>
          <div className="collapse navbar-collapse in">
            <ul className="nav navbar-nav pull-left" style={{marginTop: "10px"}}>
              <li className="location">
                General Hospital
              </li>
            </ul>
            <ul className="nav pull-right">
              <li className="divider-vertical"></li>
              <li className="profile">
                <div className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i className="glyphicon glyphicon-user"></i> {this.props.name}
                  </a>
                  <ul className="dropdown-menu pull-right" role="menu" aria-labelledby="User">
                    <li><Link to="/users/edit"><i className="glyphicon glyphicon-edit"></i> Edit Account</Link></li>
                    <li><Link to="/"><i className="glyphicon glyphicon-log-out"></i> Logout</Link></li>
                    <li className="divider"></li>
                    <li role="presentation" className="dropdown-header">Admin</li>
                    <li><Link to="/providers"><i className="glyphicon glyphicon-plus"></i> Providers</Link></li>
                    <li><Link to="/teams"><i className="glyphicon glyphicon-list"></i> Manage Teams</Link></li>
                  </ul>
                </div>
              </li>
              <li className="divider-vertical"></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  var props = {};
  if (state.user) {
    props.name = state.user.name;
  } else {
    props.name = "Unknown";
  }
  return props;
};

Header.propTypes = {
  name: PropTypes.string,
  fetchUserInfo: PropTypes.func
};

Header.displayName = 'Header';

export default connect(mapStateToProps, { fetchUserInfo })(Header);
