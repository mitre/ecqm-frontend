import React, { Component, PropTypes } from 'react';

export default class Stats extends Component {
  render() {
    return (
      <div className="row stats col-xs-offset-9 col-xs-3">
        <div className="stats-reporting-period row">
          <span className="stats-header col-xs-8">Reporting Period:</span>
          <span className="stats-data col-xs-4"> 2014</span>
        </div>

        <div className="stats-number-of-patients row">
          <span className="stats-header col-xs-8">Number of Patients:</span>
          <span className="stats-data col-xs-4"> {this.props.patientCount}</span>
        </div>
      </div>
    );
  }
}

Stats.propTypes = {
  patientCount: PropTypes.number
};

Stats.displayName = 'Stats';
