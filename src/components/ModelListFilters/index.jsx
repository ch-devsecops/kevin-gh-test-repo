import React from 'react';
import ModelListFiltersUI from './ModelListFilters';
import { MARINE_SITE_NAME, PSP_SITE_NAME } from '../../utils/constants';
import { variant1, variant2, variant3 } from './constants';
import useAppName from '../../utils/sitecoreContext/useAppName';

import isSSR from '../../utils/isSSR';

const ModelListFiltersMap = props => {
  /** this component is part of /vehicles page, which is quite heavy.
   * One of the optimization is to remove ModelListFilters component
   * from App nodes tree for SSR to optimize app capacity.
   */
  const appName = useAppName();

  if (isSSR()) {
    return null;
  }

  switch (appName) {
    case PSP_SITE_NAME:
      return <ModelListFiltersUI variant={variant3} {...props} />;
    case MARINE_SITE_NAME:
      return <ModelListFiltersUI variant={variant2} {...props} />;
    default:
      return <ModelListFiltersUI variant={variant1} {...props} />;
  }
};

export default ModelListFiltersMap;
