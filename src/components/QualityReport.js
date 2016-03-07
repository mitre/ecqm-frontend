import React, { Component, PropTypes } from 'react';

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
  measure: PropTypes.shape({
    name: PropTypes.string.isRequired,
    subMeasures: PropTypes.array.isRequired
  }),
  qualityReport: PropTypes.shape({
    result: PropTypes.shape({
      numerator: PropTypes.number,
      denominator: PropTypes.number
    }),
    subId: PropTypes.string,
    status: PropTypes.shape({
      state: PropTypes.string.isRequired
    })
  })
};
