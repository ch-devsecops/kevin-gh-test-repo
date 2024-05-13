/**
 * flatten the nest properties of engine models
 * @param {array<string>}detIds
 * @param {array<string>}data
 * @returns {*[]}
 */
export function getEngineModels(detIds, data) {
  const ret = [];
  detIds?.forEach(detId => {
    data?.forEach(category => {
      category?.crankshafts?.forEach(crankshaft => {
        const match = crankshaft?.models?.find(
          model => model?.detIdentifier?.value === detId && !ret?.find(item => item?.detIdentifier?.value === detId),
        );

        if (match) {
          match.seriesName = category.name;
          match.crankshaftName = crankshaft.name;
          ret.push(match);
        }
      });
    });
  });
  return ret;
}

/**
 * flatten the nest properties of marine models
 * @param detIds
 * @param data
 * @returns {*[]}
 */
export function getMarineModels(detIds, data) {
  const ret = [];
  detIds?.forEach(detId => {
    data?.forEach(category => {
      const match = category?.models?.find(
        model => model?.detIdentifier?.value === detId && !ret?.find(item => item?.detIdentifier?.value === detId),
      );

      if (match) {
        match.seriesName = category.name;
        match.crankshaftName = category.models.name;
        ret.push(match);
      }
    });
  });
  return ret;
}
