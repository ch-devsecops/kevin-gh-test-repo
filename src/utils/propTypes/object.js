import PropTypes from 'prop-types';

import { ObjectItem } from './plain';

export const PropItemType = PropTypes.shape(ObjectItem);

export const PropItemsType = PropTypes.arrayOf(PropItemType);
