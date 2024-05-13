import React from 'react';
import { Box, Copy } from '@honda-canada/design-system-react';
import NotImplemented from '../NotImplemented';
import useInventoryEffect from './useInventoryEffect';
import useFetchInventoryStatus from './useFetchInventoryStatus';
import { useAppName } from '../../utils/sitecoreContext';
import { ACURA_SITE_NAME, HONDA_SITE_NAME } from '../../utils/constants';
import type { LocalInventoryStatusProps, DealerInventory } from './types';

const MOCK_DEALER = 2345;

const LocalInventoryStatus = ({ params, rendering }: LocalInventoryStatusProps) => {
  const appName = useAppName();

  useInventoryEffect(params);

  const result = useFetchInventoryStatus({
    dealer: MOCK_DEALER,
    status: '',
  });

  const inventoryStatus: DealerInventory[] = result?.data;

  switch (appName) {
    case HONDA_SITE_NAME:
      break;
    case ACURA_SITE_NAME:
      break;
    default:
      return <NotImplemented name="Inventory Status" />;
  }

  return (
    <Box data-component-name={rendering?.componentName} marginTop="m">
      <h6>Inventory Status</h6>
      {inventoryStatus?.map(status =>
        status?.inventory?.map(item => (
          <Copy key={item?.modelCode} fontFamily="bold">
            {item?.availableStatus}
          </Copy>
        )),
      )}
    </Box>
  );
};

export default LocalInventoryStatus;
