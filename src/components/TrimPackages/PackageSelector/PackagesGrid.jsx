import React, { useContext } from 'react';
import { Copy, Wrapper, Column, Row, Button, H2, Image, Box, Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import keyCodes from '@honda-canada/js-utilities/lib/keyCodes';
import keypressCallback from '@honda-canada/js-utilities/lib/keypressCallback';

import TrimCard from '../../TrimCard';
import PriceComponent from '../../PriceComponent';
import ToggleWrapper from './ToggleWrapper';
import { styledCompiler } from '../../../utils/markdown';
import Context from '../service/Context';
import { useLanguage } from '../../../utils/sitecoreContext';
import CompareToggleButton from '../../ProductCard/CompareToggleButton';
import themeStyles from './PackageSelector.styles';

const StyledColumn = themeStyles.apply(Column, 'StyledColumn');
const StyledButton = themeStyles.apply(Button, 'StyledButton');
const GridWrapper = themeStyles.apply(Wrapper, 'GridWrapper');
const GridTitle = themeStyles.apply(H2, 'GridTitle');
const CompareButtonWrapper = themeStyles.apply(Box, 'CompareButtonWrapper');
const GridContent = themeStyles.apply(Row, 'GridContent');
const LegalText = themeStyles.apply(Copy, 'LegalText');

const PackagesGrid = ({
  gtmModelName,
  hasError,
  isFetching,
  isOpen: isPackageSelectorOpen,
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
    selectHeading,
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

  return (
    <ToggleWrapper
      enabled={trims.length > 1}
      hasError={hasError}
      height="calc(100vh - 215px)"
      isFetching={isFetching}
      isOpen={isPackageSelectorOpen}
      selectedTrim={selectedTrim}
      setIsOpen={setIsPackageSelectorOpen}
    >
      {({ setIsOpen }) => {
        const handleTrimClick = (e, trim) => {
          const isTooltipClick = e.target.closest('.pricing-tooltip');

          if (isTooltipClick) {
            if (e.target.click) e.target.click();
          } else {
            setSelectedTrim(trim);
            setIsOpen(false);
          }
        };

        return (
          <GridWrapper>
            <GridTitle data-testid="cy-select-heading">{selectHeading}</GridTitle>
            <Optional when={showCompareTrimsLabel}>
              <CompareButtonWrapper>
                <Button styling="tertiary" onClick={() => setIsCompareModalOpen(true)}>
                  {t('Pages.Models.Exploration.trimPackagesCompareLabel')}
                </Button>
              </CompareButtonWrapper>
            </Optional>
            <GridContent data-testid="cy-trimCards">
              {trims.map(trim => {
                const selected = trim.trimKey === selectedTrim?.trimKey;

                const compareGtmTags = showAddToCompareButton
                  ? {
                      'data-gtm-interaction-type': 'cta: compare',
                      'data-gtm-component-type': componentName,
                      'data-gtm-category': gtmCategoryProp,
                      'data-gtm-body-style': vehicleType,
                      'data-gtm-model': trim.gtmModelName,
                    }
                  : null;

                return (
                  <StyledColumn
                    as="li"
                    key={trim.trimKey}
                    role="listitem"
                    selected={selected}
                    tabIndex={0}
                    width={[1, 1 / 3, 1 / 4]}
                    onClick={e => {
                      handleTrimClick(e, trim);
                    }}
                    onKeyDown={keypressCallback(keyCodes.ENTER, e => {
                      handleTrimClick(e, trim);
                    })}
                  >
                    <TrimCard
                      cursor="pointer"
                      trim={trim}
                      paymentOptions={paymentOptions}
                      showPaymentDetails={showPaymentDetails}
                      showPaymentInfoTooltip={showPaymentInfoTooltip}
                      showDisclaimerAnchor={showDisclaimerTrimCard}
                      language={language}
                      showModelYear={showModelYear}
                      data-gtm-model={gtmModelName}
                      data-gtm-trim={trim.gtmTrimName}
                      data-gtm-body-style={trim.gtmBodyStyle}
                      data-gtm-interaction-type="trim selection"
                      data-gtm-title="trim selector"
                      image={<Image {...trim.image} />}
                      vehicleType={vehicleType}
                      hoverImage={trim.secondaryImage?.src ? <Image {...trim.secondaryImage} /> : null}
                      ctas={
                        <>
                          <StyledButton
                            as="div" // container is clickable
                            data-testid="cy-trimCTA"
                            styling="secondary"
                            className={selectTrimButton ? 'select-trim-button' : ''}
                            data-gtm-interaction-type="cta: explore"
                            data-gtm-title="view details"
                            data-gtm-component-type={componentName}
                            data-gtm-category={gtmCategoryProp}
                            data-gtm-body-style={vehicleType}
                            data-gtm-model={trim.gtmModelName}
                          >
                            {ctaLabel}
                          </StyledButton>
                          <Optional when={showAddToCompareButton}>
                            <CompareToggleButton
                              detId={trim.defaultTransmission?.detIdentifier?.value}
                              gtmTags={compareGtmTags}
                            />
                          </Optional>
                        </>
                      }
                      selected={selected}
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
                  </StyledColumn>
                );
              })}
            </GridContent>
            <LegalText size="legal">{styledCompiler(t('Pages.Models.Exploration.legalText'))}</LegalText>
          </GridWrapper>
        );
      }}
    </ToggleWrapper>
  );
};

export default PackagesGrid;
