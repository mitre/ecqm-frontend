import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/Header';
import { fetchUserInfo } from '../actions/patient';

class App extends Component {
  componentWillMount() {
    this.props.fetchUserInfo();
  }

  render() {
    const { children } = this.props; //eslint-disable-line

    return (
      <div className="app">
        <Header name={this.props.user.name} />
        {children}
      </div>
    );
  }
}

App.displayName = 'App';

App.propTypes = {
  user: PropTypes.object,
  fetchUserInfo: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserInfo }, dispatch);
}

function mapStateToProps(state) {
  return { user: state.patient.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
