import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Copy, H5, H6, Media, Optional } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';
import Toggle from './Toggle';
import TransmissionsRadioGroup from './TransmissionsRadioGroup';
import PriceComponent from '../../PriceComponent';
import Context from '../service/Context';

import themeStyles from './Details.styles';

const PricingWrapper = themeStyles.apply(Box, 'PricingWrapper');
const TransmissionToggleContent = themeStyles.apply(Box, 'TransmissionToggleContent');
const TransmissionToggleValue = themeStyles.apply(Copy, 'TransmissionToggleValue');

const Pricing = ({
  hasError,
  isDark,
  isFetching,
  pricing,
  selectedTransmission,
  setSelectedTransmission,
  transmissions,
  trimName,
}) => {
  const { t } = useTranslation();
  const { showTransmissionToggle, priceStyles, transmissionLabel } = useContext(Context);
  const canToggleTransmission = transmissions.length > 1;

  if (pricing?.hasError) {
    return <Copy color={isDark ? 'white' : 'typographyDefault'}>{t('Shared.Common.priceErrorLabel')}</Copy>;
  }

  const toggleTransmission = () => {
    setSelectedTransmission(
      selectedTransmission?.detKey?.value === transmissions[0]?.detKey?.value ? transmissions[1] : transmissions[0],
    );
  };

  const toggleRadioGroupTransmission = ({ target }) => {
    const selection = transmissions?.find(item => item?.detKey?.value === target?.value);
    setSelectedTransmission(selection);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const TransmissionToggle = () => (
    <>
      <H6 color={isDark ? 'white' : 'typographyDefault'} my="m">
        {t('Pages.Models.Exploration.selectTransmissionLabel')}
      </H6>
      <TransmissionToggleContent>
        <TransmissionToggleValue isDark={isDark} size="m">
          {transmissions[0]?.transmissionName?.value || ''}
        </TransmissionToggleValue>
        <Toggle
          isDark={isDark}
          on={selectedTransmission?.detKey?.value === transmissions[1]?.detKey?.value}
          onClick={() => toggleTransmission()}
          toggleAriaLabel={t('Shared.Common.toggleExteriorAndInteriorAria')}
        />
        <TransmissionToggleValue isDark={isDark} size="m">
          {transmissions[1]?.transmissionName?.value || ''}
        </TransmissionToggleValue>
      </TransmissionToggleContent>
    </>
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const MobilePricingContent = () => (
    <Box>
      <Optional when={canToggleTransmission && showTransmissionToggle}>
        <Box mb="m">
          <TransmissionToggle />
        </Box>
      </Optional>
      <Optional when={!showTransmissionToggle}>
        <Box mb="m">
          <TransmissionsRadioGroup
            toggleTransmission={toggleRadioGroupTransmission}
            defaultKey={selectedTransmission?.detKey?.value}
            transmissions={transmissions}
            isDark={isDark}
            title={transmissionLabel}
          />
        </Box>
      </Optional>
      <PriceComponent
        prices={{
          allInPrice: {
            value: pricing?.sellingPrice,
            label: t('Shared.Common.sellingPriceLabel'),
          },
          msrpPrice: {
            value: pricing?.msrp,
            label: t('Shared.Common.msrpStartingFromLabel'),
          },
          discount: pricing?.discount,
        }}
        allInPriceTooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
        errorMessage={t('Pages.Models.Exploration.contactLocalDealerLabel')}
        hasError={hasError}
        height={['auto', 'auto', undefined]}
        horizontalAlignment="center"
        isFetching={isFetching}
        msrpStartingFromTooltipLabel={t('Shared.Common.msrpStartingFromTooltipLabel')}
        priceComponentStyles={priceStyles}
        saveAboveLabel
      />
    </Box>
  );

  return (
    <PricingWrapper my="m">
      <Media lessThan="desktop">
        <Box display="flex" justifyContent="center">
          <MobilePricingContent />
        </Box>
      </Media>
      <Media greaterThanOrEqual="desktop">
        <H5 color={isDark ? 'white' : 'typographyDefault'} my="m" data-testid="cy-trim-details-title">
          {compiler(trimName)}
        </H5>
        <Optional when={canToggleTransmission && showTransmissionToggle}>
          <Box mb="m">
            <TransmissionToggle />
          </Box>
        </Optional>
        <Optional when={!showTransmissionToggle}>
          <Box mb="m">
            <TransmissionsRadioGroup
              toggleTransmission={toggleRadioGroupTransmission}
              defaultKey={selectedTransmission?.detKey?.value}
              transmissions={transmissions}
              isDark={isDark}
              title={transmissionLabel}
            />
          </Box>
        </Optional>
        <Box display="flex">
          <PriceComponent
            prices={{
              allInPrice: {
                value: pricing?.sellingPrice,
                label: t('Shared.Common.sellingPriceLabel'),
              },
              msrpPrice: {
                value: pricing?.msrp,
                label: t('Shared.Common.msrpStartingFromLabel'),
              },
              discount: pricing?.discount,
            }}
            allInPriceTooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
            errorMessage={t('Pages.Models.Exploration.contactLocalDealerLabel')}
            hasError={hasError}
            height={['auto', 'auto', undefined]}
            horizontalAlignment={['center', 'center', 'left']}
            isFetching={isFetching}
            msrpStartingFromTooltipLabel={t('Shared.Common.msrpStartingFromTooltipLabel')}
            priceComponentStyles={priceStyles}
            saveAboveLabel
          />
        </Box>
      </Media>
    </PricingWrapper>
  );
};

export default Pricing;
