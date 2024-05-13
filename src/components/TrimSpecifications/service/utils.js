import { useTranslation } from 'react-i18next';
import { useThemeContext } from '@honda-canada/design-system-react';
import uniqBy from 'lodash/uniqBy';

import { flatten } from 'lodash';
import { variant1, variant2, variant3 } from './constants';
import { useDarkFromRoute } from '../../../utils/sitecoreContext';
import { isEmpty } from '../../../utils/object';

export const useConfiguration = variant => {
  const { borders } = useThemeContext();

  const isDark = useDarkFromRoute();
  const { t } = useTranslation();
  const sliderIndicators = 'isRound';
  let accordionsIconColorOverride = 'primary';
  let accordionsLabelColor = isDark ? 'white' : 'black';
  let arrowIconSize = 'large';
  let borderColor = 'grey.2';
  let boxShadow = ['0px -2px 4px rgba(0, 0, 0, 0.1)', 'none', 'none'];
  let borderTop = borders[1];
  let ctaAriaLabel = trimName => t('Shared.TrimSpecifications.buildThisTrimAriaLabel', { trimName });
  let ctaForceRender = false;
  let ctaLabel = t('Shared.TrimSpecifications.buildThisTrimLabel');
  let ctaStyling = {};
  let hasBapURL = true;
  let priceStyles;
  let showMobilePagination;
  let showModelYear;
  const suppressDiscount = true;
  let showPaymentDetails = true;
  let toolTipMarginLeft = 'xs';
  let badgePosition = '70px';
  let trimCardInviewStyles = {};

  switch (variant) {
    // ACURA_SITE_NAME
    case variant2:
      accordionsIconColorOverride = 'black';
      accordionsLabelColor = 'primary';
      showMobilePagination = false;
      break;

    // PSP_SITE_NAME
    case variant3:
      arrowIconSize = 'default';
      borderColor = null;
      borderTop = null;
      boxShadow = 'none';
      ctaAriaLabel = () => t('Pages.Models.Exploration.viewModelDetailsButton');
      ctaForceRender = true;
      ctaLabel = t('Pages.Models.Exploration.viewModelDetailsButton');
      ctaStyling = { pt: 'xl' };
      hasBapURL = false;
      showMobilePagination = true;
      showMobilePagination = true;
      showModelYear = false;
      showPaymentDetails = false;
      toolTipMarginLeft = 'xxs';
      priceStyles = {
        priceStyles: {
          title: {
            size: 'extraSmall',
          },
        },
      };
      badgePosition = ['68px', '70px', '70px'];
      trimCardInviewStyles = { display: 'flex', flex: '1', justifyContent: 'center' };
      break;

    // HONDA_SITE_NAME
    case variant1:
    default:
      break;
  }

  /**
   * @param {Boolean} isExpandedDefault
   */

  return {
    hasBapURL,
    showMobilePagination,
    showModelYear,
    showPaymentDetails,
    suppressDiscount,
    styles: {
      priceStyles,
      slider: {
        pagination: {
          arrowIconSize,
          sliderIndicators,
          borderTop,
          borderColor,
          boxShadow,
        },
        tooltip: {
          toolTipMarginLeft,
        },
      },
      badgePosition,
    },
    cta: {
      label: ctaLabel,
      ariaLabel: ctaAriaLabel,
      styling: ctaStyling,
      forceRender: ctaForceRender,
    },
    accordion: {
      iconColorOverride: accordionsIconColorOverride,
      labelColor: accordionsLabelColor,
    },
    trimCardInviewStyles,
  };
};

/* eslint-disable no-param-reassign */
export const mapPSPFields = fields => {
  if (!fields || isEmpty(fields)) {
    return {};
  }

  fields.modelYear.fields.trims = flatten(
    fields?.modelYear?.fields?.models?.map(model =>
      flatten(
        model.trims.map(trim => {
          trim.defaultTransmission.item = trim.defaultTransmission;
          trim.model = model;
          return trim;
        }),
      ),
    ),
  );

  fields.modelYear.fields.model = {
    detKey: { value: fields?.modelYear?.fields?.models?.[0]?.detKey?.value },
  };

  return fields;
};
/* eslint-enable */

