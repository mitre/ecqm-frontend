import { PropTypes } from 'react';

const qualityReportProps = {
  effectiveDate: PropTypes.number,
  id: PropTypes.string,
  measureId: PropTypes.string.isRequired,
  result: PropTypes.shape({
    antinumerator: PropTypes.number,
    numerator: PropTypes.number,
    denominator: PropTypes.number,
    exception: PropTypes.number,
    exclusion: PropTypes.number,
    initialPatientPopulation: PropTypes.number
  }),
  status: PropTypes.shape({
    state: PropTypes.string.isRequired
  }).isRequired
};

export default PropTypes.shape(qualityReportProps);
