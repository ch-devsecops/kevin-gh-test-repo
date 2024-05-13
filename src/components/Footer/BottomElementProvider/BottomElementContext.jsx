import { createContext } from 'react';

const BottomElementContext = createContext({
  shouldUpdateIntersectingElement: false,
  bottomElementHeight: 0,
  isHidden: false,
  headerHiddenOnScroll: false,
  setRef: () => {},
});
BottomElementContext.displayName = 'BottomElementContext';

export default BottomElementContext;
