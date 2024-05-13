import React, { useContext } from 'react';
import { Box, Icon, Link } from '@honda-canada/design-system-react';
import Context from '../service/Context';

import { wrapJSSFields } from '../../../utils/wrapJSSFields';
import { mapGTMCategory } from '../../../utils/sitecoreFields';
import { getGtmTagValue } from '../../../utils/gtmEvents';

const CTA = ({ trim, isBuildable, bapUrl, shouldCTAsFade, componentName }) => {
  const configurationProvider = useContext(Context);
  const { isDark, cta } = configurationProvider || {};
  const { vehicleType } = useContext(Context);
  const fields = useContext(Context);
  const { gtmCategory } = wrapJSSFields(fields);
  const gtmCategoryProp = mapGTMCategory(gtmCategory);
  const gtmComponentType = getGtmTagValue(componentName);

  return isBuildable || cta?.forceRender ? (
    <Link
      data-testid="cy-trim-card-cta"
      href={bapUrl || '#'}
      styling={isDark ? 'white' : 'primary'}
      className="trim-card-cta"
      aria-label={cta?.ariaLabel(trim.name)}
      opacity={shouldCTAsFade ? 0.5 : 1}
      transition="opacity .6s ease-in"
      {...cta.styling}
      data-gtm-interaction-type="cta: explore"
      data-gtm-title="view details"
      data-gtm-component-type={gtmComponentType}
      data-gtm-category={gtmCategoryProp}
      data-gtm-body-style={vehicleType}
      data-gtm-model={trim.name}
    >
      {cta?.label}
      <Icon ml={1} height="10px" name="arrowRight" iconColor="primary" />
    </Link>
  ) : (
    <Box height="24px" />
  );
};

export default CTA;
