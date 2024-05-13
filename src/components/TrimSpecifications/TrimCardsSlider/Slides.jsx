import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Box, Column, Image, Row, Scale, useThemeContext } from '@honda-canada/design-system-react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useTranslation } from 'react-i18next';

import CTA from './CTA';
import Context from '../service/Context';
import PriceComponent from '../../PriceComponent';
import TrimCard from '../../TrimCard';
import themeStyles from './TrimCardsSlider.styles';
import useSharedApps from '../../../utils/sitecoreContext/useSharedApps';
import { BUILD_AND_PRICE_URL } from '../../../utils/constants';
import { EqualHeight } from '../../../utils/components/EqualHeight';
import { getBapQueryStringVariables, getTrimsDetailsUrl } from '../../../utils/urls';
import { useLanguage } from '../../../utils/sitecoreContext';

const StyledSplide = themeStyles.apply(SplideSlide, 'AccordionsSplide');
const Wrapper = themeStyles.apply(Row, 'Wrapper');
const DownloadContainer = themeStyles.apply(Column, 'DownloadContainer');
const SliderContainer = themeStyles.apply(Column, 'SliderContainer');

const TrimCardSlides = ({
  downloadCTA,
  trims,
  shouldAnimateImage,
  shouldCTAsFade,
  sliderRef,
  trimsRef,
  isHidden,
  hasBapURL,
  componentName,
  trimDetailsBaseURL,
}) => {
  const trimSlides = trimsRef?.current?.slides;

  const language = useLanguage();
  const { breakpoints } = useThemeContext();
  const { t } = useTranslation();
  const bapPathUrl = useSharedApps(BUILD_AND_PRICE_URL);

  const configurationProvider = useContext(Context);
  const {
    hasError,
    isDark,
    isFetching,
    isMobile,
    paymentOptions,
    priceStyles,
    selectedTrim,
    setCurrentSlide,
    setSelectedTrim,
    showModelYear,
    showPaymentDetails,
    splideOptions,
    suppressDiscount,
    vehicleType,
    trimCardInviewStyles,
  } = configurationProvider || {};

  useEffect(() => {
    trimSlides?.forEach(slide => {
      const focusableElements = slide.querySelectorAll('button, a');
      const isAriaHidden = slide.getAttribute('aria-hidden');
      if (isAriaHidden) {
        focusableElements.forEach(element => {
          element.setAttribute('tabIndex', '-1');
        });
      } else {
        focusableElements.forEach(element => {
          element.setAttribute('tabIndex', '0');
        });
      }
    });
  });

  return (
    <Wrapper className="cy-trim-spec-slides" ref={sliderRef} isDark={isDark} isHidden={isHidden}>
      <DownloadContainer>{downloadCTA}</DownloadContainer>
      <EqualHeight>
        <SliderContainer trimCount={trims?.length}>
          <Splide
            options={{
              ...splideOptions,
              breakpoints: {
                [parseInt(breakpoints[0], 10) - 1]: {
                  padding: {
                    left: '12vw',
                    right: '12vw',
                  },
                },
                [parseInt(breakpoints[0], 10)]: {
                  padding: {
                    left: '0px',
                    right: '0px',
                  },
                },
                [parseInt(breakpoints[1], 10)]: {
                  padding: {
                    left: '0px',
                    right: '0px',
                  },
                },
              },
            }}
            ref={trimsRef}
            onActive={(_, slide) => {
              setCurrentSlide(slide.index);
            }}
          >
            {trims?.map(trim => {
              const bapUrl = hasBapURL
                ? `${bapPathUrl}${getBapQueryStringVariables(
                    trim.modelKey,
                    trim.modelYear,
                    trim.trimKey,
                    trim.transmissionModelCode,
                  )}`
                : getTrimsDetailsUrl(trim.trimKey, trimDetailsBaseURL);

              return (
                <StyledSplide key={trim.name} tabIndex={-1}>
                  <TrimCard
                    onClick={e => {
                      if (e.target.closest('button') === null) {
                        setSelectedTrim(trim.detIdentifier);
                      }
                    }}
                    px="zero"
                    py="45px"
                    trim={trim}
                    language={language}
                    showModelYear={showModelYear}
                    vehicleType={vehicleType}
                    paymentOptions={paymentOptions}
                    showPaymentDetails={showPaymentDetails}
                    suppressDiscount={suppressDiscount}
                    data-testid="cy-trim-specification-card"
                    image={
                      <Scale startAt={1} endAt={0.9} duration="t6" shouldAnimate={shouldAnimateImage}>
                        <Box opacity={shouldAnimateImage ? 0.5 : 1} transition="opacity .6s ease-in">
                          <Image {...trim.image} loading="eager" />
                        </Box>
                      </Scale>
                    }
                    priceComponent={
                      <PriceComponent
                        prices={{
                          allInPrice: {
                            value: trim.priceSelling,
                            label: trim.priceLabelSelling,
                          },
                          msrpPrice: {
                            value: trim.priceMsrp,
                            label: trim.priceLabelMsrp,
                          },
                          discount: trim.discount,
                        }}
                        allInPriceTooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
                        errorMessage={t('Pages.Models.Exploration.contactLocalDealerLabel')}
                        hasError={hasError}
                        height={['auto', 'auto', undefined]}
                        horizontalAlignment="center"
                        isFetching={isFetching}
                        msrpStartingFromTooltipLabel={t('Shared.Common.msrpStartingFromTooltipLabel')}
                        priceComponentStyles={priceStyles}
                        suppressDiscount={suppressDiscount}
                      />
                    }
                    ctas={
                      <CTA
                        isBuildable={trim.isBuildable}
                        bapUrl={bapUrl}
                        trim={trim}
                        shouldCTAsFade={shouldCTAsFade}
                        componentName={componentName}
                      />
                    }
                    selected={!isMobile && trim.detIdentifier === selectedTrim}
                    trimCardInviewStyles={trimCardInviewStyles}
                  />
                </StyledSplide>
              );
            })}
          </Splide>
        </SliderContainer>
      </EqualHeight>
    </Wrapper>
  );
};

TrimCardSlides.propTypes = {
  downloadCTA: PropTypes.shape({}),
  trims: PropTypes.arrayOf(PropTypes.shape({})),
  shouldAnimateImage: PropTypes.bool,
  shouldCTAsFade: PropTypes.bool,
  sliderRef: PropTypes.shape({}),
  trimsRef: PropTypes.shape({}),
  isHidden: PropTypes.bool,
  hasBapURL: PropTypes.bool,
  trimDetailsBaseURL: PropTypes.string,
};

export default TrimCardSlides;
