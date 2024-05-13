import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQueries } from '@honda-canada/design-system-react';
import { UserLocationContext } from '@honda-canada/user-location';
import get from 'lodash/get';

import { variant1 } from './constants';
import { getPriceTooltipLabelKey, getShowPriceFlags } from '../../../utils/financeUtils';
import { useProvinces, useSettings } from '../../../utils/sitecoreContext';
import { getTrimPricing } from '../../ModelCardWithTrims/service/utils';

export const useConfiguration = variant => {
  const { t } = useTranslation();
  const { isSmallDesktop, isDesktop } = useMediaQueries();

  const isMobile = !(isSmallDesktop || isDesktop);

  const { defaultProvince } = useSettings();
  const provinces = useProvinces();
  const provinceCode = useContext(UserLocationContext)?.provinceCode || defaultProvince;

  const msrpStartingFromLabel = t('Shared.Common.msrpStartingFromLabel');
  const sellingPriceLabel = t('Shared.Common.sellingPriceLabel');
  const priceTooltipLabel = t(getPriceTooltipLabelKey(provinceCode, provinces));
  const { showMsrpPrice, showSellingPrice } = getShowPriceFlags(provinceCode, provinces);
  let defaultTransmissionsPath;

  switch (variant) {
    case variant1:
    default:
      defaultTransmissionsPath = 'defaultTransmission.fields.detKey.value';
      break;
  }

  return {
    isMobile,
    isSmallDesktop,
    hydratedTrimsProps: {
      defaultTransmissionsPath,
      msrpStartingFromLabel,
      sellingPriceLabel,
      priceTooltipLabel,
      showMsrpPrice,
      showSellingPrice,
    },
  };
};

export const getHydratedTrims = (trims, { financial, hasError, isFetching } = {}, props) =>
  trims?.map(trim => {
    const trimsFinancial = financial?.models?.find(item => item.modelKey === trim.model.detKey.value)?.trims;

    const defaultTransmissionKey = get(trim, props.defaultTransmissionsPath);
    const trimFinancial = trimsFinancial?.find(
      financialTrim => financialTrim.id?.toString() === trim?.detIdentifier.value,
    );
    const defaultTransmissions = trimFinancial?.transmissions?.find(item => item.key === defaultTransmissionKey);
    const priceMsrp = defaultTransmissions?.msrp;
    const priceLabelMsrp = props.msrpStartingFromLabel;
    const exteriorColor =
      trim?.defaultTransmission?.item?.fields?.defaultExteriorColor?.fields?.color?.fields?.detKey?.value;
    const priceSelling = exteriorColor
      ? defaultTransmissions?.exteriorColors?.find(c => c.key === exteriorColor)?.sellingPrice
      : defaultTransmissions?.exteriorColors?.[0].sellingPrice;
    const priceLabelSelling = props.sellingPriceLabel;

    const hydratedTrim = {
      ...trim,
      defaultTransmission: trim?.defaultTransmission.fields,
      defaultTransmissionKey,
      detIdentifier: trim?.detIdentifier?.value,
      image: trim?.primaryThumbnail?.item?.value,
      isBuildable: trim?.defaultTransmission?.fields?.isBuildable?.value,
      isSpecialType: !!trim?.specialVehicleType?.item?.fields,
      key: trim?.detKey?.value,
      modelKey: trim?.model?.detKey?.value,
      modelYear: trim?.model?.year?.year?.value,
      name: trim?.trimName?.value,
      priceLabelMsrp,
      priceLabelSelling,
      priceMsrp,
      priceSelling,
      priceTooltipLabel: props.priceTooltipLabel,
      showMsrpPrice: props.showMsrpPrice,
      showSellingPrice: props.showSellingPrice,
      transmissionModelCode: defaultTransmissionKey,
      trimKey: trim?.detKey?.value,
    };

    const price = getTrimPricing(financial, hydratedTrim, isFetching, hasError);

    return {
      ...hydratedTrim,
      ...price,
    };
  }) || [];
