import { useContext } from 'react';
import { UserLocationContext } from '@honda-canada/user-location';

import { DEFAULT_PROVINCE_CODE } from '../../utils/constants';
import { useProvinces, useSettings } from '../../utils/sitecoreContext';

/**
 * Get the price flags for the current province
 * @param provinces
 * @param provinceCode
 * @returns {{showSellingPrice: (*|boolean), showMsrpPrice: (*|boolean)}}
 */

const usePriceFlagsForProvince = () => {
  const { defaultProvince } = useSettings();
  const provinces = useProvinces();
  const provinceCode = useContext(UserLocationContext)?.provinceCode || defaultProvince || DEFAULT_PROVINCE_CODE;

  const province = (provinces?.length &&
    provinces.find(_province => _province?.name?.toLowerCase() === provinceCode?.toLowerCase())) || {
    showMsrpPrice: false,
    showSellingPrice: true,
  };
  return {
    showMsrpPrice: province?.showMsrpPrice || false,
    showSellingPrice: province?.showSellingPrice || false,
  };
};

export default usePriceFlagsForProvince;
