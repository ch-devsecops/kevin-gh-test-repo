import React from 'react';
import { Icon, IconWrapper } from '@honda-canada/design-system-react';
import { wrapJSSFields } from '../../utils/wrapJSSFields';
import { mapGTMCategory } from '../../utils/sitecoreFields';
import { getGtmTagValue } from '../../utils/gtmEvents';

const IconJSS = ({ fields, rendering }) => {
  const { icon, gtmCategory, anchorId } = wrapJSSFields(fields);

  return (
    <IconWrapper
      data-gtm-component-type={getGtmTagValue(rendering?.componentName)}
      data-gtm-category={mapGTMCategory(gtmCategory)}
    >
      <Icon anchorId={anchorId?.value} name={icon?.value} width="30px" />
    </IconWrapper>
  );
};

export default IconJSS;
