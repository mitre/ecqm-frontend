import React from 'react';

export default React.createClass({
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            <img src="/assets/images/pophealth-logo-3x.png" width="100"/>
          </a>

          <ul className="nav navbar-nav">
            <li><a href="/#">Home</a></li>
          </ul>
        </div>
      </nav>
    );
  }
});
