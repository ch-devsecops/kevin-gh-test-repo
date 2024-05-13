import React from 'react';
import { Media, Box, Copy } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import themeStyles from './AvailableVehicles.styles';
import mockData from './mockData.json';
import DesktopCardLayout from './DesktopCardLayout';
import MobileCardLayout from './MobileCardLayout';
import { getDealerInfo } from '../../core/reducers/inventoryDealerDetails';
import useFetchInventoryStatus from '../LocalInventoryStatus/useFetchInventoryStatus';

const AvailableVehiclesContainer = themeStyles.apply(Box, 'AvailableVehiclesContainer');
const DealerName = themeStyles.apply(Copy, 'DealerName');
const CardsContainer = themeStyles.apply(Box, 'CardsContainer');
const StyledMedia = themeStyles.apply(Media, 'StyledMedia');

const AvailableVehicles = ({ rendering }) => {
  const { t } = useTranslation();
  const { dealerName = 'Honda Downtown', dealerCode = '' } = useSelector(getDealerInfo);
  const gtmBodyStyle = rendering?.fields?.data?.value?.gtmBodyStyle?.value;

  const result = useFetchInventoryStatus({
    dealer: dealerCode,
    status: '',
  });

  const inventoryStatus = result?.data;
  const inventoryAvailabilityStatus = inventoryStatus ? inventoryStatus[0]?.inventory[0]?.availableStatus : 'preOrder';

  const modelYear = mockData?.fields?.data?.value?.catalog?.fields?.models?.[0]?.items?.[0]?.modelYears?.[0]?.name;
  const availableVehiclesList =
    mockData?.fields?.data?.value?.catalog?.fields?.models?.[0]?.items?.[0]?.modelYears?.[0]?.trims;
  const firstFourVehicles = availableVehiclesList?.slice(0, 4);

  return (
    <AvailableVehiclesContainer>
      <DealerName size="small" data-testid="cy-selected-dealerName">{`${t('Available at')} ${dealerName}`}</DealerName>
      <CardsContainer data-testid="cy-available-vehicles-cards">
        {firstFourVehicles?.length && (
          <>
            <StyledMedia greaterThanOrEqual="desktop">
              {firstFourVehicles?.map(vehicle => (
                <DesktopCardLayout
                  key={vehicle?.name}
                  vehicle={vehicle}
                  dealerName={dealerName}
                  modelYear={modelYear}
                  bodyStyle={gtmBodyStyle}
                  inventoryAvailabilityStatus={inventoryAvailabilityStatus}
                />
              ))}
            </StyledMedia>
            <StyledMedia lessThan="desktop">
              {firstFourVehicles?.map(vehicle => (
                <MobileCardLayout
                  key={vehicle?.name}
                  vehicle={vehicle}
                  dealerName={dealerName}
                  modelYear={modelYear}
                  bodyStyle={gtmBodyStyle}
                  inventoryAvailabilityStatus={inventoryAvailabilityStatus}
                />
              ))}
            </StyledMedia>
          </>
        )}
      </CardsContainer>
    </AvailableVehiclesContainer>
  );
};

export default AvailableVehicles;
