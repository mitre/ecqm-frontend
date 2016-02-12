import React, { Component } from 'react';
import { Link } from 'react-router'

export default class TeamTable extends Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th colSpan="3"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example Team</td>
            <td><Link to="/">View Providers</Link></td>
            <td><Link to="/">Edit</Link></td>
            <td><a href="#">Delete</a></td>
          </tr>
        </tbody>
      </table>
    );
  }
}
