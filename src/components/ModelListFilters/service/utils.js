import uniqBy from 'lodash/uniqBy';
import { omitBy, isUndefined, uniq } from 'lodash';
import { useTranslation } from 'react-i18next';
import { getComponentFromRoute } from '../../../utils/sitecorePlaceholders';
import { getExteriorColoursFromTrim, getFilteredModels, getTrimFilterValues } from '../../ModelFiltersContext/utils';
import { getGtmTagValue, gtmEvent } from '../../../utils/gtmEvents';
import { MARINE_SITE_NAME, PSP_SITE_NAME } from '../../../utils/constants';
import {
  AVAILABLE_TRANSMISSIONS_FIELD_NAME,
  DESIGN_FEATURES_FIELD_NAME,
  TRANSMISSIONS_FIELD_NAME,
  variant1,
  variant2,
  variant3,
} from '../constants';

// TODO: Remove "isMarine" logic, take the solution one level up
export const getModelDataFromSitecoreRoute = (route, isMarine) => {
  const sideNavLayout = getComponentFromRoute('SideNavLayout', route);
  const components =
    sideNavLayout &&
    sideNavLayout?.placeholders['side-nav-column-right'].filter(c =>
      c.componentName === isMarine ? 'MarineCategoryWithProducts' : 'ModelCardWithTrims',
    );
  const modelData = components ? components.map(c => c.fields?.data?.value?.model?.fields) : [];

  return modelData?.filter(d => !!d);
};

export const getFilterableComponentsFromSitecoreRoute = (route, componentName) => {
  if (componentName !== 'FutureVehicleCard' && componentName !== 'NsxModelCard') {
    // eslint-disable-next-line no-console
    console.warn(
      'getFilterableComponentsFromSitecoreRoute: componentName must be either "FutureVehicleCard" or "NsxModelCard"',
    );
  }

  const sideNavLayout = getComponentFromRoute('SideNavLayout', route);
  const filterableComponents =
    sideNavLayout &&
    sideNavLayout?.placeholders['side-nav-column-right'].filter(c => c.componentName === componentName);

  return filterableComponents && filterableComponents.length > 0;
};

/**
 * @param {Object} modelData - from Sitecore route
 * @returns array of all trims, from all models and model years
 */
const getAllTrimsFromModelData = (modelData = []) => {
  const trims = [];

  modelData?.forEach(model => {
    model?.modelYears?.forEach(modelYear => {
      modelYear?.trims?.forEach(trim =>
        trims?.push({
          ...trim,
          modelName: model?.modelName?.value,
          modelYear: modelYear?.year?.value,
        }),
      );
    });
  });

  return trims;
};

/**
 * @param {Object} modelData - from Sitecore route
 * @param {String} modelName - Category name
 * @returns products length from all models
 */
export const isCategoryHasProducts = (modelData = [], modelName) => {
  const products = getAllTrimsFromModelData(modelData);
  return products?.filter(i => i?.modelName === modelName)?.length;
};

export const getYearsFromModelData = (modelData = []) => {
  const years = [];

  modelData?.forEach(model => model?.modelYears?.map(({ year }) => years?.push(year?.value)));

  return uniq(years)
    ?.sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .reverse()
    .filter(i => i);
};

export const getModelNamesFromModelData = (modelData = []) => {
  const models = modelData?.map(model => model?.modelName?.value);

  return uniq(models);
};

export const getSpecialTrimNamesFromModelData = (modelData = []) => {
  const specialTrimNames = [];
  modelData?.forEach(({ modelYears }) =>
    modelYears?.forEach(({ trims }) =>
      trims?.forEach(({ specialVehicleType }) => {
        const name = specialVehicleType?.item?.fields?.specialVehicleTypeName?.value;
        if (name) {
          specialTrimNames?.push(name);
        }
      }),
    ),
  );

  return uniq(specialTrimNames);
};

