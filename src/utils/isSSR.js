/**
 * Determines whether the current execution context is server-side. Identical to isServer() in @sitecore-jss.
 * @returns {boolean} true if executing server-side
 */
const isSSR = () => !(typeof window !== 'undefined' && window.document);

export default isSSR;
