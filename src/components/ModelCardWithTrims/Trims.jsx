import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import uniq from 'lodash/uniq';
import { H6, Row, Column, Media, Box, Fade, Image, Optional } from '@honda-canada/design-system-react';
import { SplideSlide } from '@splidejs/react-splide';

import TrimCard from '../TrimCard';
import CarouselSlider from '../CarouselSlider';
import CTAs from './shared/CTAs';
import useSharedApps from '../../utils/sitecoreContext/useSharedApps';
import { getGtmTagValue } from '../../utils/gtmEvents';
import { BUILD_AND_PRICE_URL } from '../../utils/constants';
import { getTrimPricing } from './service/utils';
import { getBapQueryStringVariables } from '../../utils/urls';
import themeStyles from './ModelCardWithTrims.styles';
import { ModelFiltersContext } from '../ModelFiltersContext';
import PriceComponent from '../PriceComponent';
import { useLanguage } from '../../utils/sitecoreContext';
import Context from './service/Context';
import { EqualHeight } from '../../utils/components/EqualHeight';

const CTAsWrapper = themeStyles.apply(Box, 'CTAsWrapper');
const TrimCardMobileWrapper = themeStyles.apply(Box, 'TrimCardMobileWrapper');
const TrimCardDesktopWrapper = themeStyles.apply(Row, 'TrimCardDesktopWrapper');
const TrimCardColumn = themeStyles.apply(Column, 'TrimCardColumn');

