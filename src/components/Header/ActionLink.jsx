import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Copy } from '@honda-canada/design-system-react';
import Link from '../RoutableSitecoreLink';

import { getGtmTagValue } from '../../utils/gtmEvents';

import themeStyles from './Header.styles';

const StyledLink = styled(Link)(themeStyles.get('ActionLink'));
const ActionIcon = themeStyles.apply(Icon, 'ActionIcon');

const ActionLink = ({
  title,
  withIcon,
  gtmTags,
  gtmTitle,
  gtmInteractionType,
  parentDisplayName,
  href,
  linktype,
  ...rest
}) => (
  <StyledLink
    styling="secondary"
    aria-label={title}
    data-gtm-interaction-type={getGtmTagValue(gtmInteractionType)}
    data-gtm-title={getGtmTagValue(gtmTitle)}
    data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
    data-gtm-nav-type="global"
    data-tracking-label={`${parentDisplayName} > ${getGtmTagValue(gtmTitle) || ''}`}
    field={{
      value: {
        linktype,
        href,
        target: '_self',
      },
    }}
    {...rest}
  >
    <Copy as="span" d="inline">
      {title}
    </Copy>
    {withIcon ? <ActionIcon name="arrowRight" /> : null}
  </StyledLink>
);

ActionLink.propTypes = {
  title: PropTypes.string,
  withIcon: PropTypes.bool,
  gtmTitle: PropTypes.string,
  gtmInteractionType: PropTypes.string,
  gtmTags: PropTypes.shape({
    type: PropTypes.string,
  }),
  href: PropTypes.string,
};

export default ActionLink;
