import { expect } from '../test_helper';

import { flattenCategories, flattenMeasures } from '../../src/reducers/measures';

describe('Measure reducers', () => {
  it('should flatten categories', () => {
    const measures = [{category: 'Core'}, {category: 'Core'},
                    {category: 'AMI'}, {category: 'Diabetes'}];

    const categories = flattenCategories(measures);
    expect(categories.length).to.equal(3);
    expect(categories[0]).to.equal('AMI');
  });

  it('should flatten measures', () => {
    const measures = [{cmsId: 'a', name: 'BP Control', subId: 'a1'}, {cmsId: 'a', name: 'BP Control', subId: 'a2'},
                    {cmsId: 'b', name: 'Flu Shot'}, {cmsId: 'c', name: 'BMI'}];
    const flattened = flattenMeasures(measures);
    expect(flattened.length).to.equal(3);
    const bpControl = flattened.find((m) => m.cmsId === 'a');
    expect(bpControl.subMeasures.length).to.equal(2);
  });
});
