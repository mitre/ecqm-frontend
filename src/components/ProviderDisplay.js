import React, { Component } from 'react';
import MeasureDisplay from './MeasureDisplay';

// fake provider model
const provider = {"id":"5615d1a93f66fa6e03000000","cda_identifiers":[{"_id":"5615d1a93f66fa6e03000002","extension":"123456790","root":"2.16.840.1.113883.4.2"},{"_id":"5615d1a93f66fa6e03000003","extension":"9238429385","root":"2.16.840.1.113883.4.6"}],"family_name":"Doe","given_name":"John","level":null,"organization":{"_id":"5615d1a93f66fa6e03000001","name":"General Hospital"},"parent_id":null,"parent_ids":[],"phone":"15555555556","specialty":"200000000X","title":"Dr.","npi":"1234567890","patient_count":56,"children":[],"parent":null};

export default class ProviderDisplay extends Component {
  render() {
    return (
      <div>
        <div className="effective-date pull-right row-inline">
          <h5 className="effective-date-header">
            <b>Reporting Period:</b> 12/31/2012 &mdash; <input type="text" className="effective-date-picker" placeholder="mm/dd/yyyy" value="12/31/2013" />
            <button className="effective-date-btn btn-primary"><i className="glyphicon glyphicon-refresh"/></button>
          </h5>
        </div>
        <h2>{providerType(provider)}: {providerExtension(provider)}, {provider.title} {provider.given_name} {provider.family_name}</h2>
        <h2># of Patients: {provider.patient_count}</h2>

        <h4>{provider.specialty}</h4>
        <h4>{provider.organization && provider.organization.name}</h4>

        <br />

        <div className="row">
          <div className="col-md-3">
            <dl className="dl-horizontal">
              <dt>Tax ID:</dt>
              <dd>{provider.tin || 'N/A'}</dd>
              <dt>Phone:</dt>
              <dd>{provider.phone || 'N/A'}</dd>
              <dt className="text-muted">Team:</dt>
              <dd className="text-muted">{(provider.team && provider.team.name) ? provider.team.name : 'N/A'}</dd>
              <dt className="text-muted">NPI:</dt>
              <dd className="text-muted">{provider.npi || 'N/A'}</dd>
            </dl>
          </div>
          <div className="col-md-9" id="providerChart"></div>
        </div>

        <div className="row">
          <MeasureDisplay />
        </div>
      </div>
    );
  }
}

function providerType(provider) {
  let identifier = provider.cda_identifiers && provider.cda_identifiers[0];
  let root = identifier ? identifier.root : null;

  if (root === '2.16.840.1.113883.4.6') {
    return 'NPI';
  }

  return root;
}

function providerExtension(provider) {
  let identifier = provider.cda_identifiers && provider.cda_identifiers[0];
  return identifier ? identifier.extension : '';
}
