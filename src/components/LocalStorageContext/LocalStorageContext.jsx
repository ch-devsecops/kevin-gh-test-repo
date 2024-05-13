import { createContext } from 'react';

const LocalStorageContext = createContext({
  recentlyViewedProducts: [],
  toCompareProducts: [],
  isCompareDrawerOpen: false,
  setRecentlyViewedProducts: () => {},
  setToCompareProducts: () => {},
  toggleCompareDrawer: () => {},
  removeFromCompareProducts: () => {},
  deleteToCompareProducts: () => {},
  replaceToCompareProducts: () => {},
});
LocalStorageContext.displayName = 'LocalStorageContext';

export default LocalStorageContext;
