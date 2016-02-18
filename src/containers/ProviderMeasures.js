import React, { Component } from 'react';

import ProviderDisplay from '../components/ProviderDisplay';

export default class ProviderMeasures extends Component {
  render() {
    return (
      <div className="container">
        <ProviderDisplay />
      </div>
    );
  }
}

ProviderMeasures.displayName = 'ProviderMeasures';
