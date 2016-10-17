import { renderComponent , expect } from '../test_helper';
import Dashboard from '../../src/containers/Dashboard';

describe('Dashboard' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Dashboard);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('dashboard');
  });
});
