import React, { Component, PropTypes } from 'react';
import { requestNewQualityReport } from '../actions/qualityReports';
import { connect } from 'react-redux';
import QualityReport from './QualityReport';

class SelectedMeasure extends Component {
  componentDidMount() {
    this.props.requestNewQualityReport(this.props.selectedMeasure);
  }

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

const mapStateToProps = (state, ownProps) => {
  var props = {};
  if (state.qualityReports) {
    props.qualityReports = state.qualityReports.filter(qr => qr.measureId === ownProps.selectedMeasure.hqmfId);
  } else {
    props.qualityReports = [];
  }
  return Object.assign(props, ownProps);
};

SelectedMeasure.displayName = 'SelectedMeasure';

SelectedMeasure.propTypes = {
  requestNewQualityReport: PropTypes.func,
  qualityReports: PropTypes.array,
  selectedMeasure: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { requestNewQualityReport })(SelectedMeasure);
