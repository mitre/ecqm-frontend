import { PropTypes } from 'react';
import patientProps from './patient';

const populationProps = {
  patients: PropTypes.arrayOf(patientProps),
  qualityReportId: PropTypes.string,
  populationQuery: PropTypes.shape({
    effectiveDate: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    measureId: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
    population: PropTypes.string.isRequired,
    subId: PropTypes.string
  }),
  total: PropTypes.number
};

export default PropTypes.shape(populationProps);
