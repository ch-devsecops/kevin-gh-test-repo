import { useEffect } from 'react';
import isSSR from '../isSSR';

/**
 * Custom hook to dynamically load a script in a React component.
 *
 * @param {string} url - The URL of the script to load.
 * @param {string} id - The ID to assign to the script element.
 */
const useScript = (url, id) => {
  if (isSSR()) return;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.id = id;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url, id]);
};

export default useScript;