const Trims = ({ models, paymentOptions, showInformationalApr, componentName }) => {
  const language = useLanguage();
  const { t } = useTranslation();
  const baseUrl = useSharedApps(BUILD_AND_PRICE_URL);
  const modelFiltersContext = useContext(ModelFiltersContext);
  const { financials, isFetching, hasError } = modelFiltersContext || {};
  const {
    vehicleType,
    isUseLegacyPrice,
    isUsePriceComponent,
    hasCompareButton,
    priceStyles,
    trimCardAlignment,
    shouldSplitModelYearsOnNewRow,
    showDisclaimerAnchor,
    showPaymentInfoTooltip,
    hasTrimCardGtmTags,
    trimCardGtmInteractionType,
  } = useContext(Context);

  const priceComponent = trim => {
    if (isUseLegacyPrice) {
      return trim?.isDefaultTransmissionBuildable ? null : (
        <Fade>
          <H6 mb="xs">{t('Shared.Common.comingSoonLabel')}</H6>
        </Fade>
      );
    }

    return (
      <Optional when={isUsePriceComponent}>
        <PriceComponent
          prices={{
            allInPrice: {
              value: trim?.price?.allInPrice.value || trim?.pricing?.sellingPrice,
              label: t('Shared.Common.sellingPriceLabel'),
            },
            msrpPrice: {
              value: trim?.price?.msrpPrice.value || trim?.pricing?.msrp,
              label: t('Shared.Common.msrpStartingFromLabel'),
            },
            discount: trim?.pricing?.discount || trim?.price?.discount,
          }}
          isFetching={isFetching}
          hasError={hasError}
          priceComponentStyles={priceStyles}
          horizontalAlignment="center"
          height={['auto', 'auto', undefined]}
          msrpStartingFromTooltipLabel={t('Shared.Common.msrpStartingFromTooltipLabel')}
          allInPriceTooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
          errorMessage={t('Pages.Models.Exploration.contactLocalDealerLabel')}
        />
      </Optional>
    );
  };

  const trims = models?.map(trim => ({
    ...trim,
    ...getTrimPricing(financials, trim, isFetching, hasError),
    bapPath: trim?.isDefaultTransmissionBuildable
      ? `${baseUrl}${getBapQueryStringVariables(
          trim?.modelKey,
          trim?.modelYear,
          trim?.key,
          trim?.defaultTransmissionKey,
        )}`
      : null,
    detailsPath: trim?.trimLegacyPageUrl || trim?.detailsPath,
    showModelYear: true,
  }));
  const years = shouldSplitModelYearsOnNewRow ? uniq(trims.map(item => item.modelYear)) : ['ALL'];
  const trimsConditionallyFilteredByYear = year =>
    shouldSplitModelYearsOnNewRow ? trims.filter(trim => trim.modelYear === year) : trims;

  return (
    <EqualHeight>
      <Media at="mobile">
        <CarouselSlider length={trims.length} splideOptions={{ padding: { left: '8vw', right: '8vw' } }}>
          {({ currentSlide }) =>
            trims.map((trim, i) => {
              const trimCardGtmTags = hasTrimCardGtmTags && {
                'data-gtm-interaction-type': getGtmTagValue(trimCardGtmInteractionType),
                'data-gtm-component-type': getGtmTagValue(componentName),
                'data-gtm-body-style': getGtmTagValue(vehicleType),
                'data-gtm-category': getGtmTagValue(trim?.gtmModelName),
                'data-gtm-model': getGtmTagValue(trim?.gtmTrimName),
              };
              return (
                <SplideSlide key={trim?.key}>
                  <TrimCardMobileWrapper>
                    <TrimCard
                      trim={trim}
                      language={language}
                      image={<Image {...trim?.primaryThumbnail} />}
                      priceComponent={priceComponent(trim)}
                      paymentOptions={paymentOptions}
                      showInformationalApr={showInformationalApr}
                      vehicleType={vehicleType}
                      hasCompareButton={hasCompareButton}
                      showDisclaimerAnchor={showDisclaimerAnchor}
                      showPaymentInfoTooltip={showPaymentInfoTooltip}
                      {...trimCardGtmTags}
                      ctas={
                        <Fade
                          duration={currentSlide === i ? 't4' : 't6'}
                          direction={currentSlide === i ? 'in' : 'out'}
                          initialOpacity={currentSlide === i ? 0 : 1}
                        >
                          <CTAsWrapper>
                            <CTAs {...trim} pspTrimCardGtmTags={trimCardGtmTags} />
                          </CTAsWrapper>
                        </Fade>
                      }
                    />
                  </TrimCardMobileWrapper>
                </SplideSlide>
              );
            })
          }
        </CarouselSlider>
      </Media>
      <Media greaterThanOrEqual="smallDesktop">
        {years.map(year => (
          <TrimCardDesktopWrapper as="ul" key={year} trimCardAlignment={trimCardAlignment}>
            {trimsConditionallyFilteredByYear(year).map(trim => {
              const trimCardGtmTags = hasTrimCardGtmTags && {
                'data-gtm-title': 'view details',
                'data-gtm-interaction-type': getGtmTagValue(trimCardGtmInteractionType),
                'data-gtm-component-type': getGtmTagValue(componentName),
                'data-gtm-body-style': getGtmTagValue(vehicleType),
                'data-gtm-category': getGtmTagValue(trim?.gtmModelName),
                'data-gtm-model': getGtmTagValue(trim?.gtmTrimName),
              };
              return (
                <TrimCardColumn as="li" key={trim?.key}>
                  <TrimCard
                    trim={trim}
                    language={language}
                    image={<Image {...trim?.primaryThumbnail} />}
                    priceComponent={priceComponent(trim)}
                    paymentOptions={paymentOptions}
                    showInformationalApr={showInformationalApr}
                    vehicleType={vehicleType}
                    ctas={<CTAs {...trim} pspTrimCardGtmTags={trimCardGtmTags} />}
                    hoverImage={trim?.secondaryThumbnail ? <Image {...trim?.secondaryThumbnail} /> : null}
                    hasCompareButton={hasCompareButton}
                    showDisclaimerAnchor={showDisclaimerAnchor}
                    showPaymentInfoTooltip={showPaymentInfoTooltip}
                    {...trimCardGtmTags}
                  />
                </TrimCardColumn>
              );
            })}
          </TrimCardDesktopWrapper>
        ))}
      </Media>
    </EqualHeight>
  );
};

export default Trims;
