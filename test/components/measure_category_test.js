import { renderComponent, expect } from '../test_helper';
import _ from 'lodash';
import { measureTestObject1, measureTestObject2 } from '../test_props';
import MeasureCategory from '../../src/components/MeasureCategory';

describe('MeasureCategory', () => {
  let component;
  let selectedMeasures;
  let props;

  beforeEach(() => {
    selectedMeasures = [ measureTestObject1 ];

    props = {
      category: "Core",
      measures: [ measureTestObject1, measureTestObject2 ],
      selectedMeasures,
      qualityReports: [],
      selectMeasure(measure) { selectedMeasures = _.uniq(_.concat(selectedMeasures, measure)) },
      unselectMeasure(measure) { selectedMeasures = _.pull(selectedMeasures.slice(), measure) },
      fetchNewQualityReport: () => null
    };

    component = renderComponent(MeasureCategory, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('measure-category');
  });

  it('will display both measures', () => {
    expect(component.find(".measure-category-item").length).to.equal(3);
  });

  it('will display the correct text for a measure', () => {
    expect(component.find(".measure-category-item:eq(1)")).to.have.text("123v1 - Controlling BP");
  });

  it('can select a measure', () => {
    component.find('.measure-category-item:eq(2)').simulate('click');
    expect(selectedMeasures).to.eql([ measureTestObject1, measureTestObject2 ]);
  });

  it('can unselect a measure', () => {
    component.find('.measure-category-item:eq(1)').simulate('click');
    expect(selectedMeasures).to.eql([]);
  });

  it('can select all measures', () => {
    component.find('.measure-category-item').first().simulate('click');
    expect(selectedMeasures.length).to.equal(2);
  });

  it('can unselect all measures', () => {
    props.selectedMeasures = [ measureTestObject1, measureTestObject2 ];
    component = renderComponent(MeasureCategory, props);

    component.find('.measure-category-item').first().simulate('click');
    expect(selectedMeasures.length).to.equal(0);
  });
});
