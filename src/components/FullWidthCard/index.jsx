import React, { useContext } from 'react';
import { Image } from '@honda-canada/design-system-react';
import FullWidthCardBase from './FullWidthCard';
import { getVideoProps, mapGTMCategory, mapJssFieldsToCtaComponents } from '../../utils/sitecoreFields';
import { ModelExplorationContext } from '../ModelExplorationContext';

const FullWidthCard = ({ fields, rendering }) => {
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  if (!fields) return null;
  const { anchorId, title, bodyText, mediaImage, gtmTitle, gtmCategory, videoUrl } = fields;
  const ctas = mapJssFieldsToCtaComponents(fields, gtmTitle?.value);
  const gtmTags = {
    category: mapGTMCategory(gtmCategory),
    title: gtmTitle?.value,
    type: rendering?.componentName,
  };

  return (
    <FullWidthCardBase
      title={title?.value}
      bodyText={bodyText?.value}
      ctas={title?.value && bodyText?.value ? ctas : null}
      anchorId={anchorId?.value}
      gtmTags={gtmTags}
      image={<Image {...mediaImage?.value} />}
      video={getVideoProps(videoUrl?.value)}
      isDark={isDark}
    />
  );
};

export default FullWidthCard;
