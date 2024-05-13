import { flattenDeep } from 'lodash/array';
import getValueByKey from '../../utils/getValueByKey';

/**
 * returns the miniature product card data for selected products to compare
 * @param detIds
 * @param data
 * @returns {Array}
 */
function getModels(detIds, data) {
  return flattenDeep(
    data?.map(category =>
      category?.subCategories?.map(subCategory =>
        subCategory?.models?.filter(model => detIds.includes(model?.detIdentifier?.value)),
      ),
    ),
  );
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

export default getModels;
