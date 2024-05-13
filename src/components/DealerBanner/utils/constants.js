import { ACURA_SITE_NAME, HONDA_SITE_NAME } from '../../../utils/constants';

export const bannerConfigs = Object.freeze({
  [ACURA_SITE_NAME]: {
    icon: 'acuraMapMarker',
    bgColor: 'darkBlue',
  },
  [HONDA_SITE_NAME]: {
    icon: 'hondaMapMarker',
    bgColor: 'blue',
  },
});

export const HOUR_SEPARATOR = '•';
