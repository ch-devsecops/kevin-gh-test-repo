import { apiModes } from '../../utils/constants';
import getProductLineLetter from '../../utils/api/getProductLineLetter';

/**
 * gets the apiPath for Finacial provider based on the appName and VehicleType.
 *
 * @param {string} appName - The siteName.
 * @param {string} pageState - The pageState from sitecorecontext.
 * @param {string} vehicleType - The vehicleType from sitecore.
 *  @returns {string} - Constructed apiPath for the request.
 */
const getFinancialsApiPath = (appName, pageState, vehicleType) => {
  const productLineLetter = getProductLineLetter.get(appName);
  const financialPathSegment = 'financials-worksheets';
  const websiteAndPricePathSegment = 'website/price-calculator';
  const apiPath = `${financialPathSegment}/${!vehicleType ? productLineLetter : productLineLetter[vehicleType]}/${
    apiModes[pageState]
  }/${websiteAndPricePathSegment}`;

  return apiPath;
};

export default getFinancialsApiPath;
