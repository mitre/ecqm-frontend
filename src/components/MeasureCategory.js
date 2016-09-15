import React, { Component, PropTypes } from 'react';

import measureProps from '../prop-types/measure';
import CollapsiblePanel from './CollapsiblePanel';

export default class MeasureCategory extends Component {
  render() {
    return (
      <div className="measure-category">
        <CollapsiblePanel panelTitle={this.props.category}>
          <div>
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
        </CollapsiblePanel>
      </div>
    );
  }
}

MeasureCategory.displayName = 'MeasureCategory';

MeasureCategory.propTypes = {
  category: PropTypes.string.isRequired,
  measures: PropTypes.arrayOf(measureProps).isRequired,
  onAddMeasure: PropTypes.func
};
