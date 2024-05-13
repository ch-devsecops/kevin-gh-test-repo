import React, { useContext } from 'react';
import { UserLocationEntryModal } from '@honda-canada/design-system-react';
import { UserLocationContext } from '@honda-canada/user-location';
import { compiler } from 'markdown-to-jsx';
import styled from 'styled-components';
import css from '@styled-system/css';
import { useTranslation } from 'react-i18next';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

const BodyText = styled('span')(
  css({
    a: {
      color: 'primary',
      textDecoration: 'none',
      fontFamily: 'bold',
    },
  }),
);

const UserLocationModal = ({ onLocationDetected, setIsUserLocationModalOpen, ...rest }) => {
  const { t } = useTranslation();
  const {
    detectUserLocationFromBrowser,
    getAutocompletePredictions,
    isFetchingUserLocation,
    establishUserLocationFromAutocompleteSearch,
  } = useContext(UserLocationContext);
  const { sitecoreContext: { pageEditing, settings } = {} } = useSitecoreContext() || {};
  const userLocation = useContext(UserLocationContext);
  const defaultProvince = settings?.defaultProvince;
  const handleOnClose = () => {
    if (!userLocation?.addressSelectedByUser) {
      if (!userLocation?.provinceCode || userLocation?.provinceCode !== defaultProvince) {
        userLocation?.setLocation({ province: { abbreviation: defaultProvince } });
      }
    }
    setIsUserLocationModalOpen(false);
  };

  if (pageEditing) return null;

  return (
    <UserLocationEntryModal
      ariaLabel={t('Shared.UserLocation.modalHeading')}
      closeButtonAriaLabel={t('Shared.UserLocation.modalCloseButtonAria')}
      titleText={t('Shared.UserLocation.modalHeading')}
      bodyText={<BodyText>{compiler(t('Shared.UserLocation.modalBodyText'))}</BodyText>}
      enterLocationLabel={t('Shared.UserLocation.modalEnterLocationLabel')}
      enterLocationAriaLabel={t('Shared.UserLocation.modalEnterLocationLabel')}
      submitButtonText={t('Shared.UserLocation.modalSubmitButton')}
      useMyLocationText={t('Shared.UserLocation.modalUseMyLocationButton')}
      inputPlaceholderText={t('Shared.UserLocation.modalInputPlaceholder')}
      isFetchingUserLocation={isFetchingUserLocation}
      getAutocompletePredictions={getAutocompletePredictions}
      onDetectLocation={async () => {
        await detectUserLocationFromBrowser(onLocationDetected);
      }}
      onSubmitLocation={locationSearchValue => {
        establishUserLocationFromAutocompleteSearch(locationSearchValue, onLocationDetected);
      }}
      onClosed={handleOnClose}
      {...rest}
    />
  );
};

export default UserLocationModal;
