import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MeasureDisplay from './MeasureDisplay';
import Stats from '../components/Stats';

import { fetchPatientCount } from '../actions/patient';

export class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchPatientCount();
  }

  render() {
    return (
      <div className="container dashboard">
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
  patientCount: PropTypes.number.isRequired,
  fetchPatientCount: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPatientCount
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    patientCount: state.patient.patientCount
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
