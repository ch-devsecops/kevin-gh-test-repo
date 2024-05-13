/**
 * Generate Honda experience API request headers
 *
 * @param {Object} options - Options object for request header
 * @param {string} options.consumerId - Honda experience API consumer ID
 * @param {string} options.consumerName - Honda experience API consumer name
 * @param {'en' | 'fr'} [options.language='en'] - Honda experience API language
 * @return {Headers}
 */

function getHondaExperienceApiHeaders({ consumerId, consumerName, language }) {
  const headers = new Headers({
    consumerId,
    consumerName,
    language,
    correlationId: Date.now(),
  });

  return headers;
}

export default getHondaExperienceApiHeaders;
