import React, { Component, PropTypes } from 'react';
import ReactPaginate from 'react-paginate';

import patientProps from '../prop-types/patient';

const PATIENTS_PER_PAGE = 20;

export default class PatientList extends Component {
  constructor(...args) {
    super(...args);

    this.state = { currentPage: 1 };
  }

  renderedPatient(patient) {
    if (patient == null) { return; }

    return (
      <tr key={patient.patientId}>
        <td>{patient.first}</td>
        <td>{patient.last}</td>
        <td>{patient.gender}</td>
        <td><a href={`/Patient/${patient.patientId}`}>{patient.patientId}</a></td>
      </tr>
    );
  }

  handlePageClick(data) {
    let currentPage = data.selected + 1;
    let offset = (currentPage - 1) * PATIENTS_PER_PAGE;
    this.props.onPaginate(offset);
    this.setState({ currentPage });
  }

  renderReactPaginate() {
    let totalPages = Math.ceil(this.props.total / PATIENTS_PER_PAGE);
    if (totalPages <= 1) { return; }

    return (
      <div className="pagination-centered">
        <ReactPaginate previousLabel={"«"}
             nextLabel={"»"}
             breakLabel={<span>...</span>}
             pageNum={totalPages}
             marginPagesDisplayed={2}
             pageRangeDisplayed={5}
             clickCallback={this.handlePageClick.bind(this)}
             containerClassName={"pagination"}
             subContainerClassName={"pages pagination"}
             activeClassName={"active"} />
      </div>
    );
  }

  render() {
    return (
      <div className="patient-list">
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
            {this.props.patients.map((patient) => this.renderedPatient(patient))}
          </tbody>
        </table>

        {this.renderReactPaginate()}
      </div>
    );
  }
}

PatientList.displayName = "PatientList";

PatientList.propTypes = {
  patients: PropTypes.arrayOf(patientProps).isRequired,
  total: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired
};