export const getExteriorColorsFromModelData = (modelData = []) => {
  const trims = getAllTrimsFromModelData(modelData);
  const exteriorColors = [];

  trims?.forEach(trim => {
    const trimColors = getExteriorColoursFromTrim(trim);

    trimColors?.forEach(color => {
      exteriorColors?.push(color);
    });
  });

  return uniqBy(exteriorColors, 'detKey.value');
};

export const getTransmissionNamesFromModelData = (modelData = []) => {
  const transmissions = [];
  const trims = getAllTrimsFromModelData(modelData);
  trims?.forEach(trim => {
    const trimTransmissions = trim?.transmissions?.[0]?.items;
    trimTransmissions?.forEach(transmission => {
      transmissions?.push(transmission?.transmissionName?.value);
    });
  });

  return uniq(transmissions);
};

export const getBodyTypesFromFilterTypes = filterTypes => {
  const bodyTypesFilter = filterTypes?.find(f => f?.filterCategory?.fields?.name === 'bodyType');

  return bodyTypesFilter?.filterCategory?.fields?.items?.map(i => ({ key: i?.name, value: i?.filterName.value }));
};

/**
 * @param {Object} filter - filter object
 * @param {String} category - filter category
 * @param {String} item - filter item
 * @param {Object} modelData - from Sitecore route
 * @returns true if no filtered trims have the specificed item
 */
export const isFilterItemDisabled = (filter, category, item, modelData) => {
  if (typeof window === 'undefined') return false;
  if (filter?.onlyFutureVehicles || filter?.onlyNsx) return true;

  const allTrims = getAllTrimsFromModelData(modelData);
  const allTrimsWithFilterValues = allTrims?.map(trim => ({
    ...trim,
    filterValues: getTrimFilterValues(trim),
  }));

  const filteredTrims = getFilteredModels(allTrimsWithFilterValues, filter?.values);
  const trimCountForFilterItem = getFilteredModels(filteredTrims, {
    ...filter?.values,
    [category]: filter?.values[category]?.concat(item),
  })?.length;

  return trimCountForFilterItem === 0;
};

/**
 * Unlike other filter values (e.g. body type), exterior colours can vary
 * from one trim's transmission to another.
 * @param {Object} filter - filter object
 * @param {String} colorKey - an exterior color's unique key
 * @param {Object} modelData - from Sitecore route
 * @returns true if no transmission has the specificed color
 */
export const isExteriorColorDisabled = (filter, colorKey, modelData) => {
  if (typeof window === 'undefined') return false;
  if (filter?.onlyFutureVehicles || filter?.onlyNsx) return true;

  const allTrims = getAllTrimsFromModelData(modelData);
  const allTrimsWithFilterValues = allTrims?.map(trim => ({
    ...trim,
    filterValues: getTrimFilterValues(trim),
  }));
  const filteredTrims = getFilteredModels(allTrimsWithFilterValues, filter?.values);

  const transmissions = [];
  filteredTrims?.forEach(trim =>
    trim.transmissions?.[0]?.items?.forEach(transmission => {
      // check all transmissions, or only the selected ones
      if (
        filter?.values?.transmissionName?.length === 0 ||
        filter?.values?.transmissionName?.includes(transmission?.transmissionName?.value)
      ) {
        transmissions?.push(transmission);
      }
    }),
  );

  const allColors = [];
  transmissions?.forEach(transmission => {
    transmission?.exteriorColors?.[0]?.colors?.forEach(color => {
      allColors?.push(color?.color?.item?.fields?.detKey?.value);
    });
  });

  const transmissionCountForColorKey = allColors?.filter(c => c === colorKey)?.length;

  return transmissionCountForColorKey === 0;
};

/**
 * Pushes reset_filter gtm event
 * @param appName
 */

export const pushGtmResetFiltersEvent = appName => {
  const gtmPayload = {
    event: 'filter_reset',
  };
  switch (appName) {
    case MARINE_SITE_NAME:
      gtmEvent(gtmPayload);
      break;
    case PSP_SITE_NAME:
      gtmEvent(gtmPayload);
      break;
    default:
      break;
  }
};

