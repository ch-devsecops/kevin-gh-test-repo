import getProductLineLetter from '../utils/api/getProductLineLetter';
import {
  ACURA_SITE_NAME,
  HONDA_SITE_NAME,
  LEASE_ANNUAL_KM_ALLOWANCE,
  PSP_SITE_NAME,
  apiModes,
} from '../utils/constants';

/**
 * gets the apiPath for trim paymants based on the appName and VehicleType.
 *
 * @param {string} appName - The siteName.
 * @param {string} pageState - The pageState from sitecore context.
 * @param {string} vehicleType - The vehicleType for the TrimPackages.
 *  @returns {string} - Constructed apiPath for the request.
 */
export const getTrimPaymentApiPath = (appName, pageState, vehicleType) => {
  const productLineLetter = getProductLineLetter.get(appName);
  const financialPathSegment = 'financials-worksheets';
  let apiPath;
  switch (appName) {
    case PSP_SITE_NAME:
      apiPath = `${financialPathSegment}/${productLineLetter[vehicleType]}/${apiModes[pageState]}/website/mcpe-payment-calculator?AcceptLanguage=en`;
      break;
    case ACURA_SITE_NAME:
    case HONDA_SITE_NAME:
    default:
      apiPath = `${financialPathSegment}/${productLineLetter}/${apiModes[pageState]}/website/calculator/payment`;
      break;
  }
  return apiPath;
};

/**
 * gets the apiPath for build and price summary based on the appName
 *
 * @param {string} appName - The siteName.
 * @param {string} pageState - The pageState from sitecore context.
 *  @returns {string} - Constructed apiPath for the request.
 */
export const getBuildPriceApiPath = (appName, pageState) => {
  const productLineLetter = getProductLineLetter.get(appName);
  const financialPathSegment = 'financials-worksheets';
  const buildandpricePathSegment = 'buildandprice/calculator/summary';
  let apiPath;
  switch (appName) {
    case ACURA_SITE_NAME:
    case HONDA_SITE_NAME:
    default:
      apiPath = `${financialPathSegment}/${productLineLetter}/${apiModes[pageState]}/${buildandpricePathSegment}`;
      break;
  }
  return apiPath;
};

/**
 * gets the request object body for payment api based on the appName.
 *
 * @param {string} appName - The siteName.
 * @param {string} provinceCode - The selected province code of the user.
 * @param {string} defaultProvince - The default province code from sitecore context.
 * @param {Object} trim- The selected trim.
 * @param {Object} paymentOptions - The payment options payload.
 * @returns {Object} - The request object body.
 */
export const getTrimPaymentRequestObject = ({
  appName,
  provinceCode,
  defaultProvince,
  trim,
  paymentOptions,
  isSellingPriceProvince,
  includeFees = false,
}) => {
  const { exteriorColorKey, interiorColorKey, trimKey, modelKey, modelYear, transmissionKey } = trim || {};
  const { paymentFrequency, paymentMethod } = paymentOptions || {};
  const clientRequestId = '12345-67890-12345';
  let requestObject = {};
  const commonProperties = {
    accessories: [],
    exteriorColorKey,
    modelKey,
    modelYear,
    trimKey,
    transmissionKey,
  };

  switch (appName) {
    case PSP_SITE_NAME:
      requestObject = {
        financeDownPayment: 0,
        financeTerm: 60,
        includeFees,
        leaseAdditionalAnnualKm: 0,
        leaseAnnualKmAllowance: 0,
        leaseDownPayment: 0,
        leaseTerm: 0,
        locale: 'en',
        offerKey: null,
        overriddenIsSellingProvince: isSellingPriceProvince,
        paymentType: paymentFrequency,
        province: provinceCode || defaultProvince,
        useHighestTerm: true,
        warrantyKey: '',
        ...commonProperties,
      };
      break;
    case ACURA_SITE_NAME:
    case HONDA_SITE_NAME:
    default:
      requestObject = {
        interiorColorKey,
        provinceKey: provinceCode || defaultProvince,
        warrantyAmount: 0,
        paymentOptions: [
          {
            clientRequestId,
            downPaymentAmount: 0,
            includeFees,
            leaseAdditionalAnnualKm: 0,
            leaseAnnualKmAllowance: LEASE_ANNUAL_KM_ALLOWANCE,
            overriddenIsSellingProvince: isSellingPriceProvince,
            paymentFrequency,
            paymentMethod,
            preferredPaymentAmount: 0,
            term: null,
            tradeInOwingAmount: 0,
            tradeinValueAmount: 0,
          },
        ],
        ...commonProperties,
      };
      break;
  }
  return requestObject;
};

/**
 * gets the required response property for payment api based on the appName.
 *
 * @param {string} appName - The siteName.
 * @param {Object} response - The response data from api request.
 * @returns {Object} - The mapped request response.
 */
export const getTrimPaymentResponseObject = (appName, response) => {
  let responseObject = {};
  switch (appName) {
    case PSP_SITE_NAME:
      responseObject = response?.finance?.weekly;
      responseObject.msrp = response.msrp;
      break;
    case ACURA_SITE_NAME:
    case HONDA_SITE_NAME:
    default:
      responseObject = response?.paymentOptions?.[0];
      break;
  }
  return responseObject;
};

/**
 * gets the required response property for payment summary api based on the appName.
 *
 * @param {string} appName - The siteName.
 * @param {Object} response - The response data from api request.
 * @returns {Object} - The mapped request response.
 */
export const getTrimSummaryResponseObject = (appName, response) => {
  let responseObject = {};
  switch (appName) {
    case PSP_SITE_NAME:
      return response;
    case ACURA_SITE_NAME:
    case HONDA_SITE_NAME:
    default:
      responseObject = response?.summaries?.[0];
      break;
  }
  return responseObject;
};
