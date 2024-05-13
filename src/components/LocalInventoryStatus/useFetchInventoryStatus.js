import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTrimInfo } from '../../core/reducers/inventoryVehicleDetails';
import { useGetModelInventoryStatus } from '../../core/api/inventoryApi';

const useFetchInventoryStatus = ({ dealer, status }) => {
  const { trim } = useSelector(getTrimInfo);
  // TODO: Mocking request with static data
  const { getModelInventoryStatus, result: inventoryStatus } = useGetModelInventoryStatus(true);

  useEffect(() => {
    const queryParams = {
      dealerCodes: dealer,
      modelCode: trim?.modelKey,
      extColor: trim?.exteriorColorKey,
      intColor: trim?.interiorColorKey,
      availableStatuses: status,
    };
    getModelInventoryStatus(queryParams);
  }, [dealer, trim?.modelKey, trim?.exteriorColorKey, trim?.interiorColorKey, status]);

  return inventoryStatus;
};

export default useFetchInventoryStatus;
