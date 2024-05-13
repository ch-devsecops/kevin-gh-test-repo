import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, useMediaQueries } from '@honda-canada/design-system-react';

import ProductDetailsCard from '../ProductDetailsCard';
import PriceComponent from '../PriceComponent';

import getContentMargins from '../../utils/getContentMargins';
import componentProps from './componentProps';
import { MarineDetails, MODEL_YEAR_API_DEFAULT_VALUE } from '../../utils/constants';
import { makeModelConfiguration, usePricesConfiguration } from '../../utils/financeUtils';

import themeStyles from './MarineProductDetailsCard.styles';
import useProductFinancial from '../../utils/hooks/useProductFinancial';

const PriceComponentWrapper = themeStyles.apply(Box, 'PriceComponentWrapper');
const priceComponentStyles = {
  pricesContainer: {
    flexDirection: ['column', 'column', 'row'],
    gap: ['s', 's', '58px'],
  },
  priceStyles: {
    copy: {
      styles: {
        fontSize: ['20px', '20px', '24px'],
        lineHeight: ['24px', '24px', '28px'],
      },
    },
    discount: {
      styles: {
        fontSize: ['14px', '14px', '16px'],
      },
    },
  },
  errorStyles: {
    container: {
      pb: 'default',
      pt: 'xxs',
    },
    copy: {
      fontSize: ['10px', '10px', '10px'],
      lineHeight: ['16px', '16px', '16px'],
    },
  },
  saveStyles: {
    container: {
      mx: ['auto', 0, 0],
    },
    copy: {
      styles: {
        fontSize: ['14px', '14px', '14px'],
      },
    },
  },
};

const MarineProductDetailsCard = ({ fields, params = {}, rendering }) => {
  const { t } = useTranslation();
  const { isMobile } = useMediaQueries();
  const margins = getContentMargins(params);
  const data = fields?.data?.value?.model?.fields;
  const {
    financial: { modelConfiguration },
    isFetching,
    hasError,
    setModels,
  } = useProductFinancial({ formatter: makeModelConfiguration });

  const priceLabels = {
    allInPrice: { label: t('Shared.Common.sellingPriceStartingFromLabel') },
  };

  const getPrices = usePricesConfiguration(priceLabels);
  const detModelKey = data?.detModelKey?.value;
  const defaultConfigurationId = data?.defaultConfiguration?.fields?.detIdentifier?.value || data?.detKey?.value;

  useEffect(() => {
    if (detModelKey) {
      setModels([
        {
          modelKey: detModelKey,
          modelYear: MODEL_YEAR_API_DEFAULT_VALUE,
        },
      ]);
    }
  }, [detModelKey]);

  if (!data) {
    return null;
  }

  const detId = data?.detIdentifier?.value;
  const keyFeatures = data?.keyFeatures?.item?.map(item => item.feature?.value);
  const gtmTags = {
    productId: detId,
    productName: data?.name,
    category: data?.category?.name,
    componentName: rendering?.componentName,
    title: MarineDetails?.FindDealer?.DATA_GTM_TITLE,
    removeTitle: MarineDetails?.RemoveComparison?.DATA_GTM_TITLE,
    interactionType: MarineDetails?.FindDealer?.DATA_GTM_INTERACTION_TYPE,
    addTitle: MarineDetails?.AddItem?.DATA_GTM_TITLE,
    removeInteractionType: MarineDetails?.RemoveComparison?.DATA_GTM_INTERACTION_TYPE,
  };

  const prices = getPrices(modelConfiguration, defaultConfigurationId);

  return (
    <ProductDetailsCard
      detId={detId}
      title={data?.modelName?.value}
      subtitle={data?.crankshaft?.crankshaftName?.value}
      tagline={data?.tagline?.value || ''}
      list={keyFeatures}
      images={data?.thumbnails?.value?.images}
      margins={margins}
      gtmTags={gtmTags}
      headingTitle={t('Pages.Models.Exploration.keyFeaturesLabel')}
      actionButtonText={t('Shared.Common.findDealerButton')}
      compareIconName="plus"
      prices={prices}
      PriceComponent={() => (
        <PriceComponentWrapper isMobile={isMobile}>
          <PriceComponent
            prices={prices}
            isFetching={isFetching}
            hasError={hasError}
            priceComponentStyles={priceComponentStyles}
            horizontalAlignment={isMobile ? 'center' : 'left'}
            height={['auto', 'auto', undefined]}
            saveAboveLabel
          />
        </PriceComponentWrapper>
      )}
    />
  );
};

MarineProductDetailsCard.propTypes = { ...componentProps };

export default MarineProductDetailsCard;
