import { expect } from '../test_helper';

import {
  REQUEST_POPULATION_FULFILLED
} from '../../src/actions/types';

import { populations } from '../../src/reducers/populations';

describe('Populations reducer', () => {
  it('should be able to store a populaton from a quality report', () => {
    const action = {type: REQUEST_POPULATION_FULFILLED, payload: [
      {total: 30, patients: [{first: "Andy"}]},
      {qualityReportId: '1234', population: 'initialPatientPopulation'}
    ]};

    const pops = populations({}, action);

    expect(pops['1234']['initialPatientPopulation'][0].page).to.equal(0);
    expect(pops['1234']['initialPatientPopulation'][0].patients[0].first).to.equal('Andy');

  });

  it('should update an existing quality report with a new population result', () => {
    const action = {type: REQUEST_POPULATION_FULFILLED, payload: [
      {total: 30, patients: [{first: "Fred"}], populationQuery: {offset: 0}},
      {qualityReportId: '1234', population: 'denominator'}
    ]};

    const state = {'1234': {total: 30, initialPatientPopulation: [{page: 0, patients: [{first: "Andy"}]}]}};
    const pops = populations(state, action);
    expect(pops['1234']['initialPatientPopulation'][0].page).to.equal(0);
    expect(pops['1234']['initialPatientPopulation'][0].patients[0].first).to.equal('Andy');
    expect(pops['1234']['denominator'][0].page).to.equal(0);
    expect(pops['1234']['denominator'][0].patients[0].first).to.equal('Fred');
  });
});
