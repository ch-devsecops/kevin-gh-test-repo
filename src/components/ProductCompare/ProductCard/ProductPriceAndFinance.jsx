import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Optional, H6 } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import PriceComponent from '../../PriceComponent';
import themeStyles from '../styles/ProductCard.styles';
import SaveLabel from '../../PriceComponent/SaveLabel';
import ProductTitle from './ProductTitle';
import ProductImageNoWidth from './ProductImageNoWidth';
import { EqualHeightElement } from '../../../utils/components/EqualHeight';
import { EqualHeightContext } from '../../../utils/components/EqualHeight/context';
import useProductFinancial from '../../../utils/hooks/useProductFinancial';

const PriceButton = themeStyles.apply(Button, 'PriceButton');
const PriceButtonWrapper = themeStyles.apply(Box, 'PriceButtonWrapper');
const priceComponentStyles = {
  priceStyles: {
    title: {
      size: 'extraSmall',
    },
    copy: { size: 'default' },
  },
  saveStyles: {
    container: {
      mx: 'auto',
    },
    copy: { size: 'extraSmall' },
  },
};
const ProductPriceAndFinance = ({
  modelKey,
  modelYear,
  trimId,
  transmissionId,
  vehicleType,
  isSticky,
  hidePriceAndFinance,
  productCardTitle,
  thumbnail,
  productIndex,
  suppressDiscount,
  wrapperGtmTags,
  ctaGtmTags,
}) => {
  const { t } = useTranslation();
  const { setForceUpdate } = useContext(EqualHeightContext);
  const priceLabels = {
    priceErrorLabel: t('Shared.Errors.priceError'),
    msrpStartingFromLabel: t('Shared.Common.msrpStartingFromLabel'),
    sellingPriceLabel: t('Shared.Common.sellingPriceLabel'),
  };

  // trim query param as used in PSP price and finance
  const trimQueryParam = transmissionId ? `&trim=${transmissionId}` : '';
  const priceAndFinanceUrl = `${t('Shared.Common.priceAndFinanceUrl')}?vehicleType=${vehicleType}${trimQueryParam}`;

  const financialFormatter = financials => {
    const { models } = financials || {};
    if (!Array.isArray(models) || !models?.length) return null;

    const model = models[0];
    const targetTrim = model?.trims?.find(trim => trim?.id?.toString() === trimId);
    // find matching transmission with a fallback value
    const transmission =
      targetTrim?.transmissions?.find(tm => tm?.id?.toString() === transmissionId) || targetTrim?.transmissions?.[0];
    const defaultExteriorColor = transmission?.exteriorColors?.[0];

    return {
      discount: {
        priceDiscountAmount: transmission?.priceDiscountAmount,
        msrpWithDiscount: defaultExteriorColor?.msrpWithDiscount,
        sellingPriceWithDiscount: defaultExteriorColor?.sellingPriceWithDiscount,
      },
      allInPrice: {
        value: defaultExteriorColor?.sellingPrice,
        label: priceLabels.sellingPriceLabel,
      },
      msrpPrice: {
        value: defaultExteriorColor?.msrp,
        label: priceLabels.msrpStartingFromLabel,
      },
    };
  };

  const {
    financial: prices,
    isFetching,
    hasError,
    setModels,
  } = useProductFinancial({
    vehicleType,
    formatter: financialFormatter,
  });

  // display cta after prices is fetched and not empty
  const showPriceAndFinanceCTA = !isSticky && !hidePriceAndFinance;
  let discountValue;
  let hasDiscount;
  if (prices) {
    discountValue = prices?.discount?.priceDiscountAmount;
    hasDiscount = !!discountValue && !suppressDiscount;
  }

  useEffect(() => {
    setModels([{ modelKey, modelYear }]);
  }, []);

  useEffect(() => {
    setForceUpdate(value => !value);
  }, [hasDiscount]);

  return (
    <Box textAlign="center">
      <Optional when={!isSticky}>
        <EqualHeightElement name="CompareCardCashSavings" placeholder={!hasDiscount}>
          <Optional when={!isSticky && !suppressDiscount && hasDiscount}>
            <SaveLabel value={discountValue} saveStyles={priceComponentStyles.saveStyles} />
          </Optional>
        </EqualHeightElement>
      </Optional>

      <ProductTitle title={productCardTitle} productIndex={productIndex} defaultHeader={H6} hasPadding={isSticky} />
      <ProductImageNoWidth thumbnail={thumbnail} productIndex={productIndex} isSticky={isSticky} />
      <Optional when={!isSticky}>
        <PriceComponent
          allInPriceTooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
          errorMessage={t('Pages.Models.Exploration.contactLocalDealerLabel')}
          hasError={hasError}
          height={['auto', 'auto', undefined]}
          horizontalAlignment="center"
          isFetching={isFetching}
          msrpStartingFromTooltipLabel={t('Shared.Common.msrpStartingFromTooltipLabel')}
          priceComponentStyles={priceComponentStyles}
          prices={prices}
        />
      </Optional>
      <Optional when={!isSticky}>
        <EqualHeightElement>
          <Optional when={showPriceAndFinanceCTA}>
            <PriceButtonWrapper {...wrapperGtmTags}>
              <PriceButton
                styling="primary"
                data-testid="cy-price-financial-cta"
                as="a"
                href={priceAndFinanceUrl}
                aria-label={t('Shared.Common.priceAndFinanceButton')}
                {...ctaGtmTags}
              >
                {t('Shared.Common.priceAndFinanceButton')}
              </PriceButton>
            </PriceButtonWrapper>
          </Optional>
        </EqualHeightElement>
      </Optional>
    </Box>
  );
};

ProductPriceAndFinance.propTypes = {
  modelKey: PropTypes.string.isRequired,
  modelYear: PropTypes.string.isRequired,
  trimId: PropTypes.string.isRequired,
  transmissionId: PropTypes.string.isRequired,
  hidePriceAndFinance: PropTypes.oneOf(['', '1']),
};

export default ProductPriceAndFinance;
