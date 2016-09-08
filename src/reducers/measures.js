export function flattenMeasures(measures) {
  let uniqueMeasures = [];
  measures.forEach((m) => {
    var existingMeasure = uniqueMeasures.find((i) => i.cmsId === m.cmsId);
    if (existingMeasure !== undefined) {
      existingMeasure.subMeasures.push({subId: m.subId, subtitle: m.subtitle,
                                        shortSubtitle: m.shortSubtitle});
    } else {
      var newMeasure = {cmsId: m.cmsId, name: m.name, category: m.category,
                        hqmfId: m.hqmfId, description: m.description,
                        continuousVariable: m.continuousVariable,
                        episodeOfCare: m.episodeOfCare,
                        subMeasures: []};
      newMeasure.subMeasures.push({subId: m.subId, subtitle: m.subtitle,
                                        shortSubtitle: m.shortSubtitle});
      uniqueMeasures.push(newMeasure);
    }
  });
  return uniqueMeasures;
}

export function flattenCategories(measures) {
  let categories = [];
  measures.forEach((m) => {
    if (! categories.includes(m.category)) {
      categories.push(m.category);
    }
  });
  return categories.sort();
}
