import PropTypes from 'prop-types';

import { PlainUrl } from './plain';

export const CTALinkPropType = PropTypes.shape({
  value: PropTypes.shape(PlainUrl),
});

export const SimpleValueObjectPropType = PropTypes.shape({
  value: PropTypes.string,
});

export const VideoUrlPropType = PropTypes.shape({
  value: PropTypes.shape({
    href: PropTypes.string,
  }),
});

export const ImageValuePropType = PropTypes.shape({
  value: {
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  },
});

export const JSSFieldPropType = PropTypes.shape({
  value: PropTypes.string,
});

export const FieldsItemsType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string,
    displayName: PropTypes.string,
    fields: PropTypes.shape({}),
  }),
);
