import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchMeasures } from '../actions/index';
import { selectMeasure } from '../actions/selectedMeasures';
import { requestNewQualityReport } from '../actions/qualityReports';

import MeasureCategory from '../components/MeasureCategory';
import SelectedMeasure from '../components/SelectedMeasure';

import measureProps from '../prop-types/measure';
import qualityReportProps from '../prop-types/quality_report';

class MeasureDisplay extends Component {
  componentDidMount() {
    this.props.fetchMeasures();
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <h3>Filters</h3>
          <p className="input-group">
            <input type="text" value="" className="form-control category-measure-search" placeholder="measure or group title" />
            <span className="input-group-btn"><button type="button" className="btn btn-default clear-search">&times;</button></span>
          </p>
          {this.props.categories.map(category =>
            <MeasureCategory
              category={category}
              key={category}
              measures={this.props.measures.filter((m) => m.category === category)}
              onAddMeasure={(measure) => {
                this.props.selectMeasure(measure);
                this.props.requestNewQualityReport(measure);
              }} />
          )}
        </div>
        <div className="main">
          <div className="main-heading">
            <h1 className="title">Measures</h1>
          </div>
          {this.props.selectedMeasures.map((sm) => {
            let qrs = this.props.qualityReports.filter(qr => qr.measureId === sm.hqmfId);
            return <SelectedMeasure selectedMeasure={sm} qualityReports={qrs} key={sm.hqmfId} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  var props = {};

  props.isFetching = state.definitions.isFetching;
  props.measures = state.definitions.measures;
  props.categories = state.definitions.categories;
  props.selectedMeasures = state.selectedMeasures;
  props.qualityReports = state.qualityReports;

  return props;
};

MeasureDisplay.displayName = 'MeasureDisplay';

MeasureDisplay.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  qualityReports: PropTypes.arrayOf(qualityReportProps).isRequired,
  measures: PropTypes.arrayOf(measureProps).isRequired,
  selectedMeasures: PropTypes.arrayOf(measureProps).isRequired,
  fetchMeasures: PropTypes.func,
  selectMeasure: PropTypes.func,
  requestNewQualityReport: PropTypes.func
};

export default connect(mapStateToProps, { fetchMeasures, selectMeasure, requestNewQualityReport })(MeasureDisplay);
