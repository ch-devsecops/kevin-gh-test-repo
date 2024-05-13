import { UserLocationContext } from '@honda-canada/user-location';
import { useContext } from 'react';

import useSettings from './useSettings';

/**
 * This hook returns provinces from Sitecore Context and User Location
 * @returns {object} Current provinces
 */

const useProvincesPath = () => {
  const provinceCode = useContext(UserLocationContext)?.provinceCode;
  const { defaultProvince } = useSettings();

  return provinceCode || defaultProvince;
};

export default useProvincesPath;
