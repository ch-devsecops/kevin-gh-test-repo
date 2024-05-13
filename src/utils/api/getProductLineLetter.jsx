import {
  ACURA_SITE_NAME,
  ATV_PRODUCT_NAME,
  ENGINE_SITE_NAME,
  HONDA_SITE_NAME,
  MARINE_SITE_NAME,
  MC_SITE_NAME,
  PE_SITE_NAME,
  SXS_PRODUCT_NAME,
  PSP_SITE_NAME,
} from '../constants';

const productLineLetter = new Map();
productLineLetter.set(ACURA_SITE_NAME, 'A');
productLineLetter.set(HONDA_SITE_NAME, 'H');
productLineLetter.set(ENGINE_SITE_NAME, 'E');
productLineLetter.set(MARINE_SITE_NAME, 'R');
productLineLetter.set(MC_SITE_NAME, 'M');
productLineLetter.set(PE_SITE_NAME, 'P');
productLineLetter.set(ATV_PRODUCT_NAME, 'V');
productLineLetter.set(SXS_PRODUCT_NAME, 'S');
productLineLetter.set(PSP_SITE_NAME, {
  'ON-ROAD': productLineLetter.get(MC_SITE_NAME),
  'OFF-ROAD': productLineLetter.get(MC_SITE_NAME),
  ATV: productLineLetter.get(ATV_PRODUCT_NAME),
  SXS: productLineLetter.get(SXS_PRODUCT_NAME),
});
// add to back compatible
productLineLetter.set('ON-ROAD', 'M');
productLineLetter.set('OFF-ROAD', 'M');

export default productLineLetter;
