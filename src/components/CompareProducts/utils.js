import { Node, Tree } from '@lukeaus/plain-tree';
import getValueByKey from '../../utils/getValueByKey';
import { urlProductParamNameMap } from '../../utils/constants';

/**
 * Map engine web catalog to the expected data structure by UI component.
 * @param {Object[]} series - The series with all the crankshafts and models.
 * @returns {Tree} engine catalog data in tree structure
 */
export const getEngineMappedCatalogData = series => {
  if (!Array.isArray(series) || !series?.length) return undefined;
  const rootNode = new Node('root');
  const tree = new Tree(rootNode);
  series?.forEach(item => {
    const seriesNode = rootNode.addChild({
      value: item?.name,
      text: item?.name,
      id: item?.id,
    });

    item?.crankshafts?.forEach(crankshaft =>
      crankshaft?.models?.forEach(model => {
        seriesNode.addChild({
          text: model?.name,
          value: model?.detIdentifier?.value,
          name: model?.name,
          detIdentifier: model?.detIdentifier?.value,
          model: crankshaft?.name,
          modelPage: model?.modelPage?.fields,
          thumbnail: getValueByKey(model, 'images')?.[0],
          id: model?.id,
        });
      }),
    );
  });
  return tree;
};

/**
 * Map marine web catalog to the expected data structure by UI component.
 * @param {Object[]}outboards
 * @returns {Tree} marine catalog data in tree structure
 */
export const getMarineMappedCatalogData = outboards => {
  if (!Array.isArray(outboards) || !outboards?.length) return undefined;
  const rootNode = new Node('root');
  const tree = new Tree(rootNode);
  outboards?.forEach(outboard => {
    const outboardsNode = rootNode.addChild({
      value: outboard?.name,
      text: outboard?.name,
      id: outboard?.id,
    });

    outboard?.models?.forEach(model => {
      const thumbnail = getValueByKey(model, 'primaryImage')?.[0]?.item?.value;
      outboardsNode.addChild({
        text: model?.name,
        value: model?.detIdentifier?.value,
        name: model?.modelName?.value,
        detIdentifier: model?.detIdentifier?.value,
        model: model?.name,
        modelPage: model?.modelPage?.fields,
        thumbnail: {
          ...thumbnail,
          url: thumbnail?.src,
        },
        id: model?.id,
      });
    });
  });
  return tree;
};

/**
 * Map PSP web catalog to the expected data structure by UI component.
 * @param {Object[]} categories
 * @returns { Tree } psp catalog data in tree structure
 */
export const getPspMappedCatalogData = vehicleTypesWithCategories => {
  if (!Array.isArray(vehicleTypesWithCategories) || !vehicleTypesWithCategories?.length) return undefined;
  const rootNode = new Node('root');
  const tree = new Tree(rootNode);

  vehicleTypesWithCategories.forEach(v => {
    const vehicleType = v?.name?.toUpperCase();
    const categories = v?.categories;
    categories?.forEach(category => {
      const categoryNode = rootNode.addChild({ text: category?.name, value: category?.categoryName?.value });
      category?.modelYears?.forEach(modelYear => {
        const yearNode = categoryNode.addChild({ text: modelYear?.year?.value, value: modelYear?.year?.value });
        modelYear?.models?.forEach(model =>
          model?.trims?.forEach(trim => {
            const trimNode = yearNode.addChild({
              text: trim?.name,
              value: trim?.detIdentifier?.value,
              name: trim?.name,
              detIdentifier: trim?.detIdentifier?.value,
              detKey: trim?.detKey?.value,
              modelPage: modelYear?.modelYearPage?.fields,
              thumbnail: trim?.primaryThumbnail?.item?.value,
              id: trim?.sotId?.value,
              modelKey: model?.detKey?.value,
              modelYear: modelYear?.year?.value,
              vehicleType,
            });
            trim?.transmissions?.[0]?.items.forEach(transmission => {
              trimNode.addChild({
                text: transmission?.name,
                value: transmission?.transmissionName?.value,
                modelCode: transmission?.modelCode,
                detIdentifier: transmission?.detIdentifier?.value,
                defaultExteriorColor: transmission?.defaultExteriorColor?.fields,
                hidePriceAndFinance: transmission?.hidePriceAndFinance?.value,
              });
            });
          }),
        );
      });
    });
  });

  return tree;
};

export const getUrlParamName = appName => urlProductParamNameMap.get(appName) || '';
