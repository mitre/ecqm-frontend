import React, { Component } from 'react';

import ProviderTable from '../components/ProviderTable';

export default class ProviderList extends Component {
  render() {
    return (
      <div className="container">
        <ProviderTable />
      </div>
    );
  }
}

ProviderList.displayName = 'ProviderList';
