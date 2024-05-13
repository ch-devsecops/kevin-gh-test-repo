import { HONDA_EXPERIENCE_API_PE, HONDA_EXPERIENCE_API_NPE } from './constants';
/**
 * Builds the root Honda Experience URL based on the provided configuration.
 * @param {Object} config - An object containing the configuration properties.
 * @param {string} config.env - The environment to use for the URL (dit, sit, uat, prod, production).
 * @param {string} [config.protocol='https'] - The protocol to use for the URL (http or https). Defaults to https.
 * @param {string} config.consumerName - The name of the consumer.
 * @param {string} [config.version='v1'] - The version of the API. Defaults to v1.
 * @returns {string} - The root URL for the API.
 */
function getHondaExpApiUrl(config = {}) {
  if (config === null || typeof config !== 'object' || !config.env || !config.consumerName) {
    return '';
  }

  const { consumerName, version = 'v1', protocol = 'https' } = config;
  let { env } = config;
  if (HONDA_EXPERIENCE_API_PE.includes(env)) {
    // Production doesn't include environment in the URL
    env = '';
  } else if (!HONDA_EXPERIENCE_API_NPE.includes(env)) {
    // For unknown environment, fallback to 'sit'
    env = 'sit';
  }

  return `${protocol}://api${env}.services.honda.ca/api${env}-honda-${consumerName}-exp-api/honda-${consumerName}-exp-api/${version}`.toLowerCase();
}

export default getHondaExpApiUrl;
