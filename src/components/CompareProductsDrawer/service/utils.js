import { flattenDeep } from 'lodash/array';
import getValueByKey from '../../../utils/getValueByKey';
import { MC_PRODUCT_NAME } from '../../../utils/constants';

/**
 * returns the miniature product card data for selected products to compare
 * @param detIds - model DET IDs
 * @param data - product catalog data
 * @returns {Array}
 */
export function getEngineModels(detIds, data) {
  return flattenDeep(
    data?.map(category =>
      category?.subCategories?.map(subCategory =>
        subCategory?.models?.filter(model => detIds.includes(model?.detIdentifier?.value)),
      ),
    ),
  );
}

/**
 * returns the miniature product card data for selected products to compare
 * @param detIds - transmission DET IDs
 * @param data - mapped product catalog data, from getPspMappedCatalogData
 * @returns {Array}
 */
export function getPspModels(detIds, data) {
  const models = flattenDeep(
    data?.map(category =>
      category?.subCategories?.map(subCategory =>
        subCategory?.models?.filter(model => model.transmissions?.some(item => detIds?.includes(item))),
      ),
    ),
  );
  // ensures models are returned in the same order as the provided detIds
  return detIds.map(detId => models.find(model => model.transmissions.includes(detId))).filter(id => !!id);
}

/**
 * maps marine web catalog to the expected data structure by the UI component
 * @param outboards
 * @returns {*}
 */
export function getMarineMappedCatalogData(outboards) {
  return outboards?.map(item => ({
    subCategories: [
      {
        id: item?.id,
        models: item?.models?.map(model => ({
          ...model,
          thumbnail: {
            ...model?.primaryImage?.item?.value,
            url: model?.primaryImage?.item?.value.src,
            alt: { value: model?.primaryImage?.item?.value.alt },
          },
        })),
      },
    ],
  }));
}

/**
 * maps engine web catalog to the expected data structure by the UI component
 * @param series
 * @returns {Array}
 */
export function getEngineMappedCatalogData(series) {
  return flattenDeep(
    series?.map(s =>
      s.crankshafts?.map(crankshaft => ({
        subCategories: [
          {
            id: crankshaft?.id,
            models: crankshaft?.models?.map(model => ({
              ...model,
              thumbnail: getValueByKey(model, 'images')?.[0],
            })),
          },
        ],
      })),
    ),
  );
}

/**
 * Returns a new array of vehicles with their associated product line.
 *
 * @function
 * @param {Object} vehicleData - The source data containing product lines and their associated vehicle types.
 * @param {string} vehicleData[].name - The name of the product line.
 * @param {Object[]} vehicleData[].vehicleTypes - The types of vehicles under the product line.
 *
 * @returns {Object[]} - An array of vehicles with added 'productLine' property.
 */
const getVehiclesWithProductLine = vehicleData => {
  if (!vehicleData || typeof vehicleData !== 'object') return [];

  let result = [];
  Object.values(vehicleData).forEach(({ name: productLine, vehicleTypes }) => {
    if (Array.isArray(vehicleTypes)) {
      const vehicles = vehicleTypes.map(vehicleType => ({ ...vehicleType, productLine }));
      result = result.concat(vehicles);
    }
  });

  return result;
};
/**
 * maps psp web catalog to the expected data structure by the UI component
 * @param categories
 * @returns {Array}
 */
export const getPspMappedCatalogData = fieldsData => {
  const vehicles = getVehiclesWithProductLine(fieldsData);
  return flattenDeep(
    vehicles?.map(vehicle => {
      const productline = vehicle?.productLine === MC_PRODUCT_NAME ? 'Mc' : 'AtvSxs';
      return vehicle?.categories?.map(category =>
        category.modelYears?.map(modelYear =>
          modelYear?.models?.map(model => ({
            subCategories: [
              {
                id: model?.sotId,
                models: model?.trims
                  ? model.trims.map(trim => ({
                      ...trim,
                      modelName: {
                        value: trim?.trimName?.value,
                      },
                      thumbnail: {
                        ...trim?.primaryThumbnail?.item?.value?.images?.[0],
                      },
                      productline,
                      // store all transmission IDs under this trim/model
                      transmissions: trim?.transmissions?.[0]?.items?.map(tran => tran?.detIdentifier?.value),
                    }))
                  : [],
              },
            ],
          })),
        ),
      );
    }),
  );
};

/**
 * Generates a URL for the compare page based on the provided data.
 *
 * @param {Array} data - An array of objects containing product data.
 * @returns {string} The URL for the compare page, or an empty string if the data is invalid.
 */
export const getComparePageUrl = data => {
  if (data.length === 0) {
    return '';
  }
  const firstProductline = data[0].productline;
  const isProductlineSame = data.every(item => item.productline === firstProductline);

  if (!isProductlineSame) return '';

  return `Shared.Common.comparePage${firstProductline}Url`;
};
