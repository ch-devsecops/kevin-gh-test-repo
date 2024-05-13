export const apiModes = Object.freeze({
  normal: 'Live',
  preview: 'Preview',
  edit: 'Staging',
});

export const LANGUAGE_EN = 'en';

export const HONDA_THEME_NAME = 'honda';
export const ACURA_THEME_NAME = 'acura';
export const MC_THEME_NAME = 'mc';

export const HONDA_SITE_NAME = 'Honda';
export const ACURA_SITE_NAME = 'Acura';
export const ENGINE_SITE_NAME = 'Engine';
export const MARINE_SITE_NAME = 'Marine';
export const PSP_SITE_NAME = 'PSP';
export const MC_SITE_NAME = 'MC';
export const PE_SITE_NAME = 'PE';
export const MC_PRODUCT_NAME = 'MC';
export const ATV_PRODUCT_NAME = 'ATV';
export const SXS_PRODUCT_NAME = 'SXS';

export const provinceTypes = {
  msrp: 'MSRP Province', // i.e. Ontario
  sellingPriceWithFees: 'Selling Price with fees Province', // i.e. Alberta
  sellingPriceWithoutFees: 'Selling Price without fees Province', // i.e. QC
};

export const LEASE_ANNUAL_KM_ALLOWANCE = 20000;
export const DEFAULT_PROVINCE_CODE = 'ON';

export const EMISSIONS_URL = 'EmissionsLink';
export const BUILD_AND_PRICE_URL = 'BuildAndPrice';
export const BOOK_AN_APPOINTMENT_URL = 'BookAnAppointment';
export const OFFERS_URL = 'Offers';

export const ITEM_TYPE_WEB = 'web';
export const ITEM_TYPE_EMAIL = 'email';
export const ITEM_TYPE_URL = 'URL';
export const ITEM_TYPE_CONTACT = 'CONTACT';

export const HOURS_OF_OPERATIONS_ITEMS = 'HoursOfOperation';
export const CONTACT_INFO_ITEMS = 'ContactInfo';

export const compareProducts = Object.freeze({
  storageKey: 'toCompareProducts',
  limit: 4,
});

export const recentlyViewedProducts = Object.freeze({
  storageKey: 'recentlyViewedProducts',
  limit: 2,
});
export const SIMILAR_PRODUCTS_LIMIT = 2;

export const isCompareDrawerOpen = Object.freeze({ storageKey: 'isDrawerOpen' });

export const DISPLAY_NAME_TOP_NAVIGATION = 'TopNavigation';
export const DISPLAY_NAME_LANGUAGE_MENU = 'LanguageMenu';
export const COMPONENT_NAME_SITE_LOGO = 'SiteLogo';

export const EngineDetails = Object.freeze({
  FindDistributor: {
    DATA_GTM_INTERACTION_TYPE: 'find distributor',
    DATA_GTM_TITLE: 'Find a distributor',
  },
  RemoveComparison: {
    DATA_GTM_INTERACTION_TYPE: 'comparison results',
    DATA_GTM_TITLE: 'item removed',
  },
  AddItem: {
    DATA_GTM_TITLE: 'item added',
  },
});

export const MarineDetails = Object.freeze({
  FindDealer: {
    DATA_GTM_INTERACTION_TYPE: 'find dealer',
    DATA_GTM_TITLE: 'Find a dealer',
  },
  RemoveComparison: {
    DATA_GTM_INTERACTION_TYPE: 'comparison results',
    DATA_GTM_TITLE: 'removed comparison item',
  },
  AddItem: {
    DATA_GTM_TITLE: 'added comparison item',
  },
});

export const EngineSeriesCard = Object.freeze({
  Clicks: {
    DATA_GTM_INTERACTION_TYPE: 'explore',
    DATA_GTM_TITLE: 'view details',
  },
  Compare: {
    DATA_GTM_INTERACTION_TYPE: 'compare item click',
    DATA_GTM_TITLE: 'added comparison item',
  },
});

export const Distributor = Object.freeze({
  EmailDistributor: {
    DATA_GTM_INTERACTION_TYPE: 'email distributor clicks',
    DATA_GTM_TITLE: 'Email a distributor',
  },
  WebDistributor: {
    DATA_GTM_INTERACTION_TYPE: 'distributor exit',
    DATA_GTM_TITLE: 'distributor exit',
  },
  MobileDistributor: {
    DATA_GTM_INTERACTION_TYPE: 'find distributor',
    DATA_GTM_TITLE: 'Find a distributor',
  },
});

export const MODEL_YEAR_API_DEFAULT_VALUE = 9999;

export const CTA_INTERACTION_TYPE_DOWNLOAD = 'cta: download';

/* Product Compare component */
export const PRODUCT_COMPARE_ID_KEY = 'detIdentifier';
export const MAX_COMPARE_ELEMENTS = 4;
export const SPECS_ACCORDION_EMPTY_CONTENT = '•';
export const ENTER_KEY_CODE = 13;
export const DEFAULT_HEADER_HEIGHT = 104;
export const urlProductParamNameMap = new Map();
urlProductParamNameMap.set(PSP_SITE_NAME, 'list');
urlProductParamNameMap.set(ENGINE_SITE_NAME, 'engineList');
urlProductParamNameMap.set(MARINE_SITE_NAME, 'engineList');

export const InventoryAvailabilityStatus = {
  preOrder: 'preOrder',
  inStock: 'inStock',
  onItsWay: 'onItsWay',
};
