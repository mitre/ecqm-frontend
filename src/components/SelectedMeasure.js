import React, { Component, PropTypes } from 'react';
import QualityReport from './QualityReport';

import measureProps from '../prop-types/measure';
import qualityReportProps from '../prop-types/quality_report';

export default class SelectedMeasure extends Component {
  render() {
    return (
    <div>
      <p>Measure: {this.props.selectedMeasure.name}</p>
      {this.props.qualityReports.map((qr) => {
        let key;
        if (qr.id) {
          key = qr.id;
        } else {
          key = qr.measureId;
          if (qr.subId) {
            key += qr.subId;
          }
        }
        return <QualityReport qualityReport={qr} measure={this.props.selectedMeasure} key={key} />;
      })}
    </div>
    );
  }
}

SelectedMeasure.displayName = 'SelectedMeasure';

SelectedMeasure.propTypes = {
  qualityReports: PropTypes.arrayOf(qualityReportProps).isRequired,
  selectedMeasure: measureProps.isRequired
};
