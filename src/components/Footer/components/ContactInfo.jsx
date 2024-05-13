import React from 'react';
import { compiler } from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import { Box, Copy, Link } from '@honda-canada/design-system-react';
import themeStyles from '../Footer.styles';
import { stripMarkdownHeading } from '../../../utils/markdown';
import { getAnchorAttributes, getFooterGtmTags } from '../utils';

const ContactLinkWrapper = themeStyles.apply(Link, 'ContactLink');
const StyledCopy = themeStyles.apply(Copy, 'StyledCopy');

const ContactLink = ({ linkItem }) => {
  let label;
  let url;

  if (linkItem?.contactInformation) {
    label = compiler(stripMarkdownHeading(linkItem?.contactInformation));
    url = `tel:${linkItem?.contactInformation}`;
    return (
      <ContactLinkWrapper
        color="primary"
        href={url}
        aria-label={linkItem?.url?.title}
        tabIndex={0}
        {...getFooterGtmTags(linkItem?.displayName)}
      >
        {label}
      </ContactLinkWrapper>
    );
  }

  const anchorAttributes = getAnchorAttributes(linkItem?.url, linkItem?.subject, linkItem?.body);
  label = compiler(stripMarkdownHeading(linkItem?.url?.text));
  return (
    <ContactLinkWrapper
      {...anchorAttributes}
      color="primary"
      aria-label={linkItem?.url?.title}
      tabIndex={0}
      {...getFooterGtmTags(linkItem?.displayName)}
    >
      {label}
    </ContactLinkWrapper>
  );
};

const ContactInfo = ({ item }) => (
  <Box>
    <StyledCopy color="typographyDefault" aria-label={item?.label}>
      {compiler(stripMarkdownHeading(item?.label))}
    </StyledCopy>
    <ContactLink linkItem={item} />
  </Box>
);

ContactInfo.propTypes = {
  item: PropTypes.shape({
    contactInformation: PropTypes.string,
  }),
};

export default ContactInfo;
