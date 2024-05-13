import PropTypes from 'prop-types';

export const PlainPlaceholder = {
  componentName: PropTypes.string,
  dataSource: PropTypes.string,
  fields: PropTypes.shape({}),
  params: PropTypes.shape({}),
  placeholders: PropTypes.shape({}),
};

export const PlainItem = {
  itemId: PropTypes.string,
  itemUrl: PropTypes.string,
  itemName: PropTypes.string,
  itemDisplayName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

export const PlainUrl = {
  href: PropTypes.string,
  text: PropTypes.string,
  linktype: PropTypes.string,
  url: PropTypes.string,
  anchor: PropTypes.string,
  target: PropTypes.string,
};
export const PlainUrlType = PropTypes.shape(PlainUrl);

export const PlainImage = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
export const PlainImageType = PropTypes.shape(PlainImage);

export const PlainIcon = { ...PlainItem, value: PropTypes.string };
export const PlainIconType = PropTypes.oneOfType([PropTypes.string, PropTypes.shape(PlainIcon)]);

export const ObjectItem = {
  ...PlainItem,
  icon: PlainIconType,
  image: PlainImageType,
  alignment: PropTypes.string,
  label: PropTypes.string,
  url: PlainUrlType,
  ctaLink: PlainUrlType,
  ctaType: PropTypes.string,
  ctaIcon: PlainIconType,
  ctaImage: PlainImageType,
  gtmInteractionType: PropTypes.string,
  gtmModelName: PropTypes.string,
  gtmTrimName: PropTypes.string,
  gtmBodyStyle: PropTypes.string,
};
