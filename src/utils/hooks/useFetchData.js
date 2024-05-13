import { useState, useEffect } from 'react';

/**
 * Data fetching hook
 *
 * Please keep the identity of options object stable to avoid infinite requests loop
 * @property {Object} data
 * @property {Error | null } error
 * @property {boolean} isLoading
 *
 * @param {string} url - request URL
 * @param {Object} [options] - configuration for fetching, i.e, method, body, etc.
 * @return {Data}
 */
const useFetchData = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      if (!url) {
        return null;
      }
      setIsLoading(true);
      try {
        const res = await fetch(url, { ...options, signal: abortController.signal });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(err);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, options]);

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetchData;
