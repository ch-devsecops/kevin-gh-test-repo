import PropTypes from 'prop-types';

import { PlainPlaceholder } from './plain';

export const PlaceholderType = PropTypes.shape(PlainPlaceholder);

export const PlaceholdersType = PropTypes.arrayOf(PlaceholderType);
