import { createQueryParam, getTransmissionKeyFromDefaultTransmission } from '../../utils/urls';

export const variant1 = 'variant1';
export const variant2 = 'variant2';

export const useConfiguration = variant => {
  let badgeSize;
  let zIndexWorkaroundClassName;
  let zIndexStringValue = 'modal';

  switch (variant) {
    case variant1:
      badgeSize = ['69px', '160px', '160px'];
      zIndexWorkaroundClassName = 'psp-z-index-workaround';
      zIndexStringValue = 'subNavigationBar';
      break;
    case variant2:
    default:
      badgeSize = '160px';
      zIndexWorkaroundClassName = 'acura-z-index-workaround honda-z-index-workaround';
      break;
  }
  return {
    badgeSize,
    zIndexWorkaroundClassName,
    zIndexStringValue,
  };
};

/**
 * Returns the URL for price and finance deeplinking for psp and build and price for auto.
 *
 * @variant {string} key - The app name
 * @baseUrl {string} The shared base url for auto in shared apps.
 * @params {string} The bapUrlparams
 * @urlTranslation {string} the price and finance url from sitecore dictionary
 * @vehicleType {string} the vehicle type on PSP
 * @category {string} the category of the selected trim
 * @model {string} the model of the selected trim
 */
export const getBapUrlParams = (variant, baseUrl, params, urlTranslation, vehicleType, category, selectedTrim) => {
  let bapUrlParams = `${baseUrl}${params}`;
  const urlParams = new URLSearchParams(bapUrlParams);
  const paramsObj = Object.fromEntries(urlParams);
  const categoryQueryParam = createQueryParam('category', category);
  const hideTrimAndModel = selectedTrim?.hidePriceAndFinance;

  const trimQueryParam = !hideTrimAndModel
    ? createQueryParam('trim', getTransmissionKeyFromDefaultTransmission(paramsObj?.transmission_key))
    : '';
  const yearQueryParam = createQueryParam('year', paramsObj?.model_year);
  const colorQueryParam = !hideTrimAndModel ? createQueryParam('color', paramsObj?.color_key) : '';
  const modelQueryParam = !hideTrimAndModel ? createQueryParam('model', selectedTrim?.detIdentifier) : '';

  switch (variant) {
    case variant1:
      bapUrlParams = `${urlTranslation}?vehicleType=${vehicleType}${categoryQueryParam}${yearQueryParam}${modelQueryParam}${trimQueryParam}${colorQueryParam}`;
      break;

    default:
      break;
  }
  return bapUrlParams;
};
