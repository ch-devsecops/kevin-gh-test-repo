import React from 'react';
import PropTypes from 'prop-types';
import { Box, Link, Optional } from '@honda-canada/design-system-react';
import ContactInfo from './ContactInfo';
import { ITEM_TYPE_CONTACT, ITEM_TYPE_URL } from '../../../utils/constants';
import { getAnchorAttributes, getFooterGtmTags } from '../utils';

import themeStyles from '../Footer.styles';

const LinkContainer = themeStyles.apply(Box, 'LinkContainer');
const StyledLink = themeStyles.apply(Link, 'StyledLink');

const WebLink = ({ linkUrl, displayName }) => {
  const anchorAttributes = getAnchorAttributes(linkUrl);
  const label = linkUrl?.text;
  return (
    <StyledLink {...anchorAttributes} aria-label={label} tabIndex={0} {...getFooterGtmTags(displayName)}>
      {label}
    </StyledLink>
  );
};

const LinkItem = ({ item }) => {
  const linkType = item?.label !== undefined ? ITEM_TYPE_CONTACT : ITEM_TYPE_URL;

  return (
    <LinkContainer>
      <Optional when={linkType === ITEM_TYPE_URL}>
        <WebLink linkUrl={item?.url} displayName={item?.displayName} />
      </Optional>
      <Optional when={linkType === ITEM_TYPE_CONTACT}>
        <ContactInfo item={item} />
      </Optional>
    </LinkContainer>
  );
};

LinkItem.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.shape({
      href: PropTypes.string,
      text: PropTypes.string,
    }),
    label: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

export default LinkItem;
