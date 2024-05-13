import React from 'react';
import PropTypes from 'prop-types';
import { Row } from '@honda-canada/design-system-react';

import { ACCESSORIES_WRAPPER_INTERACTION_TYPE, gtmType } from '../service/constants';
import { childrenType } from '../../../utils/propTypes';
import { getGtmTagValue } from '../../../utils/gtmEvents';

import themeStyles from '../Accessories.styles';

const Wrapper = themeStyles.apply(Row, 'CardWrapper');

const CardWrapper = ({ children, tabKey, gtmTags, type, ...styledProps }) => (
  <Wrapper
    type={type}
    data-gtm-interaction-type={ACCESSORIES_WRAPPER_INTERACTION_TYPE}
    data-gtm-title={getGtmTagValue(tabKey)}
    {...gtmTags}
    {...styledProps}
  >
    {children}
  </Wrapper>
);

CardWrapper.propTypes = {
  children: childrenType,
  gtmTags: gtmType,
  tabKey: PropTypes.string,
  type: PropTypes.string,
};

export default CardWrapper;
