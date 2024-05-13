import React from 'react';
import { LegacyFooterUserLocationSummary } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { UserLocationContext } from '@honda-canada/user-location';

const UserLocationSummary = props => {
  const { t } = useTranslation();

  return (
    <UserLocationContext.Consumer>
      {userLocation => (
        <LegacyFooterUserLocationSummary
          locationText={t('Shared.UserLocation.locationText')}
          nationalText={t('Shared.UserLocation.nationalText')}
          changeButtonText={t('Shared.UserLocation.changeButton')}
          enterPostalCodeButtonText={t('Shared.UserLocation.enterPostalCodeButton')}
          {...userLocation}
          {...props}
        />
      )}
    </UserLocationContext.Consumer>
  );
};

export default UserLocationSummary;
