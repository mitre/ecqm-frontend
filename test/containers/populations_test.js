import { expect } from '../test_helper';
import { mapStateToProps } from '../../src/containers/Populations';

describe('Populations mapStateToProps', () => {
  it('should provide a loading measure when definitions are not there', () => {
    const props = mapStateToProps({qualityReports: [], populations: {}}, {params: {qualityReportId: '1234'}});
    expect(props.measure.name).to.equal('Loading');
  });

  it('should create empty patient population arrays on load', () => {
    const props = mapStateToProps({qualityReports: [], populations: {}}, {params: {qualityReportId: '1234'}});
    expect(props.initialPatientPopulation).to.eql([]);
    expect(props.denominator).to.eql([]);
  });

  it('should load the measure', () => {
    const props = mapStateToProps({qualityReports: [{id: '1234', measureId: '5678'}],
      populations: {1234: {}}, definitions: {measures: [{hqmfId: '5678', name: 'Fake Measure'}]}}, {params: {qualityReportId: '1234'}});
    expect(props.measure.name).to.eql("Fake Measure");
  });

  it('should load a population', () => {
    const props = mapStateToProps({qualityReports: [{id: '1234', measureId: '5678'}],
      populations: {1234: {initialPatientPopulation: [
        {page: 0, patients: [{first: 'Fake Name'}]}
      ]}}, definitions: {measures: [{hqmfId: '5678', name: 'Fake Measure'}]}}, {params: {qualityReportId: '1234'}});
    expect(props.initialPatientPopulation[0].patients[0].first).to.eql("Fake Name");
  });

});
