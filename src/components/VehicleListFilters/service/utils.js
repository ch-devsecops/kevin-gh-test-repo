// eslint-disable-next-line import/prefer-default-export
export const mappedAutoFields = originFields => {
  if (!originFields?.filterType) {
    return [];
  }

  const filterOptionsList =
    originFields.filterType
      .map(filter => {
        const title = filter?.filterCategory?.fields?.filterCategoryName?.value;
        const key = filter?.filterCategory?.fields?.name;
        const items = filter?.filterCategory?.fields?.items;

        if (!title || !items) {
          return null;
        }
        const options = items.map(item => ({
          label: item?.filterName?.value || '',
          icon: item?.icon?.item?.value || '',
          key: `${key}|${item?.name}` || '',
        }));

        return {
          title,
          key,
          options,
        };
      })
      .filter(Boolean) || [];

  return {
    filterOptionsList,
    labels: {
      resetFilters: originFields.resetFilters,
      trimAvailablePlural: originFields.trimAvailablePlural,
      trimAvailableSingular: originFields.trimAvailableSingular,
    },
  };
};
