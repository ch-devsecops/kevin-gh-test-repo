import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserLocationContext } from '@honda-canada/user-location';
import { Icon, Box, Copy, Optional } from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import css from '@styled-system/css';

import OffersProvider from '../OffersProvider';
import Emissions from './Emissions';
import { ModelExplorationContext } from '../ModelExplorationContext';
import PaymentDetails from './PaymentDetails';
import usePreloadMediaImages from '../../utils/hooks/usePreloadMediaImages';
import { stripMarkdown } from '../../utils/markdown';
import { getIsSellingPriceProvince, getShowPriceFlags } from '../../utils/financeUtils';
import { useTrimPayment } from '../../apiHooks';
import TrimPriceWithTooltip from '../TrimPrices/TrimPriceWithTooltip';
import Title from './Title';
import Link from './Link';
import { EMISSIONS_URL, HONDA_SITE_NAME } from '../../utils/constants';
import useSharedApps from '../../utils/sitecoreContext/useSharedApps';
import { useConfiguration, compareLabelFontSize, compareLabelLineHeight } from './constants';
import trimPaymentFormatter from '../TrimPackages/Details/Payment/utils';
import CompareToggleButton from '../ProductCard/CompareToggleButton';
import { EqualHeightElement } from '../../utils/components/EqualHeight';
import SaveLabel from '../PriceComponent/SaveLabel';

import themeStyles from './TrimCard.styles';
import { useAppName, useProvinces, useSettings } from '../../utils/sitecoreContext';

const TrimCardImageLink = themeStyles.apply(Link, 'TrimCardImageLink');

