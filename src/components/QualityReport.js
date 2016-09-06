import React, { Component } from 'react';

import qualityReportProps from '../prop-types/quality_report';
import measureProps from '../prop-types/measure';

export default class QualityReport extends Component {
  render() {
    return (
      <div>
        <p>{this.submeasureDisplay()}</p>
        {(() => {
          if (this.props.qualityReport.status.state === "completed") {
            return (<p>Result: {this.props.qualityReport.result.numerator} / {this.props.qualityReport.result.denominator}</p>);
          } else {
            return (<p>Loading...</p>);
          }
        })()}
      </div>
    );
  }

  submeasureDisplay() {
    if (this.props.measure.subMeasures.length == 1) {
      return "";
    } else {
      var sub = this.props.measure.subMeasures.find((sm) => sm.subId === this.props.qualityReport.subId);
      return sub.subtitle;
    }
  }
}

QualityReport.displayName = 'QualityReport';

QualityReport.propTypes = {
  measure: measureProps.isRequired,
  qualityReport: qualityReportProps.isRequired
};
