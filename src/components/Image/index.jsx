import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image as DesignSystemImage, Media, Optional } from '@honda-canada/design-system-react';
import themeStyles from './styles';

const Container = themeStyles.apply(Box, 'Container');

const Image = ({ fields, params = {} }) => {
  if (!fields) {
    return null;
  }

  const { contentAlignment } = params;

  const { desktopImage, mobileImage } = fields;
  const desktopImageParams = {
    src: desktopImage?.value?.src,
    alt: desktopImage?.value?.alt,
    width: `${desktopImage?.value?.width}px`,
  };
  const mobileImageParams = {
    src: mobileImage?.value?.src,
    alt: mobileImage?.value?.alt,
    width: `${mobileImage?.value?.width}px`,
  };

  if (!desktopImageParams.src && !mobileImageParams.src) {
    return null;
  }

  return (
    <Container contentAlignment={contentAlignment}>
      <Optional when={desktopImageParams.src}>
        <Media greaterThanOrEqual="desktop">
          <DesignSystemImage {...desktopImageParams} style={{ objectFit: 'contain', maxWidth: '100%' }} />
        </Media>
      </Optional>

      <Optional when={mobileImageParams.src}>
        <Media lessThan="desktop">
          <DesignSystemImage {...mobileImageParams} style={{ objectFit: 'contain', maxWidth: '100%' }} />
        </Media>
      </Optional>
    </Container>
  );
};

Image.propTypes = {
  params: PropTypes.shape({ contentAlignment: PropTypes.string }),
  fields: PropTypes.shape({
    desktopImage: PropTypes.shape({
      value: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
      }),
    }),
    mobileImage: PropTypes.shape({
      value: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string,
      }),
    }),
  }),
};

export default Image;
