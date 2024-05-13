import { useMemo } from 'react';
import { nodeData } from '@lukeaus/plain-tree';
import {
  PRODUCT_COMPARE_ID_KEY,
  MAX_COMPARE_ELEMENTS,
  MARINE_SITE_NAME,
  ENGINE_SITE_NAME,
  PSP_SITE_NAME,
} from '../../utils/constants';
import { useAppName } from '../../utils/sitecoreContext';
import { getPspProductCardTitle } from './utils';

const emptyArray = Array(MAX_COMPARE_ELEMENTS).fill(null);

/**
 * Find nodes with matching id in tree
 *
 * @param {string[]} ids
 * @param {Object} tree
 * @returns {Object[]}
 */
function findMatchingNodes(ids, tree) {
  if (!Array.isArray(ids) || !ids.length || !tree) return [];

  const nodes = Array(ids.length).fill(null);
  // Traverse tree to find nodes with matching id
  tree.someDepthFirst(node => {
    const index = ids.indexOf(nodeData(node)?.[PRODUCT_COMPARE_ID_KEY]);
    if (index !== -1) {
      // Store node in the same position as in ids
      nodes[index] = node;
    }
    // When all nodes are found, break early by returning true
    if (nodes.every(e => !!e)) return true;

    return false;
  });
  return nodes;
}

// data mapping cb to get model data
const getEngineModelData = node => (node ? nodeData(node) : null);

// for PSP, model node is the parent of nodes corresponding to ids stored in activeProducts
const getPspModelData = node => {
  // when node is not valid, return early
  if (!node) return null;

  const transmission = nodeData(node);
  const transmissionName = transmission?.text;
  const hidePriceAndFinance = transmission?.hidePriceAndFinance;

  // store transmission id for pricing info
  const transmissionId = transmission?.[PRODUCT_COMPARE_ID_KEY];
  const modelNode = node?.parent;
  const modelData = nodeData(modelNode);
  const yearData = nodeData(modelNode?.parent);
  const categoryData = nodeData(modelNode?.parent?.parent);
  // concatenate year, model(trim) name and transmission name
  const productCardTitle = getPspProductCardTitle({
    year: yearData?.value,
    model: modelData?.name,
    transmission: transmissionName,
  });

  return { ...modelData, categoryData, productCardTitle, transmissionId, hidePriceAndFinance };
};

const useSelectedModels = (activeProducts, productCatalogDataTree, onUpdate, setActiveProducts) => {
  const appName = useAppName();

  let getModelData = null;
  switch (appName) {
    case ENGINE_SITE_NAME:
    case MARINE_SITE_NAME:
      getModelData = getEngineModelData;
      break;
    case PSP_SITE_NAME:
      getModelData = getPspModelData;
      break;
    default:
      break;
  }

  const selectedModels = useMemo(() => {
    if (getModelData && typeof getModelData === 'function') {
      const matchingNodes = findMatchingNodes(activeProducts, productCatalogDataTree);
      const matchingModels = matchingNodes.map(getModelData);

      // when valid models are less than activeProducts, remove invalid product ids and reset url and local storage
      if (matchingModels.filter(model => model).length < activeProducts.length) {
        const newActiveProducts = matchingModels
          .map((model, index) => (model?.[PRODUCT_COMPARE_ID_KEY] ? activeProducts[index] : null))
          .filter(id => id);
        // reset url and local storage
        onUpdate(newActiveProducts);
        // update active product ids
        setActiveProducts(newActiveProducts);
      }

      return matchingModels.length ? [...matchingModels, ...emptyArray].slice(0, MAX_COMPARE_ELEMENTS) : emptyArray;
    }

    return [];
  }, [activeProducts, productCatalogDataTree, getModelData, onUpdate, setActiveProducts]);

  return selectedModels;
};

export default useSelectedModels;
