import React from 'react';
import { Link as DsrLink } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';

const Link = ({ href, onClick, gtmTags, children, ...rest }) => (
  <DsrLink as="a" disableHover href={href} onClick={onClick} {...gtmTags} {...rest}>
    {children}
  </DsrLink>
);

Link.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  gtmTags: PropTypes.shape({
    'data-gtm-interaction-type': PropTypes.string,
    'data-gtm-component-type': PropTypes.string,
    'data-gtm-body-style': PropTypes.string,
    'data-gtm-model': PropTypes.string,
    title: PropTypes.string,
  }),
  children: PropTypes.shape({}),
  rest: PropTypes.shape({}),
};
export default Link;
