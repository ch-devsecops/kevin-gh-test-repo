import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { EngineDetails } from '../../utils/constants';
import ProductDetailsCard from '../ProductDetailsCard';
import getContentMargins from '../../utils/getContentMargins';

const EngineDetailsCard = ({ fields, params = {}, rendering }) => {
  const data = fields?.data?.value?.model?.fields;
  const { t } = useTranslation();
  if (!data) {
    return null;
  }

  const gtmTrimName = fields?.data?.value?.model?.fields?.name;
  const gtmSeriesName = fields?.data?.value?.model?.fields?.crankshaft?.name;
  const gtmCrankshaftName = fields?.data?.value?.model?.fields?.crankshaft?.series?.name;
  const commonApplicationsList = data?.commonApplications?.item?.map(item => item.application?.value);

  const margins = getContentMargins(params);

  const gtmTags = {
    gtmTrimName,
    gtmSeriesName,
    gtmCrankshaftName,
    componentName: rendering?.componentName,
    title: EngineDetails?.FindDistributor?.DATA_GTM_TITLE,
    removeTitle: EngineDetails?.RemoveComparison?.DATA_GTM_TITLE,
    interactionType: EngineDetails?.FindDistributor?.DATA_GTM_INTERACTION_TYPE,
    addTitle: EngineDetails?.AddItem?.DATA_GTM_TITLE,
    removeInteractionType: EngineDetails?.RemoveComparison?.DATA_GTM_INTERACTION_TYPE,
  };

  return (
    <ProductDetailsCard
      detId={data?.detIdentifier?.value}
      title={data?.modelName?.value}
      subtitle={data?.crankshaft?.crankshaftName?.value}
      tagline={data?.tagline?.value || ''}
      list={commonApplicationsList}
      images={data?.thumbnails?.value?.images}
      margins={margins}
      gtmTags={gtmTags}
      headingTitle={t('Shared.Common.commonApplicationsLabel')}
      actionButtonText={t('Shared.Common.findDistributorButton')}
      compareIconName="plus"
    />
  );
};

EngineDetailsCard.propTypes = {
  fields: PropTypes.shape({
    data: PropTypes.shape({
      value: PropTypes.shape({
        model: PropTypes.shape({
          fields: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            crankshaft: PropTypes.shape({
              name: PropTypes.string,
              crankshaftName: PropTypes.shape({
                value: PropTypes.string,
              }),
              series: PropTypes.shape({
                name: PropTypes.string,
              }),
            }),
            modelName: PropTypes.shape({
              value: PropTypes.string,
            }),
            tagline: PropTypes.shape({
              value: PropTypes.string,
            }),
            thumbnails: PropTypes.shape({
              value: PropTypes.shape({
                images: PropTypes.arrayOf(
                  PropTypes.shape({
                    name: PropTypes.string,
                    url: PropTypes.string,
                    alt: PropTypes.shape({
                      value: PropTypes.string,
                    }),
                    title: PropTypes.shape({
                      value: PropTypes.string,
                    }),
                  }),
                ),
              }),
            }),
            commonApplications: PropTypes.shape({
              item: PropTypes.arrayOf(
                PropTypes.shape({
                  application: PropTypes.shape({
                    value: PropTypes.string,
                  }),
                }),
              ),
            }),
          }),
        }),
      }),
    }),
  }),
  params: PropTypes.shape({
    autoId: PropTypes.string,
    horizontalMargin: PropTypes.string,
    topMargin: PropTypes.string,
    bottomMargin: PropTypes.string,
  }),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};

export default EngineDetailsCard;
