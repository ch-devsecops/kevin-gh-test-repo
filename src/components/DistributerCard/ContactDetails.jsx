import React from 'react';
import * as PropTypes from 'prop-types';
import { Box } from '@honda-canada/design-system-react';
import { ITEM_TYPE_EMAIL, ITEM_TYPE_WEB } from '../../utils/constants';
import ContactLink from './ContactLink';
import ContactNumber from './ContactNumber';

const ContactDetails = ({ items = [], gtmTags, ...rest }) => {
  if (!items.length) return null;

  return (
    <Box {...rest}>
      {items.map(item =>
        item?.name?.toLowerCase() === ITEM_TYPE_WEB || item?.name?.toLowerCase() === ITEM_TYPE_EMAIL ? (
          <ContactLink key={item?.id} item={item} gtmTags={gtmTags} />
        ) : (
          <ContactNumber key={item?.id} item={item} />
        ),
      )}
    </Box>
  );
};

ContactDetails.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
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

export default ContactDetails;
