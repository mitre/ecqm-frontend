import { renderComponent, expect } from '../test_helper';
import { measureTestObject3, qualityReportTestObject1 } from '../test_props';
import QualityReport from '../../src/components/QualityReport';

describe('QualityReport', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      index: 0,
      measure: measureTestObject3,
      qualityReport: qualityReportTestObject1
    };

    component = renderComponent(QualityReport, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('quality-report');
  });

  it('will display the proper measure subtitle', () => {
    expect(component.find(".col-md-2").first()).to.have.text('18-24');
    props.qualityReport.subId = 'b';
    component = renderComponent(QualityReport, props);
    expect(component.find(".col-md-2").first()).to.have.text('25-30');
  });

  it('will display the proper measure icon', () => {
    expect(component.find(".fa-user")).to.exist;
    expect(component.find(".fa-stethoscope")).to.not.exist;
    props.measure.episodeOfCare = true;
    component = renderComponent(QualityReport, props);
    expect(component.find(".fa-stethoscope")).to.exist;
  });

  it('will display a table of results', () => {
    expect(component.find("tbody tr td").first()).to.have.text('Numerator');
    expect(component.find("tbody tr td:nth-child(2)").first()).to.have.text('2');
  });

  it('will not display an icon if it is not the first row', () => {
    props.index = 1;
    let component = renderComponent(QualityReport, props);
        expect(component.find(".fa")).to.not.exist;
  });
});
