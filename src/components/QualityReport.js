import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { VictoryPie } from 'victory';

import qualityReportProps from '../prop-types/quality_report';
import measureProps from '../prop-types/measure';

export default class QualityReport extends Component {
  render() {
    return (
      <div className="quality-report row">
        <div className="col-md-3">{this.props.index === 0 ? this.props.measure.description : ""}</div>
        <div className="col-md-2">{this.submeasureDisplay()}</div>
        <div className="col-md-1">{this.measureIcon()}</div>
        <div className="col-md-3">{this.resultsTable()}</div>
        <div className="col-md-3">{this.resultsDoughnut()}</div>
      </div>
    );
  }

  measureIcon() {
    if (this.props.index === 0) {
      if (this.props.measure.episodeOfCare && !this.props.measure.continuousVariable) {
        return <i className="fa fa-stethoscope" aria-hidden="true"></i>;
      }
      if (this.props.measure.continuousVariable) {
        return <i className="fa fa-tachometer" aria-hidden="true"></i>;
      }
      return <i className="fa fa-user" aria-hidden="true"></i>;
    } else {
      return "";
    }
  }

  resultsDoughnut() {
    if (this.props.qualityReport.status.state === "completed" &&
        this.props.qualityReport.result.numerator > 0 &&
        this.props.qualityReport.result.denominator > 0 &&
        this.props.measure.continuousVariable === false) {

      let outliers = this.props.qualityReport.result.denominator - this.props.qualityReport.result.numerator
                    - this.props.qualityReport.result.exclusion - this.props.qualityReport.result.exception;
      let data = [{x: "Numerator", y: this.props.qualityReport.result.numerator},
                  {x: "Outliers", y: outliers }];
      let colorScale = ["#3B858C", "#EFEFEF"];

      if (this.props.qualityReport.result.exclusion > 0) {
        data.push({x: "Exclusions", y: this.props.qualityReport.result.exclusion});
        colorScale.push("#C1C1C1");
      }

      if (this.props.qualityReport.result.exception > 0) {
        data.push({x: "Exceptions", y: this.props.qualityReport.result.exception});
        colorScale.push("#C1C1C1");
      }

      return (
        <VictoryPie data={data} colorScale={colorScale} innerRadius={110}
          style={{
            labels: {
              fill: "black",
              fontSize: 20,
              fontWeight: "bold",
              padding: 0
            }
          }}
        />
      );
    } else {
      return "";
    }
  }

  resultsTable() {
    if (this.props.qualityReport.status.state === "completed") {
      return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Population</th>
              <th>Count</th>
            </tr>
          </thead>
          {this.props.measure.continuousVariable ? this.continuousVariableTableBody() : this.proportionTableBody()}
        </table>
      );
    } else {
      return (<p>Loading...</p>);
    }
  }

  proportionTableBody() {
    return (
      <tbody>
        <tr>
          <td>Numerator</td>
          <td>{this.props.qualityReport.result.numerator}</td>
        </tr>
        <tr>
          <td>Denominator</td>
          <td>{this.props.qualityReport.result.denominator}</td>
        </tr>
        <tr>
          <td>Exceptions</td>
          <td>{this.props.qualityReport.result.exception}</td>
        </tr>
        <tr>
          <td>Exclusions</td>
          <td>{this.props.qualityReport.result.exclusion}</td>
        </tr>
      </tbody>
    );
  }

  continuousVariableTableBody() {
    return (
      <tbody>
        <tr>
          <td>Measure Population</td>
          <td>{this.props.qualityReport.result.measurePopulation}</td>
        </tr>
        <tr>
          <td>Observation</td>
          <td>{this.props.qualityReport.result.observation}</td>
        </tr>
      </tbody>
    );
  }

  submeasureDisplay() {
    if (this.props.measure.subMeasures.length == 1) {
      return <Link to={`/Populations/${this.props.qualityReport.id}`}>Populations</Link>;
    } else {
      let sub = this.props.measure.subMeasures.find((sm) => sm.subId === this.props.qualityReport.subId);
      return <Link to={`/Populations/${this.props.qualityReport.id}`}>{sub.subtitle}</Link>;
    }
  }
}

QualityReport.displayName = 'QualityReport';

QualityReport.propTypes = {
  measure: measureProps.isRequired,
  qualityReport: qualityReportProps.isRequired,
  index: PropTypes.number.isRequired
};
