import { PropTypes } from 'react';

const patientProps = {
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired
};

export default PropTypes.shape(patientProps);
