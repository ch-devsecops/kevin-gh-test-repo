import { createObjectFromProps } from '../../../utils/object';

const formatTrimFilters = data => {
  const modelsData = createObjectFromProps(data);
  const filters = Object.fromEntries(
    Object.entries(modelsData).map(([key, values]) => {
      if (Array.isArray(values) && values.length) {
        // remove duplicated filter names
        const filterValues = [...new Set(values?.map(v => v?.itemName))];
        return [key, filterValues];
      }
      return [key, []];
    }),
  );

  return filters;
};

export default formatTrimFilters;
