import { useEffect } from 'react';
import inventoryApi from '../../core/api/inventoryApi';

const useInventoryEffect = params => {
  useEffect(() => {
    params.injectedApi(inventoryApi);
  }, []);
};

export default useInventoryEffect;
