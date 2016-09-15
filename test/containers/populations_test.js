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
});
