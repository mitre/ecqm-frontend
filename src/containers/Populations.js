import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import qualityReportProps from '../prop-types/quality_report';
import measureProps from '../prop-types/measure';
import populationProps from '../prop-types/population';

import { fetchMeasures } from '../actions/measure';
import { fetchPatientCount } from '../actions/patient';
import { fetchInitialPatientPopulation, fetchNumeratorPopulation,
         fetchDenominatorPopulation, fetchOutlierPopulation } from '../actions/population';
import { fetchQualityReport } from '../actions/quality_report';

import Stats from '../components/Stats';
import PatientList from '../components/PatientList';

class Populations extends Component {
  componentWillMount() {
    if(this.props.qualityReport === undefined) {
      // Someone came directly to this component. So we need to rehydrate the
      // store with all of the basic information.
      this.props.fetchMeasures();
      this.props.fetchPatientCount();
      this.props.fetchQualityReport(this.props.params.qualityReportId);
    }

    this.props.fetchInitialPatientPopulation(this.props.params.qualityReportId);
    this.props.fetchNumeratorPopulation(this.props.params.qualityReportId);
    this.props.fetchDenominatorPopulation(this.props.params.qualityReportId);
    this.props.fetchOutlierPopulation(this.props.params.qualityReportId);
  }

  renderedPatientTab(popType, popName, className = '') {
    return (
      <li role="presentation" className={className}>
        <a href={`#${popType}`} aria-controls={popType} role="tab" data-toggle="tab">
          {popName} ({this.props[popType].total})
        </a>
      </li>
    );
  }

  renderedPatientList(popType, className = '') {
    let patientList = null;
    if (this.props[popType].patients != null) {
      patientList = <PatientList
        patients={this.props[popType].patients}
        total={this.props[popType].total}
        onPaginate={(offset) => this.props[`fetch${_.upperFirst(popType)}`](this.props.params.qualityReportId, offset)}
        />;
    }

    return (
      <div role="tabpanel" className={`tab-pane ${className}`} id={popType} key={popType}>
        {patientList}
      </div>
    );
  }

  render() {
    let populationTypes = [ 'initialPatientPopulation', 'numeratorPopulation', 'denominatorPopulation', 'outlierPopulation' ];

    return (
      <div className="container populations">
        <Stats patientCount={this.props.patientCount} />
        <div className="row">
          <h1>{this.props.measure.name}</h1>
          <div className="panel panel-default">
            <div className="panel-body">
              {this.props.measure.description}
            </div>
          </div>

          <ul className="nav nav-tabs" role="tablist">
            {this.renderedPatientTab(populationTypes[0], 'Initial Patient Population', 'active')}
            {this.renderedPatientTab(populationTypes[1], 'Numerator')}
            {this.renderedPatientTab(populationTypes[2], 'Denominator')}
            {this.renderedPatientTab(populationTypes[3], 'Outliers')}
          </ul>

          <div className="tab-content">
            {populationTypes.map((popType) => this.renderedPatientList(popType, popType === 'initialPatientPopulation' ? 'active' : ''))}
          </div>
        </div>
      </div>
    );
  }
}

Populations.displayName = 'Populations';

Populations.propTypes = {
  patientCount: PropTypes.number.isRequired,
  measure: measureProps,
  qualityReport: qualityReportProps,
  params: PropTypes.shape({ qualityReportId: PropTypes.string.isRequired }).isRequired,
  initialPatientPopulation: populationProps,
  numeratorPopulation: populationProps,
  denominatorPopulation: populationProps,
  outlierPopulation: populationProps,
  fetchInitialPatientPopulation: PropTypes.func.isRequired,
  fetchNumeratorPopulation: PropTypes.func.isRequired,
  fetchDenominatorPopulation: PropTypes.func.isRequired,
  fetchOutlierPopulation: PropTypes.func.isRequired,
  fetchMeasures: PropTypes.func.isRequired,
  fetchQualityReport: PropTypes.func.isRequired,
  fetchPatientCount: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchInitialPatientPopulation,
    fetchNumeratorPopulation,
    fetchDenominatorPopulation,
    fetchOutlierPopulation,
    fetchMeasures,
    fetchQualityReport,
    fetchPatientCount
  }, dispatch);
}

export function mapStateToProps(state, ownProps) {
  let qualityReport;

  if (state.qualityReport.qualityReports.length > 0) {
    qualityReport = state.qualityReport.qualityReports.find((qr) => qr.id === ownProps.params.qualityReportId);
  }
  
  let measure = state.measure.measures.find((measure) => measure.hqmfId === qualityReport.measureId);
  if (measure == null) {
    measure = {
      name: 'Loading',
      description: 'Loading',
      category: 'Loading',
      hqmfId: 'Loading',
      cmsId: 'Loading'
    };
  }

  return {
    patientCount: state.patient.patientCount,
    initialPatientPopulation: state.population.initialPatientPopulation,
    numeratorPopulation: state.population.numeratorPopulation,
    denominatorPopulation: state.population.denominatorPopulation,
    outlierPopulation: state.population.outlierPopulation,
    qualityReport,
    measure
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Populations);
