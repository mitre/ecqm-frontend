import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import CollapsiblePanel from './CollapsiblePanel';

import measureProps from '../prop-types/measure';
import qualityReportProps from '../prop-types/quality_report';

export default class MeasureCategory extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      allSelected: this.props.measures.length === this.props.selectedMeasures.length
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.measures.length === nextProps.selectedMeasures.length) {
      this.setState({ allSelected: true });
    } else {
      this.setState({ allSelected: false });
    }
  }

  isSelected(measure) {
    if (this.props.selectedMeasures.length === 0) {
      return;
    }

    let match = this.props.selectedMeasures.find((selectedMeasure) => {
      return selectedMeasure.cmsId === measure.cmsId;
    });

    return match != null;
  }

  selectMeasures(measures) {
    measures.forEach((measure) => {
      this.props.selectMeasure(measure);

      let qualityReport;
      if (this.props.qualityReports == null) {
        qualityReport = null;
      } else {
        qualityReport = this.props.qualityReports.find((qualityReport) => {
          return qualityReport.measureId === measure.hqmfId;
        });
      }

      if (qualityReport == null) {
        this.props.fetchNewQualityReport(measure);
      }
    });
  }

  unselectMeasures(measures) {
    measures.forEach((measure) => this.props.unselectMeasure(measure));
  }

  handleMeasureSelection(measure) {
    if (this.props.selectedMeasures.indexOf(measure) != -1) {
      this.unselectMeasures([ measure ]); // measure already selected
    } else {
      this.selectMeasures([ measure ]);   // measure not selected
    }
  }

  handleSelectUnselectAll() {
    if (this.state.allSelected) {
      this.unselectMeasures(this.props.measures); // unselect all
    } else {
      this.selectMeasures(this.props.measures);   // select all
    }
  }

  renderedSelectText() {
    return this.state.allSelected ? 'Unselect All' : 'Select All';
  }

  render() {
    return (
      <div className="measure-category">
        <CollapsiblePanel panelTitle={this.props.category}>
          <div>
            <div className="measure-category-item" onClick={() => this.handleSelectUnselectAll()}>
              <span className="measure-category-item-all">
                {this.renderedSelectText()}
              </span>
            </div>

            {this.props.measures.map(measure => {
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
  qualityReports: PropTypes.arrayOf(qualityReportProps).isRequired,
  selectMeasure: PropTypes.func.isRequired,
  unselectMeasure: PropTypes.func.isRequired,
  fetchNewQualityReport: PropTypes.func.isRequired
};
