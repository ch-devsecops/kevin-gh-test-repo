import { Button, Link } from '@honda-canada/design-system-react';
import { Image, isEditorActive } from '@sitecore-jss/sitecore-jss-react';

import PropTypes from 'prop-types';
import React from 'react';
import RoutableSitecoreLink from '../RoutableSitecoreLink';
import themeStyles from './AppHero.styles';
import { getGtmTagValue } from '../../utils/gtmEvents';

const ImageLink = themeStyles.apply(Link, 'ImageLink');

const AppHeroButtons = ({ buttons, gtmTitle, gtmInteractionType, gtmComponentType }) => {
  if (!buttons) return null;
  const gtmTags = {
    'data-gtm-title': getGtmTagValue(!isEditorActive() && gtmTitle),
    'data-gtm-interaction-type': getGtmTagValue(gtmInteractionType),
    'data-gtm-component-type': getGtmTagValue(gtmComponentType),
  };
  return (
    <>
      {buttons.map((button, index) => {
        if (button.JSSImageField) {
          return (
            <ImageLink
              as={RoutableSitecoreLink}
              aria-label={button.ariaLabel}
              field={button.JSSLinkField}
              key={index.toString()}
              mr={[4, 6, index === buttons.length - 1 ? 0 : 3]}
              height={`${button.JSSImageField.value.height}px`}
              gtmTags={gtmTags}
              {...button.props}
            >
              <Image field={button.JSSImageField} style={{ float: index ? 'left' : 'right' }} />
            </ImageLink>
          );
        }
        return (
          <Button
            as={RoutableSitecoreLink}
            aria-label={button.ariaLabel}
            field={button.JSSLinkField}
            styling={`${button.styling}Dark`}
            key={index.toString()}
            mt={[2, 4, undefined]}
            gtmTags={gtmTags}
            {...button.props}
          />
        );
      })}
    </>
  );
};

AppHeroButtons.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      JSSImage: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
      }),
      JSSField: PropTypes.shape({
        value: PropTypes.string,
      }),
      text: PropTypes.string,
      styling: PropTypes.string,
    }),
  ),
  gtmTitle: PropTypes.string,
  gtmComponentType: PropTypes.string,
  gtmInteractionType: PropTypes.string,
};

export default AppHeroButtons;
