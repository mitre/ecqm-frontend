import React, { Component } from 'react';
import { fetchMeasuresIfNeeded } from '../actions/index';
import { connect } from 'react-redux';
import MeasureCategory from './MeasureCategory';

class MeasureDisplay extends Component {
  constructor(props) {
    super(props);
  }

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
              measures={this.props.measures.filter((m) => {return m.category === category;})} />
          )}
        </div>
        <div className="main">
          <div className="main-heading">
            <h1 className="title">Measures</h1>
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
    var reducedMeasure = {cmsId: m.cmsId, name: m.name, category: m.category};
    if (! uniqueMeasures.map((i) => { return i.cmsId; }).includes(reducedMeasure.cmsId)) {
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
  if (state.measures) {
    return {
      isFetching: state.measures.isFetching,
      measures: flattenMeasures(state.measures.measures),
      categories: flattenCategories(state.measures.measures)
    };
  } else {
    return {
      isFetching: true,
      measures: [],
      categories: []
    };
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MeasureDisplay);
