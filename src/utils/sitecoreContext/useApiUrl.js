import useApiHost from './useApiHost';

/**
 * This hook returns url based on hondaRestApiHost from Sitecore Context
 * @returns {string} Current hondaRestApiHost
 */

const useApiUrl = () => {
  const apiHost = useApiHost();
  return `https://${apiHost}/`;
};

export default useApiUrl;
