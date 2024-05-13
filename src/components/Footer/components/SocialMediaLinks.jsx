import React from 'react';
import PropTypes from 'prop-types';
import { Box, Link } from '@honda-canada/design-system-react';

import { wrapJSSFields } from '../../../utils/wrapJSSFields';

import themeStyles from '../Footer.styles';
import { getFooterGtmTags } from '../utils';

const SocialMediaContainer = themeStyles.apply(Box, 'SocialMediaContainer');
const SocialLink = themeStyles.apply(Link, 'SocialLink');

const SocialMediaLinks = ({ data }) => {
  const items = data?.fields?.items;

  return (
    <SocialMediaContainer>
      {items?.map(item => {
        const fields = wrapJSSFields(item?.fields);
        return (
          <SocialLink key={item?.id} {...fields?.url?.value} tabIndex={0} {...getFooterGtmTags(item?.displayName)}>
            <img {...fields?.logo?.value} alt={item?.displayName} />
          </SocialLink>
        );
      })}
    </SocialMediaContainer>
  );
};

SocialMediaLinks.propTypes = {
  data: PropTypes.shape({
    fields: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

export default SocialMediaLinks;
