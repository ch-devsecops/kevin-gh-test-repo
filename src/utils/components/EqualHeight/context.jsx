import React from 'react';

const EqualHeightContext = React.createContext({
  sizes: [],
  temporarySizes: [],
  update: false,
  animationSpeed: 0.25,
  forceUpdate: false,
  originalChildrenCount: 0,
  childrenCount: 0,
  setTemporarySizes: undefined,
  setOriginalChildrenCount: undefined,
  setChildrenCount: undefined,
  setForceUpdate: () => {},
  updateOnChange: undefined,
});
const EqualHeightProvider = EqualHeightContext.Provider;

export { EqualHeightContext, EqualHeightProvider };
