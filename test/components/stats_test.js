import { renderComponent , expect } from '../test_helper';
import Stats from '../../src/components/Stats';

describe('Stats' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Stats);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('stats');
  });
});
