import React, { Component } from 'react';

import MeasureDisplay from '../components/MeasureDisplay';
import Stats from '../components/Stats';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Stats patientCount={100} />
        <div className="row">
          <MeasureDisplay />
        </div>
      </div>
    );
  }
}

Dashboard.displayName = 'Dashboard';
