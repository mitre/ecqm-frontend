import React, { Component, PropTypes } from 'react';
import QualityReport from './QualityReport';

import measureProps from '../prop-types/measure';
import qualityReportProps from '../prop-types/quality_report';

export default class SelectedMeasure extends Component {
  render() {
    return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{this.props.selectedMeasure.name}</h3>
      </div>
      <div className="panel-body">
      {this.props.qualityReports.map((qr, index) => {
        let key;
        if (qr.id) {
          key = qr.id;
        } else {
          key = qr.measureId;
          if (qr.subId) {
            key += qr.subId;
          }
        }
        return <QualityReport qualityReport={qr} index={index} measure={this.props.selectedMeasure} key={key} />;
      })}
      </div>
    </div>
    );
  }
}

SelectedMeasure.displayName = 'SelectedMeasure';

SelectedMeasure.propTypes = {
  qualityReports: PropTypes.arrayOf(qualityReportProps).isRequired,
  selectedMeasure: measureProps.isRequired
};
