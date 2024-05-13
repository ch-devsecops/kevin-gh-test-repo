import React from 'react';
import ModelPageNav from './ModelPageNav';
import { PSP_SITE_NAME, MC_SITE_NAME } from '../../utils/constants';
import { useAppName } from '../../utils/sitecoreContext';
import { variant1, variant2 } from './constants';

const ModelPageNavWrapper = ({ fields, rendering }) => {
  const appName = useAppName();

  let categoryName;
  let modelName;
  let variant;

  switch (appName) {
    case PSP_SITE_NAME:
    case MC_SITE_NAME:
      categoryName = fields?.data?.value?.modelPageSettings?.modelCategory;
      modelName = categoryName?.fields?.categoryName?.value;
      variant = variant1;
      break;
    default:
      categoryName = fields?.data?.value?.modelPageSettings?.model;
      modelName = categoryName?.fields?.name?.toLowerCase();
      variant = variant2;
  }

  return (
    <ModelPageNav
      variant={variant}
      fields={fields}
      rendering={rendering}
      categoryName={categoryName}
      modelName={modelName}
    />
  );
};

export default ModelPageNavWrapper;
