import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Copy, Icon, Fade, Image, Optional } from '@honda-canada/design-system-react';
import CTA from '../CTA';
import ModelCardTrimPrice from '../TrimPrices/ModelCardTrimPrice';
import ModelCardTrimSpecialPrice from '../TrimPrices/ModelCardTrimSpecialPrice';
import useProductFinancial from '../../utils/hooks/useProductFinancial';

const financialFormatter = (data, isSellingPriceProvince) =>
  data.models?.map(model => ({
    isSellingPriceProvince,
    msrp: model?.trims?.[0]?.transmissions?.[0]?.exteriorColors?.[0]?.msrp,
    sellingPrice: model?.trims?.[0]?.transmissions?.[0]?.exteriorColors?.[0]?.sellingPrice,
  }));

const Error = ({ message }) => (
  <Box display="flex" minHeight="48px">
    <Icon name="information" mr="s" />
    <Copy size="small" maxWidth="160px">
      {message}
    </Copy>
  </Box>
);

const Content = ({
  buildCta,
  buildCtaType,
  exploreCta,
  exploreCtaType,
  gtmTitle,
  hasSpecialTrimAvailable,
  language,
  model,
  modelYear,
  shouldFetchFinancials,
  showMsrpPrice,
  showSellingPrice,
  specialPriceLabel,
  specialPriceTransmission,
  transmission,
  trim,
  vehicleType,
}) => {
  const { t } = useTranslation();
  const models = [
    {
      modelYear: model.modelYear,
      modelKey: model.modelKey,
      modelCode: transmission?.modelCode?.value,
    },
  ];

  if (specialPriceTransmission?.modelCode?.value) {
    models.push({
      modelYear: model.modelYear,
      modelKey: model.modelKey,
      modelCode: specialPriceTransmission.modelCode.value,
    });
  }

  const { financial, isFetching, hasError, setModels } = useProductFinancial({
    vehicleType,
    formatter: financialFormatter,
  });

  useEffect(() => {
    if (shouldFetchFinancials && models.length) {
      setModels(models);
    }
  }, [
    model.modelYear,
    model.modelKey,
    transmission?.modelCode?.value,
    specialPriceTransmission?.modelCode?.value,
    shouldFetchFinancials,
  ]);

  const msrp = {
    price: financial?.[0]?.msrp,
    label: t('Shared.Common.msrpStartingFromLabel'),
    tooltipLabel: t('Shared.Common.msrpStartingFromTooltipLabel'),
  };
  const specialPriceMsrp = financial?.[1]?.msrp;
  const selling = {
    price: financial?.[0]?.sellingPrice,
    label: t('Shared.Common.sellingPriceLabel'),
    tooltipLabel: t('Shared.Common.sellingPriceTooltipLabel'),
  };
  const specialPriceSelling = financial?.[1]?.sellingPrice;

  if (isFetching) {
    return <Icon name="animatedLoader" width="40px" height="40px" />;
  }

  if (hasError) {
    return <Error message={t('Shared.Errors.priceError')} />;
  }

  const gtmTags = {
    'data-gtm-model': model.gtmName,
    'data-gtm-trim': trim.gtmName,
    'data-gtm-body-style': trim.bodyStyle,
    'data-gtm-title': gtmTitle,
  };

  return (
    <>
      <Image {...model.nameBadge} style={{ maxWidth: '225px', maxHeight: '27px' }} disableObjectFit mb={['xs', 's']} />

      <Copy size="small" fontWeight="bold" mb={hasSpecialTrimAvailable ? 'xs' : 'm'}>
        {modelYear?.tagline?.value}
      </Copy>

      <Optional when={hasSpecialTrimAvailable}>
        <Box display="flex" alignItems="center" mb="m">
          <Image {...trim.nameBadge} height="12px" disableObjectFit />
          <Copy size="small" fontWeight="bold" ml="xs">
            {t('Cards.ModelCard.availableLabel')}
          </Copy>
        </Box>
      </Optional>

      <Box
        minHeight={['50px', '72px']}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Fade mb="m" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Optional when={showMsrpPrice}>
            <ModelCardTrimPrice {...msrp} language={language} />
          </Optional>
          <Optional when={showSellingPrice}>
            <ModelCardTrimPrice {...selling} language={language} />
          </Optional>
        </Fade>
        <Optional when={transmission.isBuildable}>
          <CTA
            linkField={buildCta.item}
            typeField={buildCtaType}
            mb="m"
            gtmTags={{ ...gtmTags, 'data-gtm-interaction-type': 'cta: build' }}
          />
        </Optional>
        <CTA
          linkField={exploreCta.item}
          typeField={exploreCtaType}
          mb="m"
          gtmTags={{ ...gtmTags, 'data-gtm-interaction-type': 'cta: explore' }}
        />
        <Optional when={showMsrpPrice && specialPriceMsrp && specialPriceLabel}>
          <ModelCardTrimSpecialPrice
            price={specialPriceMsrp}
            label={specialPriceLabel}
            tooltipLabel={msrp.tooltipLabel}
            language={language}
          />
        </Optional>
        <Optional when={showSellingPrice && specialPriceSelling && specialPriceLabel}>
          <ModelCardTrimSpecialPrice
            price={specialPriceSelling}
            label={specialPriceLabel}
            tooltipLabel={selling.tooltipLabel}
            language={language}
          />
        </Optional>
      </Box>
    </>
  );
};
export default Content;
