import React, { Component, PropTypes } from 'react';
import QualityReport from './QualityReport';

export default class SelectedMeasure extends Component {
  render() {
    return (
    <div>
      <p>Measure: {this.props.selectedMeasure.name}</p>
      {this.props.qualityReports.map(qr =>
        <QualityReport qualityReport={qr} measure={this.props.selectedMeasure} />
      )}
    </div>
    );
  }
}

SelectedMeasure.displayName = 'SelectedMeasure';

SelectedMeasure.propTypes = {
  requestNewQualityReport: PropTypes.func,
  qualityReports: PropTypes.array,
  selectedMeasure: PropTypes.object.isRequired
};
