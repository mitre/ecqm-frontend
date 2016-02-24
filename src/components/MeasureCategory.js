import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectMeasure } from '../actions/selectedMeasures';

class MeasureCategory extends Component {
  render() {
    return (
      <div className="panel-group measure-selectors">
        <div className="panel panel-default">
          <div className="toggleable panel-heading" data-toggle="collapse" data-parent=".measure-selectors" data-target={"#category-" + this.props.category.replace(/\s/g, '')}>
            <h4 className="panel-title">
              <div className="selection-pull-out">
                <span className="measure-count">0</span>
                <i className="panel-chevron glyphicon glyphicon-chevron-right"></i>
              </div>
              {this.props.category}
            </h4>
          </div>
          <div id={"category-" + this.props.category.replace(/\s/g, '')} className="panel-collapse collapse">
            <div className="panel-body">
              <div className="btn-block-container">
                <button type="button" className="btn btn-checkbox btn-block all">Select All</button>
              </div>
              {this.props.measures.map(measure => {
                var boundAddMeasure = this.props.onAddMeasure.bind(this, measure);
                return (
              <div className="btn-block-container" key={measure.cmsId} onClick={boundAddMeasure}>
                <button type="button" className="btn btn-checkbox btn-block individual">
                  {measure.cmsId} - {measure.name}
                </button>
              </div>);
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MeasureCategory.displayName = 'MeasureCategory';

MeasureCategory.propTypes = {
  category: PropTypes.string.isRequired,
  measures: PropTypes.array.isRequired,
  onAddMeasure: PropTypes.func
};


const mapDispatchToProps = (dispatch) => {
  return {
    onAddMeasure: (measure) => {
      dispatch(selectMeasure(measure));
    }
  };
};

export default connect(null, mapDispatchToProps)(MeasureCategory);
