import { HondaTheme } from '@honda-canada/design-system-react/lib/honda-theme';
import { AcuraTheme } from '@honda-canada/design-system-react/lib/acura-theme';
import { MCTheme } from '@honda-canada/design-system-react/lib/mc-theme';
import { MotorsTheme } from '@honda-canada/design-system-react/lib/motors-theme';
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

const themeForSiteName = new Map();
themeForSiteName.set(HONDA_SITE_NAME, HondaTheme);
themeForSiteName.set(PE_SITE_NAME, HondaTheme);
themeForSiteName.set(ACURA_SITE_NAME, AcuraTheme);
themeForSiteName.set(MC_SITE_NAME, MCTheme);
themeForSiteName.set(ATV_PRODUCT_NAME, MCTheme);
themeForSiteName.set(SXS_PRODUCT_NAME, MCTheme);
themeForSiteName.set(PSP_SITE_NAME, MCTheme);
themeForSiteName.set(ENGINE_SITE_NAME, MotorsTheme);
themeForSiteName.set(MARINE_SITE_NAME, MotorsTheme);

export default themeForSiteName;
