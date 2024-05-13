import PropTypes from 'prop-types';

export const variant1 = 'variant1';
export const variant2 = 'variant2';
export const variant3 = 'variant3';

export const ACCESSORY_TYPE_LABEL_ALL = 'all';
export const ALL_TAB = 'all';
export const INTERIOR_TAB = 'interior';
export const EXTERIOR_TAB = 'exterior';
export const PACKAGES_TAB = 'packages';
export const TRIM_DROPDOWN_KEY = 'trim';
export const TRANSMISSION_DROPDOWN_KEY = 'transmission';
export const ACCESSORY_TYPE_DROPDOWN_KEY = 'accessoryType';
export const ACCESSORIES_WRAPPER_INTERACTION_TYPE = 'accessories - accessory filter';
export const ACCESSORIES_CARD_INTERACTION_TYPE = 'accessory details';

export const gtmType = PropTypes.shape({
  'data-gtm-model': PropTypes.string,
  'data-gtm-trim': PropTypes.string,
  'data-gtm-body-style': PropTypes.string,
});
