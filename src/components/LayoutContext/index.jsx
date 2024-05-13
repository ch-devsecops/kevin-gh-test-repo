import React, { useMemo } from 'react';

const LayoutContext = React.createContext({});

/**
 * Context that passes layout params to the components
 * in a LayoutContainer (SingleColumn, ThreeColumn, etc)
 * i.e.
 * <LayoutProvider
 *    layoutName={rendering.componentName}
 *    columnName="column-three"
 *    params={{splitOnTablet: true}}
 * >
 */
const LayoutProvider = ({ layoutName, columnName, params, children }) => {
  const memoisedValues = useMemo(
    () => ({
      layoutName,
      columnName,
      params,
    }),
    [layoutName, columnName, params],
  );
  return <LayoutContext.Provider value={memoisedValues}>{children}</LayoutContext.Provider>;
};

export { LayoutContext };
export default LayoutProvider;
