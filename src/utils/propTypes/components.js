import PropTypes from 'prop-types';

import { PlaceholdersType } from './placeholders';

export const layoutContainerPropTypes = PropTypes.shape({
  params: {
    horizontalMargin: PropTypes.string,
    topMargin: PropTypes.string,
    bottomMargin: PropTypes.string,
    makeFullWidth: PropTypes.string,
    splitOnTablet: PropTypes.string,
    verticalAlignment: PropTypes.string,
  },
  rendering: PropTypes.shape({
    placeholders: PropTypes.shape({
      'column-one': PlaceholdersType,
      'column-two': PlaceholdersType,
      'column-three': PlaceholdersType,
      'column-four': PlaceholdersType,
    }),
  }),
});

export const childrenType = PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired;
