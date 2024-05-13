import React, { useState, useMemo } from 'react';

const SimilarRecentlyViewedContext = React.createContext({});
SimilarRecentlyViewedContext.displayName = 'SimilarRecentlyViewedContext';

export default SimilarRecentlyViewedContext;

export const SimilarRecentlyViewedProvider = ({ children }) => {
  const [minBodyTextHeight, setMinBodyTextHeight] = useState('0');
  const memoisedValues = useMemo(
    () => ({
      minBodyTextHeight,
      setMinBodyTextHeight,
    }),
    [minBodyTextHeight, setMinBodyTextHeight],
  );

  return (
    <SimilarRecentlyViewedContext.Provider value={memoisedValues}>{children}</SimilarRecentlyViewedContext.Provider>
  );
};
