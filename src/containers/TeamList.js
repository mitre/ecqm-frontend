import React, { Component } from 'react';
import { Link } from 'react-router';

import TeamTable from '../components/TeamTable';

export default class TeamList extends Component {
  render() {
    return (
      <div className="main userTeams">
        <h1>User Teams</h1>
        <Link to="/teams/new" className="btn btn-primary pull-right btn-margin">New Team</Link>
        <TeamTable />
      </div>
    )
  }
}
