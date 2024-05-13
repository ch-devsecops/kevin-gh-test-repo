import { useTranslation } from 'react-i18next';

import { flatten } from 'lodash';
import { isEmpty } from '../../../utils/object';
import {
  variant1,
  variant2,
  variant3,
  ALL_TAB,
  INTERIOR_TAB,
  EXTERIOR_TAB,
  PACKAGES_TAB,
  TRIM_DROPDOWN_KEY,
  TRANSMISSION_DROPDOWN_KEY,
  ACCESSORY_TYPE_DROPDOWN_KEY,
} from './constants';
import { useDarkFromRoute } from '../../../utils/sitecoreContext';

/**
 * Formatter used in fetching Accessories for Autos
 *
 * @param {array} Accessories - The array of Accessories from each tab.
 * @returns {object} - Compiles the Accessories arrays into an object containing the respective arrays
 */
export const formatAccessories = accessories => {
  const packageAccessories = {
    interior: [],
    exterior: [],
    packages: [],
  };

  accessories.forEach(accessory => {
    if (packageAccessories[accessory?.accessoryCategory?.key]) {
      packageAccessories[accessory?.accessoryCategory?.key]?.push(accessory);
    }
  });

  return packageAccessories;
};

/**
 * Formatter used in fetching Accessories for PSP or for any other Products with generic category
 *
 * @param {array} Accessories - The array of Accessories
 *  @returns {object} - Compiles the Accessories array into an object
 */
export const formatAccessoriesGenericCategory = accessories => {
  const packageAccessories = {};

  accessories.forEach(accessory => {
    if (!packageAccessories[accessory?.accessoryCategory?.key]) {
      packageAccessories[accessory?.accessoryCategory?.key] = [];
    }
    packageAccessories[accessory?.accessoryCategory?.key]?.push(accessory);
  });

  return packageAccessories;
};

/**
 * Stores a variety of props which change value depending on what site the user is on
 *
 * @param {variant} string - String containing the variant name
 *  @returns {object} - Returns an object containing the prop values based on the variant
 */
