import { createRef, useRef } from 'react';

const useFocus = () => {
  const htmlElRefList = useRef({});

  const addHtmlElRef = id => {
    htmlElRefList.current[id] = createRef();
    return htmlElRefList.current[id];
  };

  const setFocus = id => {
    if (htmlElRefList.current[id]) {
      htmlElRefList.current[id].current.focus();
    }
  };

  return [addHtmlElRef, setFocus];
};

export default useFocus;
