import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchMeasures, selectMeasure, unselectMeasure } from '../actions/measure';
import { fetchNewQualityReport } from '../actions/quality_report';

import MeasureCategory from '../components/MeasureCategory';
import SelectedMeasure from '../components/SelectedMeasure';

import measureProps from '../prop-types/measure';
import qualityReportProps from '../prop-types/quality_report';

class MeasureDisplay extends Component {
  componentWillMount() {
    this.props.fetchMeasures();
  }

  render() {
    return (
      <div className="measure-display">
        <div className="measure-display-filters col-xs-3">
          <h3>Filters</h3>

          {/*<div className="measure-display-search input-group">
            <input type="text"
                   value=""
                   className="form-control measure-display-search-input"
                    placeholder="measure or group title" />
                <span className="input-group-btn measure-display-search-button">
              <button type="button" className="btn btn-default clear-search">&times;</button>
            </span>
          </div>*/}

          {this.props.categories.map(category =>
            <MeasureCategory
              category={category}
              key={category}
              measures={this.props.measures.filter((m) => m.category === category)}
              qualityReports={this.props.qualityReports}
              selectedMeasures={this.props.selectedMeasures.filter((sm) => sm.category === category)}
              selectMeasure={this.props.selectMeasure}
              unselectMeasure={this.props.unselectMeasure}
              fetchNewQualityReport={this.props.fetchNewQualityReport} />
          )}
        </div>

        <div className="main col-xs-9">
          <div className="main-heading">
            <h3 className="title">Measures</h3>
          </div>

          {this.props.selectedMeasures.map((selectedMeasure) => {
            let qrs = this.props.qualityReports.filter(qr => qr.measureId === selectedMeasure.hqmfId);

            return (
              <SelectedMeasure key={selectedMeasure.hqmfId}
                               selectedMeasure={selectedMeasure}
                               qualityReports={qrs} />
            );
          })}
        </div>
      </div>
    );
  }
}

MeasureDisplay.displayName = 'MeasureDisplay';

MeasureDisplay.propTypes = {
  measures: PropTypes.arrayOf(measureProps).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedMeasures: PropTypes.arrayOf(measureProps).isRequired,
  qualityReports: PropTypes.arrayOf(qualityReportProps).isRequired,
  fetchMeasures: PropTypes.func.isRequired,
  selectMeasure: PropTypes.func.isRequired,
  unselectMeasure: PropTypes.func.isRequired,
  fetchNewQualityReport: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchMeasures,
    selectMeasure,
    unselectMeasure,
    fetchNewQualityReport
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    measures: state.measure.measures,
    categories: state.measure.categories,
    selectedMeasures: state.measure.selectedMeasures,
    qualityReports: state.qualityReport.qualityReports
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MeasureDisplay);
