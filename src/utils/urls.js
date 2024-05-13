// Some color and interior keys have invalid URL characters, so we replace them with encoded values
// encodeURIComponent doesn't help, so we sanitize manually
export const sanitizeColorKey = key => key.replace('#', '%23').replace('^', '%5E').replace('%', '%25');

export const getBapQueryStringVariables = (
  modelKey,
  modelYear,
  trimKey,
  transmissionKey,
  exteriorColorKey = '',
  interiorColorKey = '',
) => {
  let query;
  let hash = '#models';
  if (modelKey && modelYear) {
    query = `model_key=${modelKey}&model_year=${modelYear}`;
    hash = '#trims';

    if (trimKey) {
      query = `${query}&trim_key=${trimKey}`;
      hash = '#colours';
    }

    if (transmissionKey) {
      query = `${query}&transmission_key=${transmissionKey}`;
    }

    if (exteriorColorKey) {
      query = `${query}&color_key=${sanitizeColorKey(exteriorColorKey)}`;
    }

    if (interiorColorKey) {
      query = `${query}&interior_key=${sanitizeColorKey(interiorColorKey)}&accessory_keys=`;
    }
    query = `${query}${hash}`;
  }

  return query ? `?${query}` : '';
};

export const getTestDriveStringVariables = (modelKey, modelYear, trimKey) => {
  let query;
  if (modelKey && modelYear) {
    query = `model=${modelKey}&modelYear=${modelYear}`;

    if (trimKey) {
      query = `${query}&trimKey=${trimKey}`;
    }
  }

  return query ? `?${query}&providerService=BookATestDrive` : '?providerService=BookATestDrive';
};

export const getOffersStringVariables = (modelKey, modelYear) => {
  let query;
  if (modelKey && modelYear) {
    query = `?model_key=${modelKey}&model_year=${modelYear}`;
  }

  return query;
};

export const getModelComparePath = (specsPath, detIdentifier, language) => {
  let path = specsPath;
  if (detIdentifier) {
    path = `${path}?${language === 'fr' ? 'comparer' : 'compare'}=${detIdentifier}`;
  }
  return `${path}`;
};

/**
 * Returns the URL for retrieving trim details based on the provided key.
 *
 * @param {string} key - The key used to identify the trim.
 * @returns {string} The URL for retrieving trim details.
 */
export const getTrimsDetailsUrl = (key, baseURLParam) => `${baseURLParam}?trim=${key}`;

/**
 * Parse url to get current selected link
 * @param {string} url - The url to parse
 * @returns {boolean}
 * @example
 */
export const getCurrentSelectedLink = url => {
  const currentUrl = window.location.href;
  return currentUrl.includes(url);
};

/**
 * Creates a query param when value is available
 * @key {string} key - the query param
 * @value {string} value - the value for the param
 * @returns {string}
 */
export const createQueryParam = (key, value) => {
  if (value) {
    const sanitizedValue = value.split('#')[0].replace(/ /g, '+');
    return `&${key}=${sanitizedValue}`;
  }
  return '';
};

/**
 * returns the value of the transmission key it is the default transmission separated with hyphen
 * @value {string} key - the default transmision key eg (11715-Default)
 * @returns {string}
 */
export const getTransmissionKeyFromDefaultTransmission = value => value?.split('-')?.[0];
