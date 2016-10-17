import { expect, renderComponent } from '../test_helper';
import { measureTestObject1, qualityReportTestObject1, initialPatientPopulationTestObject1,
         numeratorPopulationTestObject1, denominatorPopulationTestObject1,
         outlierPopulationTestObject1 } from '../test_props';
import Populations, { mapStateToProps } from '../../src/containers/Populations';

describe('Populations' , () => {
  let component;

  beforeEach(() => {
    let props = {
      patientCount: 2,
      measure: measureTestObject1,
      qualityReport: qualityReportTestObject1,
      params: { qualityReportId: '1' },
      initialPatientPopulation: initialPatientPopulationTestObject1,
      numeratorPopulation: numeratorPopulationTestObject1,
      denominatorPopulation: denominatorPopulationTestObject1,
      outlierPopulation: outlierPopulationTestObject1,
      fetchInitialPatientPopulation: () => null,
      fetchNumeratorPopulation: () => null,
      fetchDenominatorPopulation: () => null,
      fetchOutlierPopulation: () => null,
      fetchMeasures: () => null,
      fetchQualityReport: () => null,
      fetchPatients: () => null
    };

    component = renderComponent(Populations, props);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('populations');
  });

  describe('Populations mapStateToProps', () => {
    let mappedProps;

    beforeEach(() => {
      mappedProps = mapStateToProps({
        patient: { patientCount: 2 },
        qualityReport: { qualityReports: [] },
        measure: { measures: [] },
        population: { initialPatientPopulation: {},
                      numeratorPopulation: {},
                      denominatorPopulation: {},
                      outlierPopulation: {} } },
      { params: { qualityReportId: '1234' }
      });
    });

    it('should provide a loading measure when definitions are not there', () => {
      expect(mappedProps.measure.name).to.equal('Loading');
    });

    it('should create empty patient population objects on load', () => {
      expect(mappedProps.initialPatientPopulation).to.eql({});
      expect(mappedProps.numeratorPopulation).to.eql({});
      expect(mappedProps.denominatorPopulation).to.eql({});
      expect(mappedProps.outlierPopulation).to.eql({});
    });

    it('should load the measure correctly', () => {
      mappedProps = mapStateToProps({
        patient: { patientCount: 2 },
        qualityReport: { qualityReports: [ qualityReportTestObject1 ] },
        measure: { measures: [ measureTestObject1 ] },
        population: { initialPatientPopulation: {},
                      numeratorPopulation: {},
                      denominatorPopulation: {} } },
      { params: { qualityReportId: 'qr1' }
      });

      expect(mappedProps.measure.name).to.eql("Controlling BP");
    });

    it('should load a population correctly', () => {
      mappedProps = mapStateToProps({
        patient: { patientCount: 2 },
        qualityReport: { qualityReports: [ qualityReportTestObject1 ] },
        measure: { measures: [ measureTestObject1 ] },
        population: { initialPatientPopulation: initialPatientPopulationTestObject1,
                      numeratorPopulation: {},
                      denominatorPopulation: {} } },
      { params: { qualityReportId: 'qr1' }
      });

      expect(mappedProps.initialPatientPopulation.patients[0].first).to.eql("John");
    });
  });
});