const TrimCard = ({
  ctas,
  cursor,
  getAddToCompareId,
  hasCompareButton,
  hoverImage,
  image,
  detId,
  language,
  paymentOptions,
  priceComponent,
  selected,
  showInformationalApr,
  showPaymentDetails,
  showPaymentInfoTooltip,
  showDisclaimerAnchor,
  suppressDiscount,
  trim = {},
  variant,
  vehicleType,
  showModelYear,
  trimCardInviewStyles,
  ...otherProps
}) => {
  const { paymentDetailStyles, showModelYear: showModelYearFromConfig } = useConfiguration(variant, showModelYear);
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  const [trimImage, setTrimImage] = useState(image);
  const showPayment = !!paymentOptions?.paymentMethod && !!paymentOptions?.paymentFrequency && showPaymentDetails;
  const [shouldFetch, setShouldFetch] = useState(false);
  usePreloadMediaImages(hoverImage?.props?.src);
  const { t } = useTranslation();
  const { defaultProvince } = useSettings();
  const appName = useAppName();
  const provinces = useProvinces();
  const emissionsUrl = useSharedApps(EMISSIONS_URL);
  const provinceCode = useContext(UserLocationContext)?.provinceCode || defaultProvince;
  const isSellingPriceProvince = getIsSellingPriceProvince(provinceCode, provinces);
  const { showMsrpPrice, showSellingPrice } = getShowPriceFlags(provinceCode, provinces, paymentOptions);
  const trimPayment = {
    trimKey: trim.key,
    transmissionKey: trim.defaultTransmissionKey,
    exteriorColorKey: trim.defaultExteriorColorKey,
    ...trim,
  };
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { payment, isFetching: isTrimPaymentFetching } = useTrimPayment(
    trimPayment,
    paymentOptions,
    provinceCode,
    data => trimPaymentFormatter(appName, data, paymentOptions, showInformationalApr, language),
    shouldFetch && showPayment,
    vehicleType,
    isSellingPriceProvince,
  );

  useEffect(() => {
    setTrimImage(image);
  }, [image]);

  if (!trim) return null;

  let hasDiscount;
  let discountValue;

  if (priceComponent) {
    discountValue =
      priceComponent?.props?.prices?.discount?.priceDiscountAmount || trim?.pricing?.discount?.priceDiscountAmount;
    hasDiscount = !!discountValue && !suppressDiscount;
  }

  const gtmTags = {
    'aria-label': `${t('Shared.Common.viewTrimLabel')} ${trim.modelYear} ${stripMarkdown(trim.name)}, ${
      trim.gtmModelName
    }`,
    'data-gtm-model': trim.gtmModelName,
    'data-gtm-trim': trim.gtmTrimName,
    'data-gtm-body-style': trim.gtmBodyStyle,
    'data-gtm-title': 'vehicle tile',
    'data-gtm-interaction-type': 'cta: explore',
  };

  const StyledBox = styled(Box)(
    ({ bgColor }) =>
      css({
        '&:hover': {
          backgroundColor: ['transparent', isDark ? 'transparent' : bgColor],
        },
      }),
    selected &&
      css({
        backgroundColor: ['transparent', isDark ? 'transparent' : 'grey.5'],
      }),
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const PriceContent = () => {
    if (priceComponent) return priceComponent;

    const { pricing } = trim;

    if (!pricing || pricing.isFetching) return <Box height="48px" />;
    if (pricing.hasError) {
      return (
        <Box display="flex" alignItems="center" height="48px">
          <Icon name="information" mr="s" inverted={isDark} />
          <Copy size="small" maxWidth="160px" color={isDark ? 'white' : undefined}>
            {t('Shared.Common.priceErrorLabel')}
          </Copy>
        </Box>
      );
    }
    return (
      <Box display="flex" flexDirection="column">
        <Optional when={showMsrpPrice}>
          <TrimPriceWithTooltip
            price={pricing?.msrp}
            priceLabel={t('Shared.Common.msrpStartingFromLabel')}
            tooltipLabel={t('Shared.Common.msrpStartingFromTooltipLabel')}
            isDark={isDark}
            language={language}
            labelContentStyles={{ display: 'flex', justifyContent: 'center' }}
            priceLabelStyles={{ size: 'extraSmall' }}
            priceStyles={{ textAlign: 'center' }}
            tooltipStyles={{
              mt: ['-4px', 'zero'],
              textAlign: 'left',
              lineHeight: '18px',
            }}
            mb={showSellingPrice && 'xs'}
            data-testid="msrp-content"
          />
        </Optional>
        <Optional when={showSellingPrice}>
          <TrimPriceWithTooltip
            price={pricing?.sellingPrice}
            priceLabel={t('Shared.Common.sellingPriceLabel')}
            tooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
            isDark={isDark}
            language={language}
            labelContentStyles={{ display: 'flex', justifyContent: 'center' }}
            priceLabelStyles={{ size: 'extraSmall' }}
            priceStyles={{ textAlign: 'center' }}
            tooltipStyles={{
              mt: ['-4px', 'zero'],
              textAlign: 'left',
              lineHeight: '18px',
            }}
            data-testid="selling-price-content"
          />
        </Optional>
      </Box>
    );
  };

  const compareGtmTags = hasCompareButton
    ? {
        'data-gtm-interaction-type': 'cta: compare',
        'data-gtm-component-type': 'vehicle tile',
        'data-gtm-category': trim.gtmModelName,
        'data-gtm-body-style': vehicleType,
        'data-gtm-model': trim.gtmTrimName,
      }
    : null;

  return (
    <InView
      data-testid="cy-trim-card"
      triggerOnce
      onChange={inView => inView && setShouldFetch(true)}
      style={{ trimCardInviewStyles }}
    >
      <OffersProvider transmissionKey={trim.defaultTransmissionKey} shouldFetch={shouldFetch}>
        {({ hasOffers }) => (
          <StyledBox
            bgColor="grey.5"
            px={['default', 's']}
            py={['default', 's']}
            selected={selected}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="column"
            cursor={cursor}
            {...(hoverImage && {
              onMouseEnter: () => setTrimImage(hoverImage),
              onMouseLeave: () => setTrimImage(image),
            })}
            {...otherProps}
          >
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
              <EqualHeightElement name="TrimCardTitleSave" placeholder={!hasDiscount}>
                <Optional when={hasDiscount}>
                  <SaveLabel
                    value={discountValue}
                    saveStyles={{
                      copy: {
                        styles: {
                          fontSize: 'sm',
                        },
                      },
                    }}
                  />
                </Optional>
              </EqualHeightElement>
              <EqualHeightElement name="TrimCardTitle" inherit>
                <Box mb="xxs" data-testid="cy-trimcard-title">
                  <Title
                    showModelYear={trim?.showModelYear || showModelYearFromConfig}
                    detailsPath={trim.detailsPath}
                    name={trim.name}
                    modelYear={trim.modelYear}
                    nameBadge={trim.nameBadge}
                    isDark={isDark}
                    gtmTags={gtmTags}
                  />
                </Box>
              </EqualHeightElement>
              <EqualHeightElement name="PriceContent" inherit>
                <Box mt="xxs" mb={hasOffers ? 'xxs' : ['22px', '26px']}>
                  <PriceContent />
                </Box>
              </EqualHeightElement>

              {hasOffers ? (
                <Box display="flex" alignItems="center">
                  <Icon mr="xxs" name="specialOffer" iconColor="grey.0" />
                  <Copy color="grey.0" size="extraSmall" fontWeight="bold">
                    {hasOffers && t('Shared.Common.offersAvailableLabel')}
                  </Copy>
                </Box>
              ) : null}
            </Box>
            <Box data-testid="cy-trimcard-image-wrapper" height={['165px', 'auto']} mb="s">
              {trim.detailsPath ? (
                <TrimCardImageLink {...gtmTags} to={trim.detailsPath}>
                  {trimImage}
                </TrimCardImageLink>
              ) : (
                trimImage
              )}
            </Box>

            <Optional when={showPaymentDetails}>
              <EqualHeightElement name="PaymentDetails">
                <Optional
                  when={payment && priceComponent && trim?.pricing !== null && !!trim?.pricing?.hasError === false}
                >
                  <PaymentDetails
                    isDark={isDark}
                    payment={payment}
                    isFetching={isTrimPaymentFetching}
                    paymentOptions={paymentOptions}
                    trim={trim}
                    isSellingPriceProvince={isSellingPriceProvince}
                    appName={appName}
                    showInfoModal={showInfoModal}
                    setShowInfoModal={setShowInfoModal}
                    showPaymentInfoTooltip={showPaymentInfoTooltip}
                    showDisclaimerAnchor={showDisclaimerAnchor}
                    paymentDetailStyles={paymentDetailStyles}
                  />
                </Optional>
              </EqualHeightElement>
            </Optional>

            {ctas}
            {appName === HONDA_SITE_NAME ? (
              <Emissions
                rating={trim.emissionRating}
                segmentAverage={trim.emissionSegmentAverage}
                url={emissionsUrl}
                name={trim.name}
                modelYear={trim.modelYear}
              />
            ) : null}
            {hasCompareButton ? (
              <CompareToggleButton
                compareLabelFontSize={compareLabelFontSize}
                compareLabelLineHeight={compareLabelLineHeight}
                detId={getAddToCompareId(trim) || detId}
                gtmTags={compareGtmTags}
              />
            ) : null}
          </StyledBox>
        )}
      </OffersProvider>
    </InView>
  );
};

TrimCard.defaultProps = {
  showPaymentDetails: true,
};

TrimCard.propTypes = {
  trim: PropTypes.shape({
    defaultTransmissionKey: PropTypes.string,
    pricing: PropTypes.shape({
      hasError: PropTypes.bool,
      isFetching: PropTypes.bool,
      msrp: PropTypes.number,
      sellingPrice: PropTypes.number,
    }),
    nameBadge: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
    name: PropTypes.string,
    detailsPath: PropTypes.string,
    isSellingPriceProvince: PropTypes.bool,
    emissionRating: PropTypes.string,
    emissionSegmentAverage: PropTypes.string,
  }),
  language: PropTypes.oneOf(['en', 'fr']),
  ctas: PropTypes.node,
  cursor: PropTypes.string,
  selected: PropTypes.bool,
  image: PropTypes.node,
  hoverImage: PropTypes.node,
  priceComponent: PropTypes.node,
  paymentOptions: PropTypes.shape({
    paymentFrequency: PropTypes.string,
    paymentMethod: PropTypes.string,
  }),
  showPaymentDetails: PropTypes.bool,
  showPaymentInfoTooltip: PropTypes.bool,
  showDisclaimerAnchor: PropTypes.bool,
  detId: PropTypes.string,
};

export default TrimCard;
