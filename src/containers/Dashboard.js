import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import MeasureDisplay from './MeasureDisplay';
import Stats from '../components/Stats';

import { fetchPatientCount } from '../actions';

export class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchPatientCount();
  }

  render() {
    return (
      <div className="container">
        <Stats patientCount={this.props.patientCount} />
        <div className="row">
          <MeasureDisplay />
        </div>
      </div>
    );
  }
}

Dashboard.displayName = 'Dashboard';

Dashboard.propTypes = {
  patientCount: PropTypes.number,
  fetchPatientCount: PropTypes.func
};

const mapStateToProps = (state) => {
  return {patientCount: state.patientCount};
};

export default connect(mapStateToProps, { fetchPatientCount })(Dashboard);
