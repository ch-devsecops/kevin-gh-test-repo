import React, { useContext, useState } from 'react';
import { UserLocationContext } from '@honda-canada/user-location';
import { Box } from '@honda-canada/design-system-react';

import UserLocationModal from '../../UserLocationModal/UserLocationModal';
import UserLocationSummary from './UserLocationSummary';
import isSSR from '../../../utils/isSSR';
import themeStyles from '../Footer.styles';

const Container = themeStyles.apply(Box, 'GeoLocatorContainer');

const GeoLocator = () => {
  const [isUserLocationModalOpen, setIsUserLocationModalOpen] = useState(false);
  const userLocation = useContext(UserLocationContext);

  if (isSSR()) return null;

  return (
    // DO NOT REMOVE empty Fragment. It is required to fix breaking UI bug in jss app
    <div>
      <Container>
        <UserLocationSummary onChangeLocationClick={value => setIsUserLocationModalOpen(value)} {...userLocation} />
        <UserLocationModal
          allowClose
          isOpen={isUserLocationModalOpen}
          setIsUserLocationModalOpen={setIsUserLocationModalOpen}
          onLocationDetected={() => setIsUserLocationModalOpen(false)}
        />
      </Container>
    </div>
  );
};

export default GeoLocator;
