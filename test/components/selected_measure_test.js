import { renderComponent , expect } from '../test_helper';
import { qualityReportTestObject1, measureTestObject3 } from '../test_props';
import SelectedMeasure from '../../src/components/SelectedMeasure';

describe('SelectedMeasure' , () => {
  let component;

  beforeEach(() => {
    let props = {
      qualityReports: [ qualityReportTestObject1 ],
      selectedMeasure: measureTestObject3
    };

    component = renderComponent(SelectedMeasure, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('selected-measure');
  });
});
