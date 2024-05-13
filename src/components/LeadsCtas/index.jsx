import React from 'react';
import { useSelector } from 'react-redux';
import { useAppName } from '../../utils/sitecoreContext';
import useInventoryEffect from '../LocalInventoryStatus/useInventoryEffect';
import useFetchInventoryStatus from '../LocalInventoryStatus/useFetchInventoryStatus';
import { createObjectFromProps } from '../../utils/object';
import { HONDA_SITE_NAME, ACURA_SITE_NAME } from '../../utils/constants';
import { getTrimInfo } from '../../core/reducers/inventoryVehicleDetails';
import { getDealerInfo } from '../../core/reducers/inventoryDealerDetails';
import LeadsCtasUI from './LeadsCtasUI';
import NotImplemented from '../NotImplemented';
import mapFields from './utils';

const LeadsCtas = ({ rendering, fields, params }) => {
  const appName = useAppName();
  const trimInfo = useSelector(getTrimInfo);
  const { dealerName = '', dealerCode = '' } = useSelector(getDealerInfo);
  const gtmBodyStyle = fields?.gtmBodyStyle.value;

  useInventoryEffect(params);

  const result = useFetchInventoryStatus({
    dealer: dealerCode,
    status: '',
  });

  const selectedModel = {
    modelKey: trimInfo?.trim?.modelKey,
    modelYear: trimInfo?.trim?.modelYear,
  };

  const inventoryStatus = result?.data;
  const inventoryAvailabilityStatus = inventoryStatus ? inventoryStatus[0]?.inventory[0]?.availableStatus : 'preOrder';
  if (!fields) return null;

  const mappedFields = mapFields(createObjectFromProps(fields), selectedModel, dealerCode);
  switch (appName) {
    case ACURA_SITE_NAME:
    case HONDA_SITE_NAME:
      break;
    default:
      return <NotImplemented name="Leads CTAs " />;
  }
  return (
    <LeadsCtasUI
      fields={mappedFields}
      title={mappedFields.title}
      inventoryAvailabilityStatus={inventoryAvailabilityStatus}
      dealerName={dealerName}
      model={selectedModel?.modelKey}
      trim={trimInfo?.trim?.trimKey}
      componentType={rendering?.componentName}
      bodyStyle={gtmBodyStyle}
      params={params}
    />
  );
};

export default LeadsCtas;
