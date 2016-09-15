import { renderComponent, expect } from '../test_helper';
import QualityReport from '../../src/components/QualityReport';

describe('QualityReport', () => {
  let props;

  beforeEach(() => {
    props = {
      index: 0,
      measure: {subMeasures: [{subId: 'a', subtitle: '18-24'}, {subId: 'b', subtitle: '25-30'}],
                hqmfId: '1234', name: 'Fake', category: 'Core', cmsId: "999v3", description: 'A fake measure'},
      qualityReport: {subId: 'a', status: {state: "completed"}, measureId: '1234',
                      result: {initialPatientPopulation: 5, numerator: 2, denominator: 3}}
    };

  });

  it('will display the proper measure subtitle', () => {
    let component = renderComponent(QualityReport, props);
    expect(component.find(".col-md-1").first()).to.have.text('18-24');
    props.qualityReport.subId = 'b';
    component = renderComponent(QualityReport, props);
    expect(component.find(".col-md-1").first()).to.have.text('25-30');
  });

  it('will display the proper measure icon', () => {
    let component = renderComponent(QualityReport, props);
    expect(component.find(".fa-user")).to.exist;
    expect(component.find(".fa-stethoscope")).to.not.exist;
    props.measure.episodeOfCare = true;
    component = renderComponent(QualityReport, props);
    expect(component.find(".fa-stethoscope")).to.exist;
  });

  it('will display a table of results', () => {
    let component = renderComponent(QualityReport, props);
    expect(component.find("tbody tr td").first()).to.have.text('Numerator');
    expect(component.find("tbody tr td:nth-child(2)").first()).to.have.text('2');
  });

  it('will not display an icon if it is not the first row', () => {
    props.index = 1;
    let component = renderComponent(QualityReport, props);
        expect(component.find(".fa")).to.not.exist;
  });
});
