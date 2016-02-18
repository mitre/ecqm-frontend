import React, { Component } from 'react';

import Header from '../components/Header';

export default class App extends Component {
  render() {
    const { children } = this.props; //eslint-disable-line
    return (
      <div>
        <Header />
        {children}
      </div>
    );
  }
}

App.displayName = 'App';
