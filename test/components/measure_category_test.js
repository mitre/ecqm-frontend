import { renderComponent, expect } from '../test_helper';
import MeasureCategory from '../../src/components/MeasureCategory';

describe('MeasureCategory', () => {
  let component;

  beforeEach(() => {
    const props = {
      category: "Core",
      measures: [{cmsId: "123v1", name: "Controlling BP", description: "", hqmfId: "1234", category: "Core"},
                 {cmsId: "124v1", name: "Controlling Weight", description: "", hqmfId: "5678", category: "Core"}],
      onAddMeasure: (measure) => {
        expect(measure.hqmfId).to.equal("1234");
      }
    };
    component = renderComponent(MeasureCategory, props);
  });

  it('will display both measures', () => {
    expect(component.find("button").length).to.equal(3); // two measures + select all
  });

  it('will select the correct measure', () => {
    component.find(".individual").first().simulate("click");
  });

  it('will display the correct text for a measure', () => {
    expect(component.find(".individual").first()).to.have.text("123v1 - Controlling BP");
  });

});
