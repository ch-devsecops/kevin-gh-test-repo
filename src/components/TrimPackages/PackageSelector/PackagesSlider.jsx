import React, { useContext } from 'react';
import { Box, Button, Fade, Copy, Image, Optional } from '@honda-canada/design-system-react';
import { SplideSlide } from '@splidejs/react-splide';
import { useTranslation } from 'react-i18next';

import { ModelExplorationContext } from '../../ModelExplorationContext';
import TrimCard from '../../TrimCard';
import PriceComponent from '../../PriceComponent';
import CarouselSlider from '../../CarouselSlider';
import ToggleWrapper from './ToggleWrapper';
import { styledCompiler } from '../../../utils/markdown';
import Context from '../service/Context';
import { useLanguage } from '../../../utils/sitecoreContext';

import themeStyles from './PackageSelector.styles';

const SliderContainer = themeStyles.apply(SplideSlide, 'SliderContainer');
const SliderWrapper = themeStyles.apply(Box, 'SliderWrapper');
const SliderContent = themeStyles.apply(Box, 'SliderContent');
const SliderLegalText = themeStyles.apply(Copy, 'SliderLegalText');
const SliderCTAPlaceholder = themeStyles.apply(Box, 'SliderCTAPlaceholder');

const PackagesSlider = ({
  hasError,
  isFetching,
  isOpen: isPackagesSliderOpen,
  selectedTrim,
  setIsCompareModalOpen,
  setIsOpen: setIsPackageSelectorOpen,
  setSelectedTrim,
  trims,
  gtmCategoryProp,
  componentName,
}) => {
  const language = useLanguage();
  const { t } = useTranslation();
  const {
    ctaLabel,
    paymentOptions,
    priceStyles,
    selectTrimButton,
    showAddToCompareButton,
    showCompareTrimsLabel,
    showDisclaimerTrimCard,
    showModelYear,
    showPaymentDetails,
    showPaymentInfoTooltip,
    vehicleType,
  } = useContext(Context);

  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isModelNavOpen } = modelExplorationContext;

  if (isModelNavOpen) return null;

  const noSelectedTrimHeight = showAddToCompareButton ? 245 : 185;

  const toggleWrapperHeight = `calc(100vh - ${selectedTrim ? 245 : noSelectedTrimHeight}px)`;

  return (
    <ToggleWrapper
      selectedTrim={selectedTrim}
      height={toggleWrapperHeight}
      enabled={trims.length > 1}
      isOpen={isPackagesSliderOpen}
      setIsOpen={setIsPackageSelectorOpen}
      isFetching={isFetching}
      hasError={hasError}
    >
      {({ setIsOpen }) => (
        <SliderWrapper role="listitem" tabIndex="-1">
          <CarouselSlider
            tabIndex="-1"
            length={trims.length}
            splideOptions={{
              padding: null,
            }}
            content={
              <>
                <Optional when={showCompareTrimsLabel}>
                  <SliderContent>
                    <Button styling="tertiary" onClick={() => setIsCompareModalOpen(true)}>
                      {t('Pages.Models.Exploration.trimPackagesCompareLabel')}
                    </Button>
                  </SliderContent>
                </Optional>
                <SliderLegalText size="legal">
                  {styledCompiler(t('Pages.Models.Exploration.legalText'))}
                </SliderLegalText>
              </>
            }
          >
            {({ currentSlide }) =>
              trims.map((trim, i) => {
                const selected = trim.trimKey === selectedTrim?.trimKey;

                return (
                  <SliderContainer key={trim.transmissionModelCode} selected={selected} tabIndex="-1">
                    <TrimCard
                      trim={trim}
                      paymentOptions={paymentOptions}
                      showPaymentDetails={showPaymentDetails}
                      showPaymentInfoTooltip={showPaymentInfoTooltip}
                      showDisclaimerAnchor={showDisclaimerTrimCard}
                      language={language}
                      showModelYear={showModelYear}
                      hasCompareButton={showAddToCompareButton}
                      detId={trim?.defaultTransmission?.detIdentifier?.value}
                      image={<Image {...trim.image} loading="eager" />}
                      ctas={
                        currentSlide === i ? (
                          <Fade duration="t4">
                            <Button
                              data-testid="cy-trimCTA"
                              styling="secondary"
                              className={selectTrimButton ? 'select-trim-button' : ''}
                              data-gtm-interaction-type="cta: explore"
                              data-gtm-title="view details"
                              data-gtm-component-type={componentName}
                              data-gtm-category={gtmCategoryProp}
                              data-gtm-body-style={vehicleType}
                              data-gtm-model={trim.gtmModelName}
                              onClick={() => {
                                setSelectedTrim(trim);
                                setIsOpen(false);
                              }}
                              aria-label={`${t('Pages.Models.Exploration.selectTrimLabel')} ${trim.name}`}
                            >
                              {ctaLabel}
                            </Button>
                          </Fade>
                        ) : (
                          <SliderCTAPlaceholder />
                        )
                      }
                      vehicleType={vehicleType}
                      priceComponent={
                        <PriceComponent
                          prices={{
                            allInPrice: {
                              value: trim?.pricing?.sellingPrice,
                              label: t('Shared.Common.sellingPriceLabel'),
                            },
                            msrpPrice: {
                              value: trim?.pricing?.msrp,
                              label: t('Shared.Common.msrpStartingFromLabel'),
                            },
                            discount: trim?.pricing?.discount,
                          }}
                          allInPriceTooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
                          errorMessage={t('Pages.Models.Exploration.contactLocalDealerLabel')}
                          hasError={hasError}
                          height={['auto', 'auto', undefined]}
                          horizontalAlignment="center"
                          isFetching={isFetching}
                          msrpStartingFromTooltipLabel={t('Shared.Common.msrpStartingFromTooltipLabel')}
                          priceComponentStyles={priceStyles}
                        />
                      }
                    />
                  </SliderContainer>
                );
              })
            }
          </CarouselSlider>
        </SliderWrapper>
      )}
    </ToggleWrapper>
  );
};

export default PackagesSlider;
