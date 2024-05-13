import React from 'react';
import PropTypes from 'prop-types';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import SimilarRecentlyViewedUI from './SimilarRecentlyViewedUI';
import NotImplemented from '../NotImplemented';
import { ENGINE_SITE_NAME, EngineSeriesCard, MARINE_SITE_NAME } from '../../utils/constants';
import { getEngineModels, getMarineModels } from './utils';
import getValueByKey from '../../utils/getValueByKey';

const SimilarRecentlyViewedMap = ({ fields, rendering, ...rest }) => {
  const {
    sitecoreContext: {
      site: { name: appName },
    },
  } = useSitecoreContext();

  if (!fields) return null;

  const value = fields?.data?.value;
  const catalog = fields?.data?.catalog;
  const relatedModels = getValueByKey(value, 'item');
  const relatedModelsDetIds = relatedModels?.map(model => model?.detIdentifier?.value);

  const componentName = rendering?.componentName;
  const gtmTags = {
    componentName,
    title: EngineSeriesCard?.Clicks?.DATA_GTM_TITLE,
    compareTitle: EngineSeriesCard?.Compare?.DATA_GTM_TITLE,
    interactionType: EngineSeriesCard?.Clicks?.DATA_GTM_INTERACTION_TYPE,
    compareInteractionType: EngineSeriesCard?.Compare?.DATA_GTM_INTERACTION_TYPE,
  };

  let models;
  let getModels;
  let similarModels;
  let fetchFinancial;

  switch (appName) {
    case ENGINE_SITE_NAME:
      models = getValueByKey(catalog, 'series');
      similarModels = getEngineModels(relatedModelsDetIds, models);
      getModels = getEngineModels;
      fetchFinancial = false;
      break;

    case MARINE_SITE_NAME:
      models = getValueByKey(catalog, 'outboards');
      similarModels = getMarineModels(relatedModelsDetIds, models);
      getModels = getMarineModels;
      fetchFinancial = true;
      break;

    default:
      return <NotImplemented name="SimilarRecentlyViewedProducts" />;
  }

  return (
    <SimilarRecentlyViewedUI
      models={models}
      similarModels={similarModels}
      relatedModels={relatedModels}
      getModels={getModels}
      fetchFinancial={fetchFinancial}
      gtmTags={gtmTags}
      {...rest}
    />
  );
};

SimilarRecentlyViewedMap.propTypes = {
  fields: PropTypes.shape({}),
};

export default SimilarRecentlyViewedMap;
