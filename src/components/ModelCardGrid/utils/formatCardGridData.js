import flatten from 'lodash/flatten';
import groupBy from 'lodash/groupBy';

import { createObjectFromProps } from '../../../utils/object';

const formatCardGridData = data => {
  const modelsData = createObjectFromProps(data);

  if (!Array.isArray(modelsData) && !modelsData?.length) return [];

  const value = modelsData.map(model => {
    const modelYears = model?.modelYears;

    if (Array.isArray(modelYears) && modelYears.length) {
      const modelCards = modelYears.map(modelYear => {
        const defaultTrim = modelYear?.defaultTrim;
        const trims = modelYear?.trims;
        const defaultTrimName = trims?.find(trim => trim?.detIdentifier === defaultTrim?.detIdentifier)?.name;

        // Merge filters from all trims
        const allTrimsFilters = flatten(trims.map(trim => trim?.filters?.items));
        const allFiltersByName = groupBy(allTrimsFilters, filter => filter?.filterCategory?.name);
        // simplify data structure to a dictionary of { [ key: string ] : string[] }
        const filters = Object.fromEntries(
          Object.entries(allFiltersByName).map(([key, values]) => {
            if (Array.isArray(values) && values.length) {
              // remove duplicated filter names
              const filterValues = [...new Set(values?.map(v => v?.name))];
              return [key, filterValues];
            }
            return [key, []];
          }),
        );

        return {
          modelName: model?.modelName,
          id: model?.id,
          sotId: model?.sotId,
          detKey: model?.detKey,
          detIdentifier: model?.detIdentifier,
          name: model?.name,
          year: modelYear?.year,
          defaultTrim,
          defaultTrimName,
          filters,
        };
      });

      return modelCards;
    }
    return [];
  });

  return flatten(value);
};

export default formatCardGridData;
