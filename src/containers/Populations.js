import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import qualityReportProps from '../prop-types/quality_report';
import measureProps from '../prop-types/measure';
import patientProps from '../prop-types/patient';
import { fetchMeasures, fetchPatientCount } from '../actions/index';

import { requestPopulation, requestQualityReport } from '../actions/qualityReports';

import Stats from '../components/Stats';
import PatientList from '../components/PatientList';

class Populations extends Component {
  componentWillMount() {
    if(this.props.qualityReport === undefined) {
      // Someone came directly to this component. So we need to rehydrate the
      // store with all of the basic information
      this.props.fetchMeasures();
      this.props.fetchPatientCount();
      this.props.requestQualityReport(this.props.params.qualityReportId);
    }

    this.props.requestPopulation(this.props.params.qualityReportId, "initialPatientPopulation");
    this.props.requestPopulation(this.props.params.qualityReportId, "numerator");
    this.props.requestPopulation(this.props.params.qualityReportId, "denominator");
    this.props.requestPopulation(this.props.params.qualityReportId, "outlier");
  }

  render() {
    return (
      <div className="container">
        <Stats patientCount={this.props.patientCount} />
        <div className="row">
          <h1>{this.props.measure.name}</h1>
          <div className="panel panel-default">
            <div className="panel-body">
              {this.props.measure.description}
            </div>
          </div>

          <ul className="nav nav-tabs" role="tablist">
            <li role="presentation" className="active"><a href="#ipp" aria-controls="ipp" role="tab" data-toggle="tab">Initial Patient Population</a></li>
            <li role="presentation"><a href="#numer" aria-controls="numer" role="tab" data-toggle="tab">Numerator</a></li>
            <li role="presentation"><a href="#denom" aria-controls="denom" role="tab" data-toggle="tab">Denominator</a></li>
            <li role="presentation"><a href="#outlier" aria-controls="outlier" role="tab" data-toggle="tab">Outliers</a></li>
          </ul>

          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="ipp">
              <PatientList patients={this.props.initialPatientPopulation} />
              {this.overflowDisplay('initialPatientPopulation')}
            </div>
            <div role="tabpanel" className="tab-pane" id="numer">
              <PatientList patients={this.props.numerator} />
              {this.overflowDisplay('numerator')}
            </div>
            <div role="tabpanel" className="tab-pane" id="denom">
              <PatientList patients={this.props.denominator} />
              {this.overflowDisplay('denominator')}
            </div>
            <div role="tabpanel" className="tab-pane" id="outlier">
              <PatientList patients={this.props.outlier} />
              {this.overflowDisplay('outlier')}
            </div>
          </div>
        </div>
      </div>
    );
  }

  overflowDisplay(population) {
    const populationCount = this.props[population + 'Total'];
    if (populationCount > 20) {
      return <p>... and {populationCount - 20} more.</p>;
    }
  }
}

Populations.displayName = 'Populations';

Populations.propTypes = {
  patientCount: PropTypes.number,
  measure: measureProps,
  qualityReport: qualityReportProps,
  params: PropTypes.shape({
    qualityReportId: PropTypes.string
  }),
  initialPatientPopulation: PropTypes.arrayOf(patientProps),
  numerator: PropTypes.arrayOf(patientProps),
  denominator: PropTypes.arrayOf(patientProps),
  outlier: PropTypes.arrayOf(patientProps),
  initialPatientPopulationTotal: PropTypes.number,
  numeratorTotal: PropTypes.number,
  denominatorTotal: PropTypes.number,
  outlierTotal: PropTypes.number,
  requestPopulation: PropTypes.func,
  fetchMeasures: PropTypes.func,
  requestQualityReport: PropTypes.func,
  fetchPatientCount: PropTypes.func
};

export const mapStateToProps = (state, ownProps) => {
  var props = {};
  props.patientCount = state.patientCount;
  props.qualityReport = state.qualityReports.find((qr) => qr.id === ownProps.params.qualityReportId);
  const pops = ['initialPatientPopulation', 'numerator', 'denominator', 'outlier'];
  pops.forEach((pop) => {
    props[pop] = [];
    if (state.populations[ownProps.params.qualityReportId]) {
      props[pop + 'Total'] = state.populations[ownProps.params.qualityReportId][pop + 'Total'];
    }
  });
  let qrPopulations = state.populations[ownProps.params.qualityReportId];
  if (qrPopulations && state.definitions.measures.length > 0 && props.qualityReport) {
    pops.forEach((pop) => {
      let qrPop = qrPopulations[pop];
      if (qrPop) {
        let page = qrPop.find((p) => p.page === 0);
        if (page) {
          props[pop] = page.patients;
        }
      }
    });
    props.measure = state.definitions.measures.find((m) => m.hqmfId === props.qualityReport.measureId);
  } else {
    props.measure = {name: 'Loading', description: 'Loading',
      category: 'Loading', hqmfId: 'Loading', cmsId: 'Loading'};
  }

  return props;
};

export default connect(mapStateToProps, { requestPopulation, fetchMeasures,
                        requestQualityReport, fetchPatientCount })(Populations);
