import React, { useContext } from 'react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import { useTranslation } from 'react-i18next';
import { Box, Image, Icon, Copy, Fade, Slide, Media, FloaterTooltipMarkdown } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { UserLocationContext } from '@honda-canada/user-location';
import { InView } from 'react-intersection-observer';
import { ModelFiltersContext } from '../ModelFiltersContext';
import { mapGTMCategory, colourTokenForParam } from '../../utils/sitecoreFields';
import CTAs from './CTAs';
import FinancialsProvider from '../FinancialsProvider';
import Container from './Container';
import { stripMarkdownHeading } from '../../utils/markdown';
import { getPriceTooltipLabelKey, getIsSellingPriceProvince } from '../../utils/financeUtils';

const Error = ({ message }) => (
  <Box display="flex" minHeight="48px" mb="s">
    <Icon name="information" iconColor="white" mr="s" />
    <Copy color="white" size="small" maxWidth="160px">
      {message}
    </Copy>
  </Box>
);

const financialFormatter = (financials = {}, strings, isSellingPriceProvince) => {
  const { models } = financials || [];
  const model = models[0];
  const trim = model?.trims && model.trims[0];
  const transmission = trim?.transmissions && trim.transmissions[0];
  const defaultExteriorColor = transmission?.exteriorColors && transmission.exteriorColors[0];

  return {
    isSellingPriceProvince,
    price: isSellingPriceProvince ? defaultExteriorColor?.sellingPrice : defaultExteriorColor?.msrp,
    label: isSellingPriceProvince ? strings.sellingPriceLabel : strings.msrpStartingFromLabel,
  };
};

const NsxModelCard = ({ fields = {}, params = {}, sitecoreContext, rendering }) => {
  const {
    mobileImage,
    desktopImage,
    tagline,
    nameBadge,
    ctaLink1,
    ctaLink2,
    modelCode,
    modelKey,
    modelYear,
    gtmTitle,
    gtmCategory,
    showPrice,
  } = fields;

  const { styleType, bgColour } = params;
  const { t } = useTranslation();
  const { language, provinces } = sitecoreContext;
  const isShort = styleType === 'Short';
  const isPricingVisible = (showPrice && showPrice?.value) || false;
  const modelFiltersContext = useContext(ModelFiltersContext);
  const { filterHasValues, filter } = modelFiltersContext || {};
  const backgroundColor = colourTokenForParam[bgColour?.toLowerCase()];
  const provinceCode = useContext(UserLocationContext)?.provinceCode;
  const isSellingPriceProvince = getIsSellingPriceProvince(provinceCode, provinces);

  // This component is filterable. See ModelListFilters/reducer.js
  if (!fields || filter.onlyFutureVehicles || filterHasValues) return null;

  const strings = {
    priceErrorLabel: t('Shared.Errors.priceError'),
    msrpStartingFromLabel: t('Shared.Common.msrpStartingFromLabel'),
    sellingPriceLabel: t('Shared.Common.sellingPriceLabel'),
  };

  const priceTooltip = (
    <FloaterTooltipMarkdown
      content={t(getPriceTooltipLabelKey(provinceCode, provinces))}
      mx="xs"
      contentWidth={isShort ? 200 : undefined}
      ariaLabel={t('Shared.Common.showTooltipPopupAria')}
      closeAriaLabel={t('Shared.Common.pressToClosePopupAria')}
    >
      {() => <Icon name="information" iconColor="white" />}
    </FloaterTooltipMarkdown>
  );

  return (
    <Box
      bg={backgroundColor}
      px={backgroundColor ? ['zero', 's'] : undefined}
      pt={backgroundColor ? ['zero', 'l'] : undefined}
      pb="l"
    >
      <InView threshold={0.35} triggerOnce>
        {({ inView, ref }) => (
          <Fade
            shouldAnimate={inView}
            initialOpacity={0}
            ref={ref}
            overflow="hidden"
            width="100%"
            mx="auto"
            position="relative"
            maxWidth="maxWidth"
            data-gtm-category={mapGTMCategory(gtmCategory)}
            data-gtm-component-type={rendering?.componentName}
          >
            <Slide shouldAnimate={inView}>
              <Media at="mobile">
                <Image {...mobileImage?.value} width="100%" height="auto" />
              </Media>
              <Media greaterThanOrEqual="smallDesktop">
                <Image {...desktopImage?.value} disableObjectFit width="100%" height="auto" />
              </Media>
              <Container isShort={isShort}>
                <Image
                  {...nameBadge?.value}
                  mb="xs"
                  width={`${nameBadge?.value?.width || 206}px`}
                  height={`${nameBadge?.value?.height || 23}px`}
                />
                <Copy color="white" fontWeight="bold" size={isShort ? 'subheading' : ''} mb={isShort ? 'xxs' : 'm'}>
                  {compiler(stripMarkdownHeading(tagline?.value))}
                </Copy>
                {isPricingVisible && (
                  <FinancialsProvider
                    models={[
                      {
                        modelKey: modelKey?.value,
                        modelCode: modelCode?.value,
                        modelYear: modelYear?.value,
                      },
                    ]}
                    formatter={data => financialFormatter(data, strings, isSellingPriceProvince)}
                  >
                    {({ financials: pricingInfo, isFetching, hasError }) => {
                      if (isFetching) {
                        return <Icon name="animatedLoader" width="40px" height="40px" />;
                      }
                      return hasError || !pricingInfo?.price ? (
                        <Error message={strings.priceErrorLabel} />
                      ) : (
                        <Fade
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          alignItems={isShort ? 'initial' : 'center'}
                        >
                          <Box display="flex">
                            <Copy size="regular" color="white">
                              {pricingInfo?.label}
                            </Copy>
                            {priceTooltip}
                          </Box>
                          <Copy size="quoteBody" fontWeight="bold" color="white">
                            {formatPrice(pricingInfo?.price, language)}
                          </Copy>
                        </Fade>
                      );
                    }}
                  </FinancialsProvider>
                )}
                <CTAs isShort={isShort} buildCta={ctaLink1} exploreCta={ctaLink2} gtmTitle={gtmTitle} />
              </Container>
            </Slide>
          </Fade>
        )}
      </InView>
    </Box>
  );
};

export default withSitecoreContext()(NsxModelCard);
