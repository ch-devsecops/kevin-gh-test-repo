import React from 'react';
import { useMediaQueries, Optional } from '@honda-canada/design-system-react';

import TrimFeaturesProvider from '../../TrimFeaturesProvider';
import DesktopTrimFeatures from './DesktopTrimFeatures';
import MobileTrimFeatures from './MobileTrimFeatures';

const FeaturesTab = ({ trims, selectTrim, closeModal }) => {
  const trimIds = trims.map(trim => trim.detIdentifier);
  // CompareTrimsHeader uses useMediaQueries instead of Media, so we follow suit
  const { isMobile } = useMediaQueries();
  return (
    <TrimFeaturesProvider trims={trimIds}>
      {({ features }) => (
        <Optional when={features}>
          {isMobile ? (
            <MobileTrimFeatures trims={trims} selectTrim={selectTrim} closeModal={closeModal} features={features} />
          ) : (
            <DesktopTrimFeatures trims={trims} selectTrim={selectTrim} closeModal={closeModal} features={features} />
          )}
        </Optional>
      )}
    </TrimFeaturesProvider>
  );
};

export default FeaturesTab;
