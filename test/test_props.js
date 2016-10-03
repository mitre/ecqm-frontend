export const measureTestObject1 = {
  cmsId: '123v1',
  name: 'Controlling BP',
  description: '',
  hqmfId: '1234',
  category: 'Core'
};

export const measureTestObject2 = {
  cmsId: '124v1',
  name: 'Controlling Weight',
  description: '',
  hqmfId: '5678',
  category: 'Core'
}

export const measureTestObject3 = {
  cmsId: "999v3",
  name: 'Fake',
  description: 'A fake measure',
  hqmfId: '1234',
  category: 'Core',
  subMeasures: [ { subId: 'a', subtitle: '18-24'},
                 { subId: 'b', subtitle: '25-30'} ]
}

export const patientTestObject1 = {
  patientId: '1',
  first: 'John',
  last: 'Doe',
  gender: 'M'
}

export const patientTestObject2 = {
  patientId: '2',
  first: 'Jane',
  last: 'Smith',
  gender: 'F'
}

export const qualityReportTestObject1 = {
  id: 'qr1',
  subId: 'a',
  status: { state: "completed" },
  measureId: '1234',
  result: { initialPatientPopulation: 5,
            numerator: 2,
            denominator: 3 }
}

export const initialPatientPopulationTestObject1 = {
  patients: [ patientTestObject1, patientTestObject2 ],
  qualityReportId: 'qr1',
  populationQuery: {
    effectiveDate: 20160101,
    limit: 20,
    measureId: 'm1',
    offset: 0,
    population: 'initialPatientPopulation',
    subId: 'a'
  },
  total: 2
}

export const numeratorPopulationTestObject1 = {
  patients: [ patientTestObject1, patientTestObject2 ],
  qualityReportId: 'qr1',
  populationQuery: {
    effectiveDate: 20160101,
    limit: 20,
    measureId: 'm1',
    offset: 0,
    population: 'numerator',
    subId: 'a'
  },
  total: 2
}

export const denominatorPopulationTestObject1 = {
  patients: [ patientTestObject1, patientTestObject2 ],
  qualityReportId: 'qr1',
  populationQuery: {
    effectiveDate: 20160101,
    limit: 20,
    measureId: 'm1',
    offset: 0,
    population: 'denominator',
    subId: 'a'
  },
  total: 2
}

export const outlierPopulationTestObject1 = {
  patients: [ patientTestObject1, patientTestObject2 ],
  qualityReportId: 'qr1',
  populationQuery: {
    effectiveDate: 20160101,
    limit: 20,
    measureId: 'm1',
    offset: 0,
    population: 'outlier',
    subId: 'a'
  },
  total: 2
}
