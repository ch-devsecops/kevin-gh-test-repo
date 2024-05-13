import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';
import { flatten } from 'lodash/array';

import { pushGtmCtaClickAddToCompareEvent } from '../../utils/gtmEvents';
import { MARINE_SITE_NAME } from '../../utils/constants';

/**
 * Parses the given specifications and groups them by the proper trim id.
 * @param {array} specifications - API response with all specifications for the different trims.
 * @param {array} trims - The currently active trims (id and name).
 * @returns {Object} EngineData - The parsed information for the given engine id.
 * @returns {array} EngineData.labels - The labels for each specification.
 * @returns {array} EngineData.specsLabels - The values for each specification.
 */
export const getEnginesGroupedBySpecifications = (specifications = [], trims = []) => {
  if (!specifications?.length || !trims?.length) return {};
  const labels = uniqBy(specifications, 'displayOrder')
    ?.map(category => {
      const specsLabels = category?.specs?.map(s => ({
        name: s.name,
        label: s.label,
        displayOrder: s.displayOrder,
      }));
      return specsLabels;
    })
    ?.flat(1);

  const specificationByTrims = trims?.map(trim => {
    const trimId = trim?.detIdentifier;
    const trimSpecs = uniqBy(
      specifications.filter(spec => spec?.trimId?.toString() === trimId),
      'displayOrder',
    )
      ?.map(spec => spec.specs)
      ?.flat(1);
    const specificationsByLabel = labels?.map(label => trimSpecs?.find(spec => spec.name === label.name) || label);

    return specificationsByLabel;
  });

  return {
    labels,
    specs: specificationByTrims,
  };
};

/**
 * Returns a formatted product list data shape based on the site name.
 * @param {array} products - product catalog data from sitecore.
 * @param {string} appName - site name from sitcoreContext.
 * @returns {array} formattedProduct - Formatted products with useable data shape based on the catalog.
 */

/**
 * Sort data by exactly the detIds
 * @param {array} detIds - Set of DET IDs.
 * @param data
 * @returns {array} enginesList - List of engines found within sitecore catalog.
 */
export const sortDataByDetIds = (detIds, data) =>
  data.sort((a, b) => detIds.indexOf(a?.detIdentifier) - detIds.indexOf(b?.detIdentifier));

/**
 * Search models by detId to be found within sitecore catalog data.
 * @param {array} detIds - Set of DET IDs.
 * @param {array} sitecoreEngineList - Unrefined sitecore catalog list of engines.
 * @returns {array} enginesList - List of engines found within sitecore catalog.
 */
export const getDataFromCatalog = (detIds, sitecoreEngineList) => {
  if (detIds?.length <= 0) return [];

  const data = flatten(
    sitecoreEngineList?.map(series => series.productList?.filter(model => detIds.includes(model?.detIdentifier))),
  );
  return sortDataByDetIds(detIds, data);
};

/**
 * Gets the value of the given param from the URL.
 * @param {string} param The name of the parameter to be used/searched-for in the URL
 * @returns The values found.
 */
export const getParamsFromUrl = param => {
  const queryParams = new URLSearchParams(window.location.search);
  return (
    queryParams
      .get(param)
      ?.split(',')
      .filter(val => val) || undefined
  );
};

/**
 * Updates the URL and sets the given param to the given value.
 * @param {string} param The param to be used in the URL.
 * @param {Object} history History Object coming from react-router-dom.
 * @param {string[]} values The values to be set.
 */
export const updateSearchParams = (param, history, values) => {
  if (!Array.isArray(values) || typeof window === 'undefined') return;
  try {
    const valuesStr = values.toString();
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(param, valuesStr);
    if (valuesStr) {
      const newUrl = `${window.location.pathname}?${decodeURIComponent(queryParams.toString())}`;
      history.replace(newUrl);
    } else {
      history.replace(window.location.pathname);
    }
  } catch (error) {
    console.warn('Product Compare: updateSearchParams error', error);
  }
};

/**
 * Pushes the gtmEvent based on the AppName.
 * @AppName {string} The name of the AppName used
 * @productId {string} The sitecore detModelKey
 * @category {string} The name category from sitecore
 * @returns The gtmEvent found.
 */
export const pushGtmViewDetailsCompareEvent = (AppName, productId, category) => {
  // TODO: Delete rule as soon as more apps are using this switch case
  // eslint-disable-next-line default-case
  switch (AppName) {
    case MARINE_SITE_NAME:
      return pushGtmCtaClickAddToCompareEvent(category, productId);
  }
};

/**
 * Parses the given specifications and groups them by the category and sub-category.
 * @param {Object[]} specifications - API response with all specifications for trims.
 */
export const getPSPCategorizedSpecifications = specifications => {
  if (!Array.isArray(specifications) || !specifications.length) return [];

  try {
    /* Group specs by the first layer of category name and transform to array to iterate over */
    const specsGroup = flatten(
      Object.entries(groupBy(specifications, 'name'))?.map(([categoryName, trimSpecs]) => {
        // Inject trimId into each spec item and merge/flatten specs from all trims
        const specsArrWithTrimId = flatten(
          trimSpecs.map(trimSpec => trimSpec?.specs?.map(spec => ({ ...spec, trimId: trimSpec?.trimId }))),
        );
        /* Group specs by the second layer of sub-category name and transform to array to iterate over */
        const trimSpecsGroupBySubCategory = flatten(
          Object.entries(groupBy(specsArrWithTrimId, 'name'))?.map(([subCategoryName, specs]) => ({
            name: subCategoryName,
            label: specs?.[0]?.label,
            specs,
          })),
        );
        return { name: categoryName, label: trimSpecs?.[0]?.label, specifications: trimSpecsGroupBySubCategory };
      }),
    );

    return specsGroup;
  } catch (error) {
    return undefined;
  }
};

export const getPspProductCardTitle = ({ year, model, transmission }) => {
  // filter out invalid values
  const title = [year, model, transmission].filter(value => !!value);
  // add space between
  return title.join(' ');
};
