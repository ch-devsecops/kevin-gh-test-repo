import React from 'react';
import { Box } from '@honda-canada/design-system-react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { mapGTMCategory } from '../../utils/sitecoreFields';

const AnchorContainer = ({ rendering, setRef }) => {
  if (!rendering || !rendering.placeholders) return null;
  const anchorId = rendering?.fields?.anchorId?.value;

  return (
    <Box
      id={anchorId}
      ref={setRef}
      data-gtm-component-type={rendering.componentName}
      data-gtm-category={mapGTMCategory(rendering?.fields?.gtmCategory)}
      data-gtm-title={rendering?.fields?.gtmTitle?.value}
    >
      <Placeholder name="anchor-content" rendering={rendering} />
    </Box>
  );
};

export default AnchorContainer;
