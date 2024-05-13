import React from 'react';
import PropTypes from 'prop-types';
import { Box, Media } from '@honda-canada/design-system-react';
import EmbeddedGoogleMap from '../EmbeddedGoogleMap/index';
import ContactDetails from './ContactDetails';
import OperationHours from './OperationHours';
import CardTitle from './CardTitle';
import Address from './Address';
import { Distributor, HOURS_OF_OPERATIONS_ITEMS, CONTACT_INFO_ITEMS } from '../../utils/constants';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { JSSFieldPropType } from '../../utils/propTypes';
import themeStyles from './DistributerCard.styles';

const Container = themeStyles.apply(Box, 'Container');
const Wrapper = themeStyles.apply(Box, 'Wrapper');
const LeftColumn = themeStyles.apply(Box, 'LeftColumn');
const AddressWrapper = themeStyles.apply(Box, 'AddressWrapper');

const DistributorCard = ({ fields, rendering }) => {
  if (!fields) return null;

  const { name, city, province, postalCode, addressLine1, addressLine2, latitude, longitude, items } = fields;
  const contacts = items?.find(contact => contact.displayName === CONTACT_INFO_ITEMS);
  const hours = items?.find(time => time.displayName === HOURS_OF_OPERATIONS_ITEMS);

  const itemsMap = {
    contacts: contacts?.fields?.items?.map(item => ({
      info: item?.fields?.contactInfo?.value,
      url: item?.url,
      name: item?.fields?.contactName?.value,
      id: item?.id,
      body: item?.fields?.body?.value,
      subject: item?.fields?.subject?.value,
    })),
    hours: hours?.fields?.items?.map(item => ({
      day: item?.fields?.weekday?.value,
      hours: item?.fields?.hours?.value,
      id: item?.id,
    })),
  };

  const parsedLongitude = parseFloat(longitude?.value);
  const parsedLatitude = parseFloat(latitude?.value);
  const cityProvincePostalAddress = `${city?.value}, ${province?.value} ${postalCode?.value}`;

  const mapOptions = {
    lat: parsedLatitude || 0,
    lng: parsedLongitude || 0,
    zoom: 13,
  };

  const gtmTags = {
    category: mapGTMCategory(fields?.gtmCategory),
    emailTitle: Distributor?.EmailDistributor?.DATA_GTM_TITLE,
    webTitle: Distributor?.WebDistributor?.DATA_GTM_TITLE,
    gtmBodyStyle: fields?.gtmBodyStyle?.value,
    gtmTrimName: fields?.gtmTrimName?.value,
    gtmModelName: fields?.gtmModelName?.value,
    componentName: rendering?.componentName,
    emailInteractionType: Distributor?.EmailDistributor?.DATA_GTM_INTERACTION_TYPE,
    webInteractionType: Distributor?.WebDistributor?.DATA_GTM_INTERACTION_TYPE,
  };

  return (
    <Wrapper data-gtm-category={gtmTags?.category} data-gtm-component-type={gtmTags?.componentName}>
      <Media lessThan="desktop">
        <CardTitle text={name?.value} />
      </Media>
      <Container>
        <LeftColumn>
          <Media greaterThanOrEqual="desktop">
            <CardTitle text={name?.value} />
          </Media>

          <AddressWrapper>
            <Address
              addressLine1={addressLine1?.value}
              addressLine2={addressLine2?.value}
              cityProvincePostalAddress={cityProvincePostalAddress}
              mb="m"
            />
            <Box flexDirection="column" pr={['s', 's', '52px']}>
              <ContactDetails items={itemsMap?.contacts} gtmTags={gtmTags} mt="m" />
              <OperationHours items={itemsMap?.hours} mt="l" />
            </Box>
          </AddressWrapper>
        </LeftColumn>
        <EmbeddedGoogleMap
          height={['161px', '161px', '411px']}
          options={mapOptions}
          width={['100%', '100%', '600px']}
        />
      </Container>
    </Wrapper>
  );
};

export default DistributorCard;

DistributorCard.propTypes = {
  fields: PropTypes.shape({
    name: JSSFieldPropType,
    addressLine1: JSSFieldPropType,
    addressLine2: JSSFieldPropType,
    city: JSSFieldPropType,
    province: JSSFieldPropType,
    postalCode: JSSFieldPropType,
    latitude: JSSFieldPropType,
    longitude: JSSFieldPropType,
    gtmInteractionType: JSSFieldPropType,
    gtmTitle: JSSFieldPropType,
    gtmBodyStyle: JSSFieldPropType,
    gtmTrimName: JSSFieldPropType,
    gtmModelName: JSSFieldPropType,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        fields: PropTypes.shape({
          items: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string,
              id: PropTypes.string,
              fields: PropTypes.shape({
                contactInfo: JSSFieldPropType,
                contactName: JSSFieldPropType,
                day: JSSFieldPropType,
                hours: JSSFieldPropType,
              }),
            }),
          ),
        }),
      }),
    ),
  }),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};
