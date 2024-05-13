import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Image } from '@honda-canada/design-system-react';
import ImageNotFound from '../ImageNotFound';
import Context from '../service/Context';

const AccessoryCardImage = ({ accessory, Component = Image, ...stylesProps }) => {
  const [imageError, setImageError] = useState(false);

  const { hasImageNotFound, dictionary } = useContext(Context);

  const handleImageError = () => {
    setImageError(true);
  };
  return imageError && hasImageNotFound ? (
    <ImageNotFound data-testid="cy-no-image" altTextContent={dictionary.imageNotFoundLabel} accessoryModal />
  ) : (
    <Component
      src={accessory?.thumbnailAssetUrl || accessory?.defaultThumbnailAssetUrl}
      alt={accessory?.accessoryName}
      data-testid="cy-accessory-card-image"
      onError={handleImageError}
      {...stylesProps}
    />
  );
};

AccessoryCardImage.propTypes = {
  accessory: PropTypes.shape({
    thumbnailAssetUrl: PropTypes.string,
    defaultThumbnailAssetUrl: PropTypes.string,
    accessoryName: PropTypes.string,
  }),
  accessoryModal: PropTypes.bool,
};

export default AccessoryCardImage;
