import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@honda-canada/design-system-react';
import { JSSFieldPropType } from '../../utils/propTypes';
import IconCardReact from './IconCard';
import { mapGTMCategory, mapJssFieldsToCtaComponents } from '../../utils/sitecoreFields';

const IconCard = ({ fields, params, rendering }) => {
  if (!fields) {
    return null;
  }

  const { gtmTitle, gtmCategory, title, bodyText, icon } = fields;

  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    title: gtmTitle?.value,
    type: rendering?.componentName,
  };
  const ctas = mapJssFieldsToCtaComponents(fields, gtmTitle?.value, rendering?.componentName);

  return (
    <IconCardReact
      title={title?.value}
      bodyText={bodyText?.value}
      gtmTags={gtmTags}
      backgroundColor={params?.contentBgColour === 'Grey' ? 'grey.5' : 'white'}
      hasDivider={params?.hasDivider === 1}
      icon={icon.value.src && <Image {...icon.value} />}
      ctas={ctas}
    />
  );
};

IconCard.propTypes = {
  fields: PropTypes.shape({
    title: JSSFieldPropType,
    bodyText: JSSFieldPropType,
    gtmTitle: JSSFieldPropType,
    gtmCategory: JSSFieldPropType,
    icon: PropTypes.shape({
      value: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
      }),
    }),
  }),
  params: PropTypes.shape({
    contentBgColour: PropTypes.string,
    hasDivider: PropTypes.number,
  }),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};

export default IconCard;
