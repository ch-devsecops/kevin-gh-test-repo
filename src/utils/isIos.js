import isSSR from './isSSR';

// Checks if the user is on an ios device, helps resolve specific css bugs exclusive to specific devices
const isIos = isSSR() ? false : navigator.userAgent.includes('iPhone');

export default isIos;
