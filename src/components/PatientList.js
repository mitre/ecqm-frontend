import React, { Component, PropTypes } from 'react';

import patientProps from '../prop-types/patient';

export default class PatientList extends Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Gender</th>
            <th>FHIR Record</th>
          </tr>
        </thead>
        <tbody>
        {this.props.patients.map((p) => {
          return (
            <tr key={p.patientId}>
              <td>{p.first}</td>
              <td>{p.last}</td>
              <td>{p.gender}</td>
              <td><a href={`/Patient/${p.patientId}`}>{p.patientId}</a></td>
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  }
}

PatientList.displayName = "PatientList";

PatientList.propTypes = {
  patients: PropTypes.arrayOf(patientProps).isRequired
};
