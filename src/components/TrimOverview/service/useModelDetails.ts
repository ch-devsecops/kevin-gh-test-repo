import { useSelector } from 'react-redux';

import { getTrimDetails } from '../../../core/reducers/inventoryVehicleDetails';
import type { useModelDetailsType } from '../types';

const useModelDetails: useModelDetailsType = (transmissionKey, models) => {
  const { modelKey, modelYear, trimKey, transmissionKey: transmissionKeyParam } = useSelector(getTrimDetails);

  const currentTransmissionKey = transmissionKey || transmissionKeyParam;

  const model = models?.[0]?.items.find(item => item.detKey === modelKey);
  if (!model) {
    return '';
  }
  const year = model.modelYears?.find(item => item.detIdentifier === modelYear);
  if (!year) {
    return '';
  }
  const trim = year.trims?.find(item => item.detKey === trimKey);
  if (!trim) {
    return '';
  }

  const transmission = trim.transmissions?.[0]?.items?.find(item => item.detKey === currentTransmissionKey);

  return { model, year, trim, transmission };
};

export default useModelDetails;
