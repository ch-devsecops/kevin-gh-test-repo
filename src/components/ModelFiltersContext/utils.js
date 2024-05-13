import uniqBy from 'lodash/uniqBy';
import { modelListFilters } from './reducer';
import { getObjectRecursive } from '../../utils/object';

export const getSelectedCategories = filter => {
  const filterKeys = Object.keys(modelListFilters.values);
  let filters = null;
  filterKeys.forEach(key => {
    const filterKey = key === 'bodyType' ? 'body_style' : [key];
    if (filter[key] && filter[key].length) {
      filters = {
        ...filters,
        [filterKey]: filter[key].toString(),
      };
    }
  });
  return filters;
};

export const INITIAL_VALUE_PRICE_RANGE = { min: '', max: '' };

export const getModelProduct = (financialModels = [], productKey) =>
  financialModels.find(model => model?.modelKey === productKey);

export const getTrimProduct = (financialModels, productKey) =>
  getObjectRecursive(financialModels, 'id', productKey)?.shift();

export const getExteriorColoursFromTrim = trim => {
  const exteriorColors = [];
  trim?.transmissions?.forEach(transmission => {
    transmission?.items.forEach(item => {
      if (item.exteriorColors) {
        item.exteriorColors?.[0]?.colors.forEach(c => exteriorColors.push(c.color?.item?.fields));
      }
    });
  });

  return uniqBy(exteriorColors, 'detKey.value');
};

/**
 * @param {object} trim from Sitecore web catalog data
 * @returns an object with an array of strings for each modelListFilters category
 */
export const getTrimFilterValues = trim => {
  const trimFilterValues = {};
  const filterKeys = Object.keys(modelListFilters.values);
  const exteriorColors = getExteriorColoursFromTrim(trim);
  filterKeys.forEach(key => {
    if (key === 'year') {
      trimFilterValues.year = [trim?.modelYear];
      return;
    }

    if (key === 'model') {
      trimFilterValues.model = [trim?.modelName];
      return;
    }

    if (key === 'specialTrim') {
      const specialTrimName = trim?.specialVehicleType?.item?.fields?.specialVehicleTypeName?.value;
      trimFilterValues.specialTrim = [specialTrimName];
      return;
    }

    if (key === 'exteriorColor') {
      trimFilterValues.exteriorColor = exteriorColors.map(c => c.detKey?.value);
      return;
    }

    if (key === 'interiorMaterial') {
      trimFilterValues.interiorMaterial = [trim?.interiorMaterial?.item?.[0]?.name];
      return;
    }

    if (key === 'transmissionName') {
      const transmissionNames = trim?.transmissions?.[0]?.items?.map(t => t.transmissionName?.value);

      trimFilterValues.transmissionName = transmissionNames;
      return;
    }

    if (key === 'drivetrain') {
      trimFilterValues.drivetrain = trim?.drivetrain?.item?.length > 0 ? trim?.drivetrain?.item.map(d => d.name) : [];
      return;
    }

    trimFilterValues[key] = trim[key]?.item?.map(i => i.name) || [];
  });

  return trimFilterValues;
};

/**
 * @param {*} models - an array of models with a `price` property
 * @param {*} selections - an object of modelListFilters selections
 * @param {*} range - an object of minimum and maximum price range key value pair
 * @returns model array filtered by range
 */
export const getFilteredModels = (models = [], selections = {}, range = {}, showMsrpPrice, showSellingPrice) => {
  if (!selections || !Object.keys(selections)) {
    return models;
  }

  let filteredModels;
  const modelKeys = Object.keys(selections);
  filteredModels = models.filter(model =>
    modelKeys.every(
      filter => selections[filter] && selections[filter].every(spec => model?.filterValues[filter]?.includes(spec)),
    ),
  );

  const rangeKeys = Object.values(range);
  if (rangeKeys.length) {
    filteredModels = filteredModels.filter(model => {
      if (showMsrpPrice || !showSellingPrice) {
        return (
          model?.price?.msrpPrice?.value <= (range?.max ?? Infinity) &&
          model?.price?.msrpPrice?.value >= (range?.min || 0)
        );
      }
      if (showSellingPrice) {
        return (
          model?.price?.allInPrice?.value <= (range?.max ?? Infinity) &&
          model?.price?.allInPrice?.value >= (range?.min || 0)
        );
      }
      return models;
    });
  }
  return filteredModels;
};
