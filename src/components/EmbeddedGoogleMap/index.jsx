import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Box } from '@honda-canada/design-system-react';
import { UserLocationContext } from '@honda-canada/user-location';
import isSSR from '../../utils/isSSR';
import themeStyles from './EmbeddedGoogleMap.styles';
import applyAODAHtmlStyleFix from './utils';

const Container = themeStyles.apply(Box, 'Container');

const EmbeddedGoogleMap = ({ options, height, width, ...rest }) => {
  const { isGoogleMapsLibraryLoaded: isMapLoaded, error } = useContext(UserLocationContext) || {};

  if (isSSR()) return null;

  const { lat, lng, zoom } = options;
  const center = { lat, lng };
  const mapContainerStyle = { width, height: '100%' };

  // adds title and removes inline styling on iframes for aoda purposes
  const iframesArray = document.querySelectorAll('.gm-style iframe');

  // prevents function from triggering when array is null
  if (isMapLoaded && iframesArray.length) {
    applyAODAHtmlStyleFix(iframesArray, 'Google Map');
  }

  return (
    <Container width={width} height={height} {...rest}>
      {isMapLoaded && !error ? (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom}>
          <Marker position={center} />
        </GoogleMap>
      ) : (
        // resolves duplicate loading ids
        <Box bg="grey.0" width={width} height={height} {...rest} className="loading" data-testid="loading" />
      )}
    </Container>
  );
};

export default memo(EmbeddedGoogleMap);

EmbeddedGoogleMap.defaultProps = {
  options: {
    lat: 43.65107,
    lng: -79.347015,
    zoom: 10,
  },
  height: '400px',
  width: '400px',
};

EmbeddedGoogleMap.propTypes = {
  options: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    zoom: PropTypes.number,
  }),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};
