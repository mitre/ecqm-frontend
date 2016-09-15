import React, { Component, PropTypes } from 'react';

import measureProps from '../prop-types/measure';
import CollapsiblePanel from './CollapsiblePanel';

export default class MeasureCategory extends Component {
  render() {
    return (
      <div className="measure-category">
        <CollapsiblePanel panelTitle={this.props.category}>
          <div>
            {/*<div className="measure-category-item">
              <span className="measure-category-item-all">Select All</span>
            </div>*/}

            {this.props.measures.map(measure => {
              var boundAddMeasure = this.props.onAddMeasure.bind(this, measure);
              return (
                <div className="measure-category-item" key={measure.cmsId} onClick={boundAddMeasure}>
                  <span className="measure-category-item-id">{measure.cmsId} - </span>
                  <span className="measure-category-item-name">{measure.name}</span>
                </div>
              );
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
