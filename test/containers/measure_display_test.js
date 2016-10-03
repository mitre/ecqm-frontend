import { renderComponent , expect } from '../test_helper';
import MeasureDisplay from '../../src/containers/MeasureDisplay';

describe('MeasureDisplay' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(MeasureDisplay);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('measure-display');
  });
});
