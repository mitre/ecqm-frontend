import React, { Component } from 'react';

import Header from '../components/Header';

export default class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        {children}
      </div>
    );
  }
}
