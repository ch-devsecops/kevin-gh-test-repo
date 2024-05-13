import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@honda-canada/design-system-react';

const CoverImage = ({ image }) => <Image src={image?.src} alt={image?.alt} style={{ maxHeight: '180px' }} />;

CoverImage.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  }),
};

export default CoverImage;
