/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Icon, Image, Link } from '@honda-canada/design-system-react';
import RoutableSitecoreLink from '../RoutableSitecoreLink';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import HoverCardReact from './HoverCard';
import { getGtmTagValue } from '../../utils/gtmEvents';

const HoverCard = ({ fields, rendering }) => {
  if (!fields) return null;

  const {
    title,
    bodyText,
    anchorId,
    desktopImage,
    mobileImage,
    gtmTitle,
    gtmCategory,
    gtmModelName,
    gtmTrimName,
    gtmBodyStyle,
    gtmInteractionType,
    ctaIcon,
    ctaLink,
  } = fields;
  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    title: gtmTitle?.value,
    type: rendering?.componentName,
  };

  const ctaGtmTags = {
    'data-gtm-title': getGtmTagValue(gtmTitle?.value),
    'data-gtm-model': getGtmTagValue(gtmModelName?.value),
    'data-gtm-trim': getGtmTagValue(gtmTrimName?.value),
    'data-gtm-body-style': getGtmTagValue(gtmBodyStyle?.value),
    'data-gtm-interaction-type': getGtmTagValue(gtmInteractionType?.value),
  };

  return (
    <HoverCardReact
      title={title.value}
      bodyText={bodyText.value}
      ctas={[
        <span key="cta">
          <Link
            styling="primary"
            as={RoutableSitecoreLink}
            field={ctaLink} // TODO: will this work in EE?
            gtmTags={ctaGtmTags}
          />
          {ctaIcon && <Icon ml="xs" height="10px" iconColor="primary" name={ctaIcon?.fields?.value?.value} />}
        </span>,
      ]}
      anchorId={anchorId.value}
      gtmTags={gtmTags}
      desktopImage={<Image {...desktopImage.value} />}
      mobileImage={<Image {...mobileImage.value} />}
    />
  );
};

export default HoverCard;
