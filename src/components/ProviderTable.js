import React, { Component } from 'react';
import { Link } from 'react-router';

const providerList = [
  {"id":"5615d1a93f66fa6e03000000","cda_identifiers":[{"_id":"5615d1a93f66fa6e03000002","extension":"123456790","root":"2.16.840.1.113883.4.2"},{"_id":"5615d1a93f66fa6e03000003","extension":"9238429385","root":"2.16.840.1.113883.4.6"}],"family_name":"Doe","given_name":"John","level":null,"organization":{"_id":"5615d1a93f66fa6e03000001","name":"General Hospital"},"parent_id":null,"parent_ids":[],"phone":"15555555556","specialty":"200000000X","title":"Dr.","npi":"1234567890","patient_count":1,"children":[],"parent":null},
  {"id":"5615d1a93f66fa6e03000004","cda_identifiers":[{"_id":"5615d1a93f66fa6e03000006","extension":"123456791","root":"2.16.840.1.113883.4.2"},{"_id":"5615d1a93f66fa6e03000007","extension":"9238429386","root":"2.16.840.1.113883.4.6"}],"family_name":"Doe","given_name":"Jane","level":null,"organization":{"_id":"5615d1a93f66fa6e03000005","name":"General Hospital"},"parent_id":null,"parent_ids":[],"phone":"15555555557","specialty":"200000000X","title":"Dr.","npi":"0123456789","patient_count":0,"children":[],"parent":null}
];

export default class ProviderTable extends Component {
  render() {
    return (
      <div>
        <p className="input-group">
          <input type="text" className="form-control provider-search" placeholder="Search for Provider by Name, NPI, Tax ID, or Phone Number" />
          <span className="input-group-btn"><button className="btn btn-default clear-search" type="button">&times;</button></span>
        </p>
        <div className="providerTable">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="pid">Provider NPI</th>
                <th>Provider Type</th>
                <th>Provider Extension</th>
                <th>Provider Name</th>
                <th>Tax ID</th>
                <th>Phone</th>
                <th>Team</th>
                {/*if admin*/}
                  <th>Practice Name</th>
                {/*/if*/}
              </tr>
            </thead>
            <tbody>
              {providerList.map((provider) =>
                <tr>
                  <td><Link to="/">{provider.npi}</Link></td>
                  <td>{providerType(provider)}</td>
                  <td><Link to="/">{providerExtension(provider)}</Link></td>
                  <td><Link to="/">{`${provider.given_name} ${provider.family_name}`}</Link></td>
                  <td>{provider.tin}</td>
                  <td>{provider.phone}</td>
                  <td>{/* provider team name */}</td>
                  {/*if admin*/}
                    <td>{/* provider practice name */}</td>
                  {/*/if*/}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ProviderTable.displayName = 'ProviderTable';

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
