import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Box, Button, Copy, Icon, IconWrapper as DsrIconWrapper, Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';

import themeStyles from '../Footer.styles';

const Container = themeStyles.apply(Box, 'UserLocationContainer');
const LocationWrapper = themeStyles.apply(Box, 'LocationWrapper');
const LocationLabel = themeStyles.apply(Copy, 'LocationLabel');
const Address = themeStyles.apply(Copy, 'Address');
const StyledButton = themeStyles.apply(Button, 'StyledButton');
const ButtonWrapper = themeStyles.apply(Box, 'ButtonWrapper');
const IconWrapper = themeStyles.apply(DsrIconWrapper, 'IconWrapper');

const MapMarkerIcon = ({ testidPrefix }) => (
  <Icon name="mapMarker" iconSize="small" iconColor="black" testId={`${testidPrefix}-dsr-icon-mapMarker`} />
);
const EditIcon = () => (
  <Icon name="edit" mb="1ch" iconColor="black" filled testId="geo-location-change-button-dsr-icon-edit" />
);

const UserLocationSummary = ({
  city,
  postalCode,
  provinceCode,
  onChangeLocationClick,
  hideChangeButton,
  addressSelectedByUser,
}) => {
  const { t } = useTranslation();
  const locationText = t('Shared.UserLocation.locationText');
  const nationalText = t('Shared.UserLocation.nationalText');
  const changeButtonText = t('Shared.UserLocation.changeButton');
  const enterPostalCodeButtonText = t('Shared.UserLocation.enterPostalCodeButton');

  const { sitecoreContext } = useSitecoreContext() || {};
  const requestLocation = sitecoreContext?.route?.fields?.requestLocation;

  useEffect(() => {
    if (requestLocation?.value && !addressSelectedByUser) {
      onChangeLocationClick(true);
    } else {
      onChangeLocationClick(false);
    }
  }, [requestLocation?.value, addressSelectedByUser]);

  const btnLabel = addressSelectedByUser ? changeButtonText : enterPostalCodeButtonText;
  const provinceText = `${city ? `${city}, ` : ''}${provinceCode} ${postalCode || ''}`;

  return (
    <Container>
      <LocationWrapper>
        <IconWrapper size="iconWrapper.xs" at="mobile">
          <MapMarkerIcon testidPrefix="geo-location-label" />
        </IconWrapper>
        <LocationLabel at="desktop" as="span" data-testid="geo-location-label">
          {locationText}:
        </LocationLabel>
      </LocationWrapper>
      <Address as="span" data-testid="geo-location-address">
        {addressSelectedByUser ? provinceText : nationalText}
      </Address>
      <Optional when={!hideChangeButton}>
        <ButtonWrapper>
          <IconWrapper size="iconWrapper.xs" at="desktop">
            {addressSelectedByUser ? <EditIcon /> : <MapMarkerIcon testidPrefix="geo-location-change-button" />}
          </IconWrapper>
          <StyledButton
            style={{ whiteSpace: 'noWrap' }}
            styling="tertiary"
            data-testid="geo-location-change-button"
            onClick={e => {
              e.stopPropagation();
              if (onChangeLocationClick) {
                onChangeLocationClick(true);
              }
            }}
          >
            {btnLabel}
          </StyledButton>
        </ButtonWrapper>
      </Optional>
    </Container>
  );
};

UserLocationSummary.propTypes = {
  city: PropTypes.string,
  postalCode: PropTypes.string,
  provinceCode: PropTypes.string,
  onChangeLocationClick: PropTypes.func,
  hideChangeButton: PropTypes.bool,
};

export default UserLocationSummary;
