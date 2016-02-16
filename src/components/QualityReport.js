import React, { Component } from 'react';

class QualityReport extends Component {
  render() {
    return (
      <div>
        <p>Measure: {this.props.measure.name}</p>
        {(() => {
          if (this.props.qualityReport.status === "completed") {
            return (<p>Result: {this.props.qualityReport.numerator} / {this.props.qualityReport.denominator}</p>);
          } else {
            return (<p>Loading...</p>);
          }
        })()}
      </div>
    );
  }
}

export default QualityReport;
