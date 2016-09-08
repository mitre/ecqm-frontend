import { PropTypes } from 'react';

const measureProps = {
  category: PropTypes.string.isRequired,
  cmsId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  hqmfId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  continuousVariable: PropTypes.bool,
  episodeOfCare: PropTypes.bool,
  subMeasures: PropTypes.arrayOf(PropTypes.shape({
    shortSubtitle: PropTypes.string,
    subtitle: PropTypes.string,
    subId: PropTypes.string
  }))
};

export default PropTypes.shape(measureProps);
