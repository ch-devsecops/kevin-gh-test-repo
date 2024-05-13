import React from 'react';
import PropTypes from 'prop-types';
import { Box, Icon, Link } from '@honda-canada/design-system-react';
import themeStyles from '../styles/ProductCard.styles';

const CTA = themeStyles.apply(Box, 'CTA');

const ViewProductCTA = ({ onClick, url, gtmTags, viewDetailsButton, isSticky }) => (
  <CTA data-testid="view-details" isSticky={isSticky}>
    <Link onClick={onClick} {...gtmTags} href={url} styling="primary" color="typographyDefault">
      {viewDetailsButton}
      <Icon ml={1} height="10px" name="arrowRight" iconColor="primary" />
    </Link>
  </CTA>
);

ViewProductCTA.defaultProps = {
  isSticky: false,
};

ViewProductCTA.propTypes = {
  onClick: PropTypes.func,
  url: PropTypes.string,
  gtmTags: PropTypes.shape({}),
  viewDetailsButton: PropTypes.string,
  isSticky: PropTypes.bool,
};

export default ViewProductCTA;