export const useConfiguration = variant => {
  const { t } = useTranslation();
  const isDark = useDarkFromRoute();
  let dropdownKeys = [TRIM_DROPDOWN_KEY];
  let showTabs = true;
  let showAccordion = true;
  let showSlider = false;
  let defaultTabs = [
    {
      key: INTERIOR_TAB,
      title: t('Pages.Models.Exploration.interiorLabel'),
    },
    {
      key: EXTERIOR_TAB,
      title: t('Pages.Models.Exploration.exteriorLabel'),
    },
    {
      key: PACKAGES_TAB,
      title: t('Pages.Models.Exploration.packagesLabel'),
    },
  ];
  let defaultTab = INTERIOR_TAB;
  let trimPathKey = 'defaultTransmission.detIdentifier';
  let trimTransmissionPathKey = '';
  let optionTrimValuePath = 'defaultTransmission.detIdentifier';
  let transmissionStateKey = 'submittedTrim';
  let accessoryFormatter = formatAccessories;
  const dropdownList = [
    {
      key: TRIM_DROPDOWN_KEY,
      label: t('Pages.Models.Exploration.trimLabel'),
      placeholder: t('Pages.Models.Exploration.trimLabel'),
    },
  ];
  let hasAsterisk = false;
  let priceDisclaimerPosition = 'top';
  let hasPartNumber = false;
  let hasPriceLabel = false;
  let hasComingSoon = false;
  let tabTitleFontFamily = 'bold';
  let accessoryCardBg = isDark ? 'black' : 'default';
  let accessoryCardWidth;
  let showOverlay = true;
  let showDetailsCard = false;
  let sizing;
  let hasImageNotFound = false;
  let disclaimerMargins;

  const comingSoonLabel = t('Shared.Common.comingSoonLabel');
  let priceDisclaimerLabel = t('Pages.Models.Exploration.msrpLabel');
  let buttonLabel = t('Shared.Common.submitButton');
  const partNumberLabel = t('Pages.Models.Exploration.partNumberLabel');
  const unableToLoadLabel = t('Pages.Models.Exploration.unableToLoadLabel');
  const pspMsrpLabel = t('Pages.Models.Exploration.msrpLabel');
  let dropdownDescription = '';
  let dropdownDescriptionStyles = {};
  let descriptionCopyOverflowStyles = {};
  let gtmInteractionType;
  let imageNotFoundLabel = '';

  switch (variant) {
    // PSP_SITE_NAME
    case variant2:
      accessoryFormatter = formatAccessoriesGenericCategory;
      transmissionStateKey = 'submittedTransmission';
      trimPathKey = 'detIdentifier';
      trimTransmissionPathKey = 'defaultTransmission.detIdentifier';
      optionTrimValuePath = 'detIdentifier';
      accessoryCardBg = 'white';
      showTabs = false;
      showAccordion = false;
      showSlider = true;
      dropdownKeys = [TRIM_DROPDOWN_KEY, TRANSMISSION_DROPDOWN_KEY, ACCESSORY_TYPE_DROPDOWN_KEY];
      defaultTab = ALL_TAB;
      defaultTabs = [];
      priceDisclaimerLabel = t('Pages.Models.Exploration.accessoriesDisclaimerText');

      buttonLabel = t('Pages.Models.Exploration.viewAccessoriesButton');
      dropdownList.splice(
        0,
        dropdownList.length,
        ...[
          {
            key: TRIM_DROPDOWN_KEY,
            label: t('Pages.Models.Exploration.accessoriesModelLabel'),
            placeholder: t('Pages.Models.Exploration.accessoriesModelLabel'),
          },
          {
            key: TRANSMISSION_DROPDOWN_KEY,
            label: t('Pages.Models.Exploration.accessoriesTransmissionLabel'),
            placeholder: t('Pages.Models.Exploration.accessoriesTransmissionLabel'),
          },
          {
            key: ACCESSORY_TYPE_DROPDOWN_KEY,
            label: t('Pages.Models.Exploration.accessoriesTypeLabel'),
            placeholder: '',
          },
        ],
      );
      hasAsterisk = true;
      priceDisclaimerPosition = 'top';
      disclaimerMargins = ['24px', '24px', '48px'];
      hasPartNumber = true;
      hasPriceLabel = true;
      hasComingSoon = true;
      hasImageNotFound = true;
      accessoryCardWidth = '280px';
      dropdownDescription = t('Pages.Models.Exploration.accessoriesBlurbText');
      imageNotFoundLabel = t('Pages.Models.Exploration.imageNotAvailableLabel');
      dropdownDescriptionStyles = { maxWidth: '1000px' };
      descriptionCopyOverflowStyles = {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': '3',
        '-webkit-box-orient': 'vertical',
      };
      showOverlay = false;
      showDetailsCard = true;
      sizing = 'compactDescription';
      gtmInteractionType = 'cta: click';
      break;

    // ACURA_SITE_NAME
    case variant1:
      tabTitleFontFamily = 'heading';
      accessoryCardBg = 'white';
      gtmInteractionType = 'accessories - accessory filter';
      break;

    // HONDA_SITE_NAME
    case variant3:
      gtmInteractionType = 'accessories - accessory filter';
      break;
    default:
      break;
  }

  return {
    accessoryFormatter,
    defaultTab,
    defaultTabs,
    descriptionCopyOverflowStyles,
    sizing,
    disclaimerMargins,
    dropdownDescription,
    dropdownDescriptionStyles,
    dropdownKeys,
    dropdownList,
    hasAsterisk,
    hasComingSoon,
    hasImageNotFound,
    hasPartNumber,
    hasPriceLabel,
    isDark,
    optionTrimValuePath,
    priceDisclaimerPosition,
    showAccordion,
    showDetailsCard,
    showOverlay,
    showSlider,
    showTabs,
    transmissionStateKey,
    trimPathKey,
    trimTransmissionPathKey,
    dictionary: {
      buttonLabel,
      comingSoonLabel,
      partNumberLabel,
      priceDisclaimerLabel,
      pspMsrpLabel,
      unableToLoadLabel,
      imageNotFoundLabel,
    },
    styles: {
      accessoryCardBg,
      accessoryCardWidth,
      tabTitleFontFamily,
    },
    gtmInteractionType,
  };
};

const getTrims = models => {
  if (!models) return undefined;
  return flatten(models?.map(model => flatten(model?.trims)));
};

/**
 * Formatter which maps fields for PSP due to structural differences with Autos
 *
 * @param {array} fields - The object containing Accessories component fields
 *  @returns {object} - Returns an updated fields object for use on PSP
 */
/* eslint-disable no-param-reassign */
export const mapPSPFields = fields => {
  if (!fields || isEmpty(fields) || !fields.modelYear) {
    return {};
  }

  fields.modelYear = {
    ...fields?.modelYear,
    fields: {
      ...fields?.modelYear?.fields,
      defaultTrim: { fields: fields?.modelYear?.fields?.models?.[0]?.trims?.[0] },
      trims: getTrims(fields?.modelYear?.fields?.models),
      model: {
        detKey: { value: fields?.modelYear?.fields?.models?.[0]?.detKey?.value },
      },
    },
  };

  return fields;
};
