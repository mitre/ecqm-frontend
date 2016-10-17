import {
  FETCH_MEASURES_FULFILLED,
  FETCH_MEASURES_RESOLVED
} from '../actions/types';

function restructureMeasures(measures) {
  let uniqueMeasures = [];

  measures.forEach((measure) => {
    let existingMeasure = uniqueMeasures.find((i) => i.cmsId === measure.cmsId);

    if (existingMeasure !== undefined) {
      existingMeasure.subMeasures.push({ subId: measure.subId,
                                         subtitle: measure.subtitle,
                                         shortSubtitle: measure.shortSubtitle });
    } else {
      let newMeasure = { cmsId: measure.cmsId,
                         name: measure.name,
                         category: measure.category,
                         hqmfId: measure.hqmfId,
                         description: measure.description,
                         continuousVariable: measure.continuousVariable,
                         episodeOfCare: measure.episodeOfCare,
                         subMeasures: [] };
      newMeasure.subMeasures.push({ subId: measure.subId,
                                    subtitle: measure.subtitle,
                                    shortSubtitle: measure.shortSubtitle });
      uniqueMeasures.push(newMeasure);
    }
  });

  return uniqueMeasures;
}

function fetchCategories(measures) {
  let categories = [];

  measures.forEach((measure) => {
    if (categories.indexOf(measure.category) === -1) {
      categories.push(measure.category);
    }
  });

  return categories.sort();
}

export default function({ dispatch }) {
  return next => action => {
    switch (action.type) {
      case FETCH_MEASURES_FULFILLED:
        let payload = {
          measures: restructureMeasures(action.payload),
          categories: fetchCategories(action.payload)
        };

        dispatch({
          type: FETCH_MEASURES_RESOLVED,
          payload: payload
        });

        return;
    }

    return next(action);
  };
}
