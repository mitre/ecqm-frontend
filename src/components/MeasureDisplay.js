import React, { Component, PropTypes } from 'react';
import { fetchMeasuresIfNeeded } from '../actions/index';
import { connect } from 'react-redux';
import MeasureCategory from './MeasureCategory';
import QualityReport from './QualityReport';

class MeasureDisplay extends Component {
  componentDidMount() {
    this.props.onFetchMeasures();
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
              measures={this.props.measures.filter((m) => m.category === category)} />
          )}
        </div>
        <div className="main">
          <div className="main-heading">
            <h1 className="title">Measures</h1>
            {this.props.qualityReports.map(qr =>
              <QualityReport qualityReport={qr} measure={this.props.measures.find((m) => {return m.hqmfId === qr.hqmfId;})} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMeasures: () => {
      dispatch(fetchMeasuresIfNeeded());
    }
  };
};

function flattenMeasures(measures) {
  let uniqueMeasures = [];
  measures.forEach((m) => {
    var reducedMeasure = {cmsId: m.cmsId, name: m.name, category: m.category, hqmfId: m.hqmfId};
    if (! uniqueMeasures.map((i) => i.cmsId).includes(reducedMeasure.cmsId)) {
      uniqueMeasures.push(reducedMeasure);
    }
  });
  return uniqueMeasures;
}

function flattenCategories(measures) {
  let categories = [];
  measures.forEach((m) => {
    if (! categories.includes(m.category)) {
      categories.push(m.category);
    }
  });
  return categories.sort();
}

const mapStateToProps = (state) => {
  var props = {};
  if (state.definitions) {
    props.isFetching = state.definitions.isFetching;
    props.measures = flattenMeasures(state.definitions.measures);
    props.categories = flattenCategories(state.definitions.measures);
  } else {
    props.isFetching = true;
    props.measures = [];
    props.categories = [];
  }
  if (state.qualityReports) {
    props.qualityReports = state.qualityReports;
  } else {
    props.qualityReports = [];
  }
  return props;
};

MeasureDisplay.displayName = 'MeasureDisplay';

MeasureDisplay.propTypes = {
  categories: PropTypes.array.isRequired,
  measures: PropTypes.array.isRequired,
  onFetchMeasures: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MeasureDisplay);
