import React from 'react';
import PropTypes from 'prop-types';

import ModelCardWithTrims from './ModelCardWithTrims';
import { ACURA_SITE_NAME, HONDA_SITE_NAME, MARINE_SITE_NAME, PSP_SITE_NAME } from '../../utils/constants';
import useAppName from '../../utils/sitecoreContext/useAppName';
import { isEmpty } from '../../utils/object';
import { mapMarineFields, mapPSPFields } from './service/utils';
import { variant1, variant2, variant3, variant4 } from './service/constants';

const ModelCardWithTrimsWrapper = ({ variant: propVariant, fields, rendering, priceLabels }) => {
  const appName = useAppName();

  if (!fields || isEmpty(fields)) return null;

  let variant;
  let vehicleType;
  let mappedFields = fields;

  switch (appName) {
    case PSP_SITE_NAME:
      variant = variant4;
      // Maps from PSP Category/Product => Model/Trim
      mappedFields = mapPSPFields(mappedFields);
      vehicleType = mappedFields?.data?.value?.category?.fields?.vehicleType?.name;

      break;

    case MARINE_SITE_NAME:
      variant = variant3;
      // Maps from Marine Category/Product => Model/Trim
      mappedFields = mapMarineFields(mappedFields);
      break;

    case ACURA_SITE_NAME:
      variant = variant2;

      break;

    case HONDA_SITE_NAME:
    default:
      variant = variant1;
      break;
  }

  if (mappedFields === null || isEmpty(mappedFields)) {
    return null;
  }

  return (
    <ModelCardWithTrims
      componentName={rendering?.componentName}
      fields={mappedFields}
      priceLabels={priceLabels}
      variant={propVariant ?? variant}
      vehicleType={vehicleType}
    />
  );
};

ModelCardWithTrimsWrapper.propTypes = {
  fields: PropTypes.shape({
    data: PropTypes.shape({
      value: PropTypes.shape({
        engineSeries: PropTypes.shape({
          fields: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
      }),
    }),
  }),
  variant: PropTypes.string,
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};

export default ModelCardWithTrimsWrapper;