/**
 * Pushes list of categories selected gtm event
 * @param {Object} filter - filter selected by user
 * @param {Number} trimsAvailable - how many trims are available on selected filter
 * @param {String} appName - check for app site name
 * @param maxPrice
 * @param minPrice
 */

export const pushGtmSelectCategoryFilterEvent = (filter, trimsAvailable, appName, maxPrice, minPrice, vehicleType) => {
  // switch case
  let gtmPayload;
  switch (appName) {
    case MARINE_SITE_NAME:
      gtmPayload = {
        filters: {
          category: filter?.model || '',
          max_price: maxPrice,
          min_price: minPrice,
        },
        event: 'all_outboards_filter',
      };
      gtmEvent(gtmPayload);
      break;

    case PSP_SITE_NAME:
      // TODO: add max and min price when psp price filter is enabled
      gtmPayload = {
        filters: omitBy(
          {
            category: `${getGtmTagValue(vehicleType)} : ${filter?.model ?? ''}`,
            year: getGtmTagValue(filter?.year),
            exteriorColor: getGtmTagValue(filter?.exteriorColor),
            transmission: getGtmTagValue(filter?.transmissionName),
          },
          isUndefined,
        ),
        event: 'all_psp_filter',
      };
      gtmEvent(gtmPayload);
      break;

    default:
      gtmPayload = {
        filters: filter,
        trims_available: trimsAvailable,
        event: 'all_vehicles_filter',
      };
      gtmEvent(gtmPayload);
      break;
  }
};

/**
 * maps the filterType property for the ModelListFilters
 *
 * @param {string} variant - the variant based on the productLine
 * @param {Array} filterTypes - how many trims are available on selected filter
 * @returns mapped filterType
 */
export const useFilterTypeConfiguration = (variant, filterType) => {
  const { t } = useTranslation();
  const filterCopy = [];
  let mappedFilterType = filterType;
  let categoryFilterLabel = t('Pages.Models.Exploration.filterCategoryLabel');
  const colourFilterLabel = t('Pages.Models.Exploration.filterColourLabel');
  const transmissionFilterLabel = t('Pages.Models.Exploration.transmissionLabel');
  let showExteriorColorsLabel;
  let isPriceFilterHidden;
  let defaultDesktopExpandedCategories = [];
  let defaultMobileExpandedCategories = [];

  const DesignFilterCategory = {
    filterCategory: {
      fields: {
        name: DESIGN_FEATURES_FIELD_NAME,
        filterCategoryName: {
          value: colourFilterLabel,
        },
        items: [],
      },
    },
  };

  const transmissionsFilterCategory = {
    filterCategory: {
      fields: {
        name: AVAILABLE_TRANSMISSIONS_FIELD_NAME,
        filterCategoryName: {
          value: transmissionFilterLabel,
        },
        items: [],
      },
    },
  };

  switch (variant) {
    case variant1:
      showExteriorColorsLabel = true;
      isPriceFilterHidden = false;
      categoryFilterLabel = t('Pages.Models.Exploration.filterModelsLabel');
      defaultDesktopExpandedCategories = [];
      break;
    case variant2:
      isPriceFilterHidden = false;
      break;
    case variant3:
      filterCopy.push(transmissionsFilterCategory, DesignFilterCategory);
      mappedFilterType = filterCopy;
      showExteriorColorsLabel = false;
      isPriceFilterHidden = true;
      defaultMobileExpandedCategories = ['vehicle-type'];
      break;

    default:
      break;
  }
  return {
    defaultDesktopExpandedCategories,
    defaultMobileExpandedCategories,
    mappedFilterType,
    categoryFilterLabel,
    colourFilterLabel,
    transmissionFilterLabel,
    showExteriorColorsLabel,
    isPriceFilterHidden,
  };
};

export const getFilterLabel = (variant, fieldName) => {
  if (!fieldName) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  let filterLabel = fieldName;
  switch (variant) {
    case variant3:
      if (fieldName === TRANSMISSIONS_FIELD_NAME) {
        filterLabel = t('Pages.Models.Exploration.filterTrimLabel');
      }
      break;

    default:
      break;
  }
  return filterLabel;
};