export const getCategorizedSpecifications = (specifications, trims) => {
  const categories = uniqBy(specifications, 'name').map(category => {
    const specificationLabels = specifications
      .find(spec => spec.name === category.name)
      .specs.map(spec => ({
        name: spec.name,
        label: spec.label,
      }));
    const specificationsByTrim = trims.map(trim => {
      const trimId = parseInt(trim?.detIdentifier.value, 10);
      const allTrimSpecifications = specifications?.filter(spec => spec?.trimId === trimId);
      const categorySpecs = allTrimSpecifications.find(spec => spec.name === category.name)?.specs;
      return {
        trimId,
        specs: categorySpecs,
      };
    });

    return {
      name: category.name,
      label: category.label,
      specificationLabels,
      specifications: specificationsByTrim,
    };
  });

  return categories;
};

export const getHydratedTrims = (
  trims,
  modelYear,
  modelKey,
  financials,
  msrpStartingFromLabel,
  sellingPriceLabel,
  priceTooltipLabel,
  showMsrpPrice,
  showSellingPrice,
) => {
  const trimsFinancials = flatten(financials?.models?.map(model => model.trims));

  return (
    trims?.map(trim => {
      const defaultTransmissionKey = trim?.defaultTransmission?.item?.fields?.detKey?.value;
      const trimFinancial = trimsFinancials?.find(
        financialTrim => financialTrim.id?.toString() === trim?.detIdentifier.value,
      );
      const defaultTransmissions = trimFinancial?.transmissions?.find(item => item.key === defaultTransmissionKey);
      const priceMsrp = defaultTransmissions?.msrp;
      const priceLabelMsrp = msrpStartingFromLabel;
      const exteriorColor =
        trim?.defaultTransmission?.item?.fields?.defaultExteriorColor?.fields?.color?.fields?.detKey?.value;
      const priceSelling = exteriorColor
        ? defaultTransmissions?.exteriorColors?.find(c => c.key === exteriorColor)?.sellingPrice
        : defaultTransmissions?.exteriorColors?.[0].sellingPrice;
      const priceLabelSelling = sellingPriceLabel;

      return {
        detIdentifier: trim?.detIdentifier?.value,
        exteriorColorKey: trim?.defaultTransmission?.fields?.defaultExteriorColor?.fields?.color?.fields?.detKey?.value,
        image: trim?.primaryThumbnail?.item?.value,
        isBuildable: trim?.defaultTransmission?.item?.fields?.isBuildable?.value,
        isSpecialType: !!trim?.specialVehicleType?.item?.fields,
        modelKey: trim?.model?.detKey?.value || modelKey,
        modelYear,
        name: trim?.trimName?.value,
        nameBadge: trim?.specialVehicleType?.item && trim?.nameBadge?.item?.value,
        discount: {
          priceDiscountAmount: defaultTransmissions?.priceDiscountAmount,
          msrpWithDiscount: exteriorColor?.msrpWithDiscount,
          sellingPriceWithDiscount: exteriorColor?.sellingPriceWithDiscount,
        },
        priceLabelMsrp,
        priceLabelSelling,
        priceMsrp,
        priceSelling,
        priceTooltipLabel,
        showMsrpPrice,
        showSellingPrice,
        transmissionKey: trim?.defaultTransmission?.fields?.detKey?.value,
        transmissionModelCode: trim?.defaultTransmission?.item?.fields?.detKey?.value,
        trimKey: trim?.detKey?.value,
      };
    }) || []
  );
};

/**
 * Calculates the total number of pages based on the number of items,
 * number of items per page, and responsive mode.
 * @param {Array} items - An array of items.
 * @param {boolean} isMobile - A boolean indicating whether the user is on a mobile device.
 * @param {number} itemsPerPage - The number of items to show per page. Default is 1.
 * @returns {number} The total number of pages.
 */
export const getPageCount = (items, isMobile = false, itemsPerPage = 1) => {
  const numberOfItems = items?.length || 0;
  const itemsPerPageCount = Number.isNaN(itemsPerPage) ? 1 : itemsPerPage;
  const totalPages = Math.ceil(numberOfItems / itemsPerPageCount);
  const pageCount = isMobile ? numberOfItems : totalPages;

  return pageCount;
};
