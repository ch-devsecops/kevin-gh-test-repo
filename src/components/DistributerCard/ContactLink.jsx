import React from 'react';
import { Box, Copy, Link } from '@honda-canada/design-system-react';
import * as PropTypes from 'prop-types';
import { ITEM_TYPE_EMAIL } from '../../utils/constants';
import themeStyles from './DistributerCard.styles';

const StyledCopy = themeStyles.apply(Copy, 'StyledCopy');

const ContactLink = props => {
  const { item, gtmTags, ...rest } = props;
  const isItemNameEmail = item?.name?.toLowerCase() === ITEM_TYPE_EMAIL;
  const label = item?.info.replace(/^https?:\/\//, '');
  const href = isItemNameEmail ? `mailto:${label}?subject=${item?.subject}&body=${item?.body}` : `https://${label}`;

  return (
    <Box display="flex" {...rest} alignItems="baseline">
      <StyledCopy mr="xxs">{item?.name}:</StyledCopy>
      <Link
        textAlign="center"
        color="red"
        disableHover
        href={href}
        target="_blank"
        aria-label={label}
        lineHeight={['sm', 'md']}
        data-gtm-component-type={gtmTags?.componentName}
        data-gtm-title={isItemNameEmail ? gtmTags?.emailTitle : gtmTags?.webTitle}
        data-gtm-interaction-type={isItemNameEmail ? gtmTags?.emailInteractionType : gtmTags?.webInteractionType}
        data-gtm-body-style={gtmTags?.gtmBodyStyle}
        data-gtm-model={gtmTags?.gtmModelName}
        data-gtm-trim={gtmTags?.gtmTrimName}
      >
        {label}
      </Link>
    </Box>
  );
};

ContactLink.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    info: PropTypes.string,
    url: PropTypes.string,
  }),
  gtmTags: PropTypes.shape({
    webInteractionType: PropTypes.string,
    emailInteractionType: PropTypes.string,
    webTitle: PropTypes.string,
    emailTitle: PropTypes.string,
    gtmBodyStyle: PropTypes.string,
    gtmTrimName: PropTypes.string,
    gtmModelName: PropTypes.string,
    componentName: PropTypes.string,
  }),
};

export default ContactLink;
