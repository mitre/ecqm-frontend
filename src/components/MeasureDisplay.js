import React, { Component, PropTypes } from 'react';
import { fetchMeasuresIfNeeded } from '../actions/index';
import { connect } from 'react-redux';
import MeasureCategory from './MeasureCategory';
import SelectedMeasure from './SelectedMeasure';

class MeasureDisplay extends Component {
  componentDidMount() {
    this.props.fetchMeasuresIfNeeded();
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
            {this.props.selectedMeasures.map(sm =>
              <SelectedMeasure selectedMeasure={sm} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  var props = {};
  if (state.definitions) {
    props.isFetching = state.definitions.isFetching;
    props.measures = state.definitions.measures;
    props.categories = state.definitions.categories;
  } else {
    props.isFetching = true;
    props.measures = [];
    props.categories = [];
  }
  if (state.selectedMeasures) {
    props.selectedMeasures = state.selectedMeasures;
  } else {
    props.selectedMeasures = [];
  }
  return props;
};

MeasureDisplay.displayName = 'MeasureDisplay';

MeasureDisplay.propTypes = {
  categories: PropTypes.array.isRequired,
  measures: PropTypes.array.isRequired,
  selectedMeasures: PropTypes.array.isRequired,
  fetchMeasuresIfNeeded: PropTypes.func
};

export default connect(mapStateToProps, { fetchMeasuresIfNeeded })(MeasureDisplay);
