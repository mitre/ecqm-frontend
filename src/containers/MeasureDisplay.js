import React, { Component, PropTypes } from 'react';
import { fetchMeasures } from '../actions/index';
import { selectMeasure } from '../actions/selectedMeasures';
import { requestNewQualityReport } from '../actions/qualityReports';
import { connect } from 'react-redux';
import MeasureCategory from '../components/MeasureCategory';
import SelectedMeasure from '../components/SelectedMeasure';

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
            {this.props.selectedMeasures.map((sm) => {
              let qrs = this.props.qualityReports.filter(qr => qr.measureId === sm.hqmfId);
              return <SelectedMeasure selectedMeasure={sm} qualityReports={qrs} />;
            })}
          </div>
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
  categories: PropTypes.array.isRequired,
  qualityReports: PropTypes.array.isRequired,
  measures: PropTypes.array.isRequired,
  selectedMeasures: PropTypes.array.isRequired,
  fetchMeasures: PropTypes.func,
  selectMeasure: PropTypes.func,
  requestNewQualityReport: PropTypes.func
};

export default connect(mapStateToProps, { fetchMeasures, selectMeasure, requestNewQualityReport })(MeasureDisplay);
