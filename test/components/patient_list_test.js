import { renderComponent , expect } from '../test_helper';
import { patientTestObject1, patientTestObject2 } from '../test_props';
import PatientList from '../../src/components/PatientList';

describe('PatientList' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patients: [ patientTestObject1, patientTestObject2 ],
      total: 2,
      onPaginate: () => null
    };

    component = renderComponent(PatientList, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('patient-list');
  });
});
