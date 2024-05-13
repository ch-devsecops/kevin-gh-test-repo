import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image } from '@honda-canada/design-system-react';

const Thumbnail = ({ image, ...styleProps }) => {
  const { src, alt } = image;
  return (
    <Box height={['139px', '248px']} {...styleProps}>
      <Image style={{ objectFit: 'contain' }} src={src} alt={alt} />
    </Box>
  );
};

Thumbnail.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
};

export default Thumbnail;
