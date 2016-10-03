import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import measureProps from '../prop-types/measure';
import CollapsiblePanel from './CollapsiblePanel';

export default class MeasureCategory extends Component {
  isSelected(measure) {
    if (this.props.selectedMeasures.length === 0) {
      return;
    }

    let match = this.props.selectedMeasures.find((selectedMeasure) => {
      return selectedMeasure.cmsId === measure.cmsId;
    });

    return match != null;
  }

  handleMeasureSelection(measure) {
    if (this.props.selectedMeasures.indexOf(measure) != -1) {
      // TODO: remove measure from selectedMeasures
      return;
    }

    this.props.onAddMeasure(measure);
  }

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

              let measureCategoryItemClassNames = classNames('measure-category-item',
                { active: this.isSelected(measure)});

              return (
                <div className={measureCategoryItemClassNames} key={measure.cmsId}
                     onClick={() => this.handleMeasureSelection(measure)}>
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
  selectedMeasures: PropTypes.arrayOf(measureProps).isRequired,
  onAddMeasure: PropTypes.func
};
