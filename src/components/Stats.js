import React, { Component, PropTypes } from 'react';

export default class Stats extends Component {
  render() {
    return (
      <div className="row">
        <div className="effective-date pull-right row-inline">
          <h5 className="effective-date-header">
            <b>Reporting Period:</b> 2014
          </h5>
        </div>
        <h2># of Patients: {this.props.patientCount}</h2>
      </div>
    );
  }
}

Stats.propTypes = {
  patientCount: PropTypes.number
};

Stats.displayName = 'Stats';
